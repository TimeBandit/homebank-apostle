import lineReader from "line-reader";
import { BaseComponent } from "../types";

class FileManager extends BaseComponent {
  reader: Reader | null = null;

  loadFile(fileName: any) {
    const that = this;
    return new Promise<boolean | Error>((resolve, reject) => {
      lineReader.open(fileName, function (err, reader) {
        if (err) {
          resolve(err);
        }

        that.reader = reader;
        resolve(that.reader.isOpen());

        that.mediator?.request({
          action: "file-manager:loadFile",
          data: { open: that.reader.isOpen() },
        });
      });
    });
  }

  readLine() {
    return new Promise<string | Error>((resolve, reject) => {
      if (!this.reader) {
        reject(new Error("No reader initialized"));
      }
      this.reader?.nextLine((err, line) => {
        if (err) {
          reject(err);
        }

        resolve(line || "");

        this.mediator?.request({
          action: "file-manager:readLine",
          data: { line },
        });
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
