import FileManager from "../file-manager/file-manager";
import Parser from "../parser/parser";
import { getLogger } from "../utils/utils";
import View from "../view/view";

const logger = getLogger(__filename);

export interface Handler {
  action: string;
  handle: (requestData: Record<string, any>) => any;
}

export interface Payload {
  action: string;
  data: Record<string, any>;
}

export interface BaseMediator {
  addHandler: (handler: Handler) => void;
  getHandlers: () => Handler[];
  request: (payload: Payload) => void;
  init: () => void;
}

export class Mediator implements BaseMediator {
  private view: View | null;
  private filemanager: FileManager | null;
  private parser: Parser | null;
  private handlers: Handler[] = [];
  private parseOnly: boolean = true;

  constructor(
    config: {
      view?: View;
      fileManager?: FileManager;
      parser?: Parser;
    } = {}
  ) {
    this.view = config.view || null;
    this.view?.setMediator(this);
    this.filemanager = config.fileManager || null;
    this.filemanager?.setMediator(this);
    this.parser = config.parser || null;
    this.parser?.setMediator(this);
  }

  addHandler(handler: Handler) {
    this.handlers.push(handler);
  }
  getHandlers() {
    return this.handlers;
  }

  request(payload: Payload) {
    const handler = this.handlers.find(
      (handler) => handler.action === payload.action
    );
    if (handler) {
      logger.debug(`ACTION: ${handler.action}`);
      handler.handle(payload.data);
    } else {
      logger.debug(`No handler found for ${payload.action}`);
    }
  }

  init() {
    this.addHandler({
      action: "file-manager:getCsvFileNames",
      handle: (payload) => {
        if (payload.csvFilesNames) {
          this.view?.setQuestion(
            "select a file to convert",
            payload.csvFilesNames
          );
          this.view?.promptUser();
        } else {
          logger.error("no csv files found");
        }
      },
    });
    this.addHandler({
      action: "view:promptUser",
      handle: async (payload) => {
        const { fileName, parseOnly } = payload;
        this.parseOnly = parseOnly;
        try {
          await this.filemanager?.loadFile(fileName);
        } catch (error) {
          logger.error(error);
        }
      },
    });
    this.addHandler({
      action: "file-manager:loadFile",
      handle: async (payload) => {
        const { isOpen } = payload;
        if (!isOpen) {
          logger.error("could not open file");
          return;
        }
        try {
          // read off the first line
          this.filemanager?.readLine();
          const newHeaders = this.parser?.headers;
          // todo: write the new header to file
          do {
            await this.filemanager?.readLine();
          } while (await this.filemanager?.hasNextLine());
        } catch (error) {
          logger.error(error);
        }
      },
    });
    this.addHandler({
      action: "file-manager:line",
      handle: (payload) => {
        const { line } = payload;
        if (typeof line === "string") {
          // logger.warn(line);
          this.parser?.parse(line);
        } else {
          throw new Error("no line to parse");
        }
      },
    });
    this.addHandler({
      action: "parser:result",
      handle: (payload) => {
        const { result } = payload;
        logger.debug(result);
      },
    });
  }
}

export default Mediator;
