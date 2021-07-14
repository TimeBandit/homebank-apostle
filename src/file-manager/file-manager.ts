import fs from "fs";
import lineReader from "line-reader";
import { nanoid } from "nanoid";
import path from "path";
import { BaseComponent } from "../types";
import { getLogger, status } from "../utils/utils";

const logger = getLogger(__filename);

class FileManager extends BaseComponent {
  reader: Reader | null = null;
  fileStream: fs.WriteStream | null = null;
  parsedFileName: string = "";
  parsedFileDestination: string = `${process.cwd()}/parsed`;

  loadFile(fileName: string, writeToFile: boolean = false) {
    return new Promise<void>((resolve, reject) => {
      logger.debug("loading :", fileName);
      const that = this;
      lineReader.open(fileName, function (err, reader) {
        logger.debug("opening ", fileName);
        if (err) {
          reject();
        }

        that.reader = reader;

        if (writeToFile) {
          if (fs.existsSync(that.parsedFileDestination)) {
            logger.debug("Destination directory exists!");
          } else {
            status.warn("Destination folder not found. Creating...");
            fs.mkdirSync(that.parsedFileDestination);
          }
        }

        that.parsedFileName = `${that.parsedFileDestination}/[${nanoid(3)}]-${
          fileName.split(".csv")[0]
        }.csv`;

        that.mediator?.request({
          action: "file-manager:loadFile",
          data: { isOpen: that.reader.isOpen() },
        });
        resolve();
      });
    });
  }

  readLine(skipRetrieval: boolean = false) {
    return new Promise<void>((resolve, reject) => {
      this.reader?.nextLine((err, line) => {
        if (err) {
          reject();
        }

        this.mediator?.request({
          action: "file-manager:readLine",
          data: { line: skipRetrieval ? null : line },
        });
        resolve();
      });
    });
  }

  hasNextLine() {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const hasNextLine = this.reader!.hasNextLine();
        this.mediator?.request({
          action: "file-manager:hasNextLine",
          data: { hasNextLine: this.reader?.hasNextLine() },
        });
        resolve(hasNextLine);
      } catch (error) {
        reject(error);
      }
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

  write(line: string) {
    if (!this.fileStream) {
      this.fileStream = fs.createWriteStream(this.parsedFileName, {
        flags: "a",
      });
    }
    return new Promise<void>((resolve, reject) => {
      this.fileStream?.write(line + "\n", (err) => {
        if (err) {
          reject();
        } else {
          logger.debug("write: ", line);
          resolve();
        }
      });
    });
  }

  close() {
    status.notify(`file parsed to ${this.parsedFileName}`);
    this.fileStream?.close();
    process.exit();
  }
}

export default FileManager;
