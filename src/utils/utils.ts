import createLogger from "logging";
import path from "path";

const getFileName = function (file: string): string {
  return path.parse(file).base;
};

const getLogger = (filePath: string) => {
  const loggerName = getFileName(filePath);
  return createLogger(loggerName);
};

export { getFileName, getLogger };
