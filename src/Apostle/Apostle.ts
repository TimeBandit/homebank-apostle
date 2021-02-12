/**
 * Apostle Class
 * A mediator pattern
 */
import FileManager from "../FileManager/FileManager";
import Translator from "../Translator/Translater";
import UI from "../Ui/UI";

export interface Handler {
  action: string;
  handler: (data?: { [key: string]: any }) => any;
}

export class Apostle {
  private ui: UI;
  private filemanager: FileManager;
  private translator: Translator;
  private handlers: Handler[] = [];

  constructor(config: {
    ui: UI;
    fileManager: FileManager;
    translator: Translator;
  }) {
    this.ui = config.ui;
    this.filemanager = config.fileManager;
    this.translator = config.translator;
  }

  addHandler(handler: Handler) {
    this.handlers.push(handler);
  }
  getHandlers() {
    return this.handlers;
  }

  request(payload: {
    action: string;
    data?: { [key: string]: any };
    cb?: (data: { [key: string]: string }) => void;
  }) {
    const actionObject = this.handlers.find(
      (handler) => handler.action === payload.action
    );
    if (actionObject) {
      console.log(payload.data);
      actionObject.handler(payload.data || undefined);
    }
  }
}

export default new Apostle({
  ui: new UI(),
  fileManager: new FileManager(),
  translator: new Translator(),
});
