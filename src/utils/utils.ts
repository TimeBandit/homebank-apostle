import createLogger from "logging";
import path from "path";

const getFileName = function (file: string): string {
  return path.parse(file).base;
};

const getLogger = (filePath: string) => {
  const loggerName = getFileName(filePath);
  return createLogger(loggerName);
};

const pass = createLogger("✅️");
const fail = createLogger("❌️");
const warn = createLogger("🚧");
const notify = createLogger("🔔");

const status = {
  pass: (message: string) => pass.info(message),
  fail: (message: string) => fail.error(message),
  warn: (message: string) => warn.warn(message),
  notify: (message: string) => notify.info(message),
};

export { getFileName, getLogger, status };
