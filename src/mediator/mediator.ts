import FileManager from "../file-manager/file-manager";
import Parser from "../parser/parser";
import View from "../view/view";

export interface Handler {
  action: string;
  handle: (data?: { [key: string]: any }) => any;
}

export interface Payload {
  action: string;
  data?: Record<string, any>;
  cb?: (data: { [key: string]: string }) => void;
}

export interface BaseMediator {
  addHandler: (handler: Handler) => void;
  getHandlers: () => Handler[];
  request: (payload: Payload) => void;
}

export class Mediator implements BaseMediator {
  private view: View | null;
  private filemanager: FileManager | null;
  private translator: Parser | null;
  private handlers: Handler[] = [];

  constructor(
    config: {
      view?: View;
      fileManager?: FileManager;
      translator?: Parser;
    } = {}
  ) {
    this.view = config.view || null;
    this.view?.setMediator(this);
    this.filemanager = config.fileManager || null;
    this.filemanager?.setMediator(this);
    this.translator = config.translator || null;
    this.translator?.setMediator(this);
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
      handler.handle(payload.data || undefined);
    }
  }
}

export default Mediator;
