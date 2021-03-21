import lineReader from "line-reader";
import { BaseComponent } from "../types";
class FileManager extends BaseComponent {
  file: File | null = null;

  loadFile(fileName: string) {
    return new Promise((res, rej) => {
      lineReader.open(fileName, function (err, reader) {
        if (err) {
          rej(err);

        }
        this.
      });
    });
  }

  readLine() {}

  hasNextLine(): boolean {
    return true;
  }
}

export default FileManager;
