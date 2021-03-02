import Mediator from "../../Mediator/Mediator";
import View from "../View";

const view = new View();
const mediator = new Mediator({ view });
const mockRequest = jest.spyOn(mediator, "request");

describe("view", () => {
  it("should request a chosen file to be read", () => {
    const testFile1 = "testFile1";
    const testFile2 = "testFile2";
    const fileNames = [testFile1, testFile2];

    view.selectFile(fileNames);

    expect(mockRequest).toHaveBeenCalledWith({
      action: "view:select-file",
      data: { selection: testFile2 },
    });
  });
  it.skip("should emit a skip action when user triggered", () => {});
  it.skip("should emit an exit action when user triggered", () => {});
  it.skip("should request a translation file to use", () => {});
});
