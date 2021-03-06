import Mediator from "../../Mediator/Mediator";
import View from "../View";

const view = new View();
const mediator = new Mediator({ view });
const mockRequest = jest.spyOn(mediator, "request");
const stdin = require("mock-stdin").stdin();

describe("view", () => {
  it("should request a chosen file to be read", (done) => {
    const testFile1 = "testFile1";
    const testFile2 = "testFile2";
    const fileNames = [testFile1, testFile2];

    // sets up the user prompt
    view.promptUser(fileNames);
    view.selectChoice();
    // select the file to read
    view.prompt?.on("run", () => {
      // process.nextTick(() => {
      stdin.send(`\u001b[B`);
      stdin.send(`\u000d`);
      // });
      // expect(mockRequest).toHaveBeenCalledWith({
      //   action: "view:select-file",
      //   data: { selection: testFile2 },
      // });
      // done();
    });
    view.prompt?.on("submit", (selection) => {
      console.log("SUBMISSIONS", selection);
      view.submit(selection);
      // process.nextTick(() => {
      //   stdin.send(`\u001b[B`);
      //   stdin.send(`\u000d`);
      // });
      expect(mockRequest).toHaveBeenCalledWith({
        action: "view:select-file",
        data: { selection: testFile2 },
      });
      done();
    });

    // assert
  });
  it.skip("should emit a skip action when user triggered", () => {});
  it.skip("should emit an exit action when user triggered", () => {});
  it.skip("should request a translation file to use", () => {});
});
