import { PassThrough } from "stream";
import Mediator from "../../Mediator/Mediator";
import FileManager from "../FileManager";

const fileManager = new FileManager();
const mediator = new Mediator({ fileManager });
const mockRequest = jest.spyOn(mediator, "request");
const mockedStream = new PassThrough();

describe("describe", () => {
  it("should open a file", () => {
    fileManager.loadFile(mockedStream);
    mockedStream.emit("data", "hello world");

    expect(mockRequest).toHaveBeenCalledWith({
      action: "file-manager:loadFile",
      data: { open: true },
    });
    mockedStream.end();
  });
  it("should read a line", () => {});
  it("should tell if there is a new line", () => {});
});
