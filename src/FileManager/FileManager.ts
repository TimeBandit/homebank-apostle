import lineReader from "line-reader";
import { BaseComponent } from "../types";
class FileManager extends BaseComponent {
  reader: Reader | null = null;

  loadFile(fileName: any) {
    const that = this;
    lineReader.open(fileName, function (err, reader) {
      if (err) {
        throw err;
      }
      that.reader = reader;
      that.mediator?.request({
        action: "file-manager:loadFile",
        data: { open: that.reader.isOpen() },
      });
    });
  }

  readLine() {
    this.reader?.nextLine((err, line) => {
      if (err) {
        throw err;
      }
      if (!line) {
        throw new Error("No new line to send");
      }
      this.mediator?.request({
        action: "file-manager:readline",
        data: { line },
      });
    });
  }

  hasNextLine(): boolean {
    if (this.reader?.hasNextLine()) {
      return true;
    }
    this.reader?.close((err) => {
      if (err) {
        throw err;
      }
    });
    return false;
  }
}

export default FileManager;
