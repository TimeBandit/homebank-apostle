import FileManager from "../file-manager/file-manager";
import Parser from "../parser/parser";
import { getLogger, status } from "../utils/utils";
import View from "../view/view";

const logger = getLogger(__filename);

export interface Handler {
  action: string;
  handle: (requestData: Record<string, any>) => any;
}

export interface Payload {
  action: string;
  data: Record<string, any>;
  callback?: Function;
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
  private writeToFile: boolean = false;

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
          process.exit(1);
        }
      },
    });
    this.addHandler({
      action: "view:promptUser",
      handle: (payload) => {
        const { fileName, parseOnly: writeToFile } = payload;
        logger.debug("users want to write to file?", writeToFile);
        this.writeToFile = writeToFile;
        try {
          this.filemanager?.loadFile(fileName, this.writeToFile);
        } catch (error) {
          logger.error(error);
          process.exit(1);
        }
      },
    });
    this.addHandler({
      action: "file-manager:loadFile",
      handle: async (payload) => {
        const { isOpen } = payload;
        if (!isOpen) {
          status.warn("could not open file");
          process.exit(1);
        }

        const destinationHeaders = this.parser?.destinationHeaders;
        if (!destinationHeaders) throw new Error("no headers to write");
        if (this.writeToFile) {
          logger.debug("writing headers: ", destinationHeaders);
          await this.filemanager?.write(destinationHeaders); // await for write to complete
        }

        // read off the first line (headers)
        this.filemanager?.readLine(true);
        this.filemanager?.hasNextLine();
      },
    });
    this.addHandler({
      action: "file-manager:hasNextLine",
      handle: (payload) => {
        const { hasNextLine } = payload;
        if (hasNextLine) {
          this.filemanager?.readLine();
        } else {
          if (this.writeToFile) {
            this.filemanager?.close();
          } else {
            status.notify("parsing completed");
          }
        }
      },
    });
    this.addHandler({
      action: "file-manager:readLine",
      handle: (payload) => {
        const { line } = payload;

        if (line === null) {
          return;
        }

        try {
          this.parser?.parse(line);
        } catch (error) {
          logger.error(error);
          process.exit(1);
        }
      },
    });
    this.addHandler({
      action: "parser:result",
      handle: async (payload) => {
        const { result } = payload;
        status.pass(result);
        if (this.writeToFile) {
          await this.filemanager?.write(result);
        }
        this.filemanager?.hasNextLine();
      },
    });
  }
}

export default Mediator;
