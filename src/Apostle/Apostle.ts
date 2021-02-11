/**
 * Apostle Class
 * A mediator pattern
 */

interface UI {
  init(): void;
}
interface FileManager {
  readLine(): string;
  writeLine(): string;
}

interface Parser {
  parse(): any;
}

class Apostle {
  private ui: UI;
  private filemanager: FileManager;
  private parser: Parser;
  private handlers: ((data: any) => void)[] = [];

  constructor(config: { ui: UI; fileManager: FileManager; parser: Parser }) {
    this.ui = config.ui;
    this.filemanager = config.fileManager;
    this.parser = config.parser;
  }

  addHandler(handler: { name: string; cb: () => any }) {}

  request(config: {
    action: string;
    data: { [key: string]: string };
    cb: (data: { [key: string]: string }) => void;
  }) {}
}

export default Apostle;
