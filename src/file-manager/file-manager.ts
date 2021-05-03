import lineReader from "line-reader";
import { BaseComponent } from "../types";

class FileManager extends BaseComponent {
  reader: Reader | null = null;
  fileName: string = "";
  loadFile(fileName: any) {
    const that = this;
    this.fileName = fileName;
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

  hasNextLine() {
    return new Promise<boolean | Error>((resolve, reject) => {
      if (this.reader?.hasNextLine()) {
        resolve(true);
        this.mediator?.request({
          action: "file-manager:hasNextLine",
          data: { hasNextLine: true },
        });
      }

      this.reader?.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(false);
          this.mediator?.request({
            action: "file-manager:hasNextLine",
            data: { hasNextLine: true },
          });
        }
      });
    });
  }
}

export default FileManager;
