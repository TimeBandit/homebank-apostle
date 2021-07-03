import Mediator from "../../mediator/mediator";
import FileManager from "../file-manager";
const fileManager = new FileManager();
const mediator = new Mediator({ fileManager });
const mockRequest = jest.spyOn(mediator, "request");

const emptyFilePath = __dirname + "/data/empty-file.csv";
const twoLinesFilePath = __dirname + "/data/two-lines.csv";
jest.mock("fs", () => {
  const originalModule = jest.requireActual("fs");
  return {
    __esModule: true,
    ...originalModule,
    existsSync: jest.fn(),
    mkdirSync: jest.fn(),
  };
});
describe("file-manager", () => {
  it("should open a file", async () => {
    await fileManager.loadFile(emptyFilePath);
    expect(mockRequest).toHaveBeenCalledWith({
      action: "file-manager:loadFile",
      data: { isOpen: true },
    });
  });
  it("should read a line", async () => {
    await fileManager.loadFile(twoLinesFilePath);
    expect(mockRequest).toHaveBeenCalledWith({
      action: "file-manager:loadFile",
      data: {
        isOpen: true,
      },
    });

    // read the header line
    await fileManager.readLine();
    expect(mockRequest).toHaveBeenCalledWith({
      action: "file-manager:readLine",
      data: { line: "line1" },
    });

    // read a line of data
    await fileManager.readLine();
    expect(mockRequest).toHaveBeenCalledWith({
      action: "file-manager:readLine",
      data: { line: "line2" },
    });
  });
  it("should tell if there is a new line", async () => {
    await fileManager.loadFile(twoLinesFilePath);
    await fileManager.readLine();
    await expect(fileManager.hasNextLine()).resolves.toBe(true);
  });
});
