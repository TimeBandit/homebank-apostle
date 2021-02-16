import Mediator from "../Mediator/Mediator";
import View from "./View";

jest.mock("../Mediator/Mediator.ts");

const view = new View();
const mediator = new Mediator({ view });

describe("view", () => {
  it("should request a chosen file to be read", () => {
    const testFile1 = "testFile1";
    const testFile2 = "testFile2";
    const fileNames = [testFile1, testFile2];

    const mockMediator = Mediator;
    view.selectFile(fileNames);
    // assert the the request method o the mediator is called correctly
    expect(mockRequest).toHaveBeenCalledWith({
      action: "view:selection",
      data: { selection: testFile2 },
    });
  });
  it.skip("should request an error to be skipped", () => {});
  it.skip("should request the CLI to exit", () => {});
  it.skip("should request a translation file to use", () => {});
});
