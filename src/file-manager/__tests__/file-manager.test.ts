import Mediator from "../../mediator/mediator";
import FileManager from "../file-manager";

const fileManager = new FileManager();
const mediator = new Mediator({ fileManager });
const mockRequest = jest.spyOn(mediator, "request");

const emptyFilePath = __dirname + "/data/empty-file.csv";
const twoLinesFilePath = __dirname + "/data/two-lines.csv";

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
    await fileManager.readLine();
    expect(mockRequest).toHaveBeenCalledWith({
      action: "file-manager:line",
      data: {
        line: "line1",
      },
    });

    await fileManager.readLine();
    expect(mockRequest).toHaveBeenCalledWith({
      action: "file-manager:line",
      data: { line: "line2" },
    });
  });
  it("should tell if there is a new line", async () => {
    await fileManager.loadFile(twoLinesFilePath);
    await fileManager.readLine();

    await expect(fileManager.hasNextLine()).resolves.toBe(true);
  });
});
