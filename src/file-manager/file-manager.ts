import fs from "fs";
import lineReader from "line-reader";
import path from "path";
import { BaseComponent } from "../types";
import { getLogger } from "../utils/utils";

const logger = getLogger(__filename);

class FileManager extends BaseComponent {
  reader: Reader | null = null;
  fileName: string = "";

  loadFile(fileName: any) {
    logger.debug("fileName :", fileName);
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
          data: { isOpen: that.reader.isOpen() },
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
          action: "file-manager:line",
          data: { line },
        });
      });
    });
  }

  hasNextLine() {
    return new Promise<boolean | Error>((resolve, reject) => {
      if (this.reader?.hasNextLine()) {
        resolve(true);
        // ? DEAD CODE
        // this.mediator?.request({
        //   action: "file-manager:hasNextLine",
        //   data: { hasNextLine: true },
        // });
      } else {
        this.reader?.close((err) => {
          if (err) {
            reject(err);
          } else {
            logger.info("no more lines to read, closing file");
            resolve(false);
          }
        });
      }

      // ? DEAD CODE
    });
  }

  getCsvFileNames() {
    const files = fs.readdirSync("./");
    const csvFilesNames = files.filter((fileName) => {
      return path.extname(fileName) === ".csv";
    });

    if (csvFilesNames.length === 0) {
      logger.error("No csv files to select from");
    }

    this.mediator?.request({
      action: "file-manager:getCsvFileNames",
      data: { csvFilesNames },
    });
  }

  // ! might be dead code
  // async readFile(fileToRead: string) {
  //   try {
  //     await this.loadFile(fileToRead);
  //     do {
  //       const line = await this.readLine();
  //       logger.info(line);
  //     } while (await this.hasNextLine());
  //   } catch (error) {
  //     logger.error(error);
  //   }
  // }
}

export default FileManager;
