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

    view.setQuestion("Select a file", fileNames);
    view.promptUser();

    // select the file
    view.prompt?.on("run", () => {
      stdin.send(`\u001b[B`); // down
      stdin.send(`\u000d`); // enter
    });

    view.prompt?.on("submit", async () => {
      await view.submit();
      expect(mockRequest).toHaveBeenCalledWith({
        action: "view:select",
        data: { selection: testFile2 },
      });
      done();
    });
  });
  it("should emit a skip action when user triggered", (done) => {
    const skipAction = "skip";
    const exitAction = "exit";
    const actions = [skipAction, exitAction];

    view.setQuestion("Error, what do you want to do", actions);
    view.promptUser();

    // select the file
    view.prompt?.on("run", () => {
      stdin.send(`\u000d`); // enter
    });

    view.prompt?.on("submit", async () => {
      await view.submit();
      expect(mockRequest).toHaveBeenCalledWith({
        action: "view:select",
        data: { selection: "skip" },
      });
      done();
    });
  });
  it("should emit an exit action when user triggered", (done) => {
    const skipAction = "skip";
    const exitAction = "exit";
    const actions = [skipAction, exitAction];

    view.setQuestion("Error, what do you want to do", actions);
    view.promptUser();

    // select the file
    view.prompt?.on("run", () => {
      stdin.send(`\u001b[B`); // down
      stdin.send(`\u000d`); // enter
    });

    view.prompt?.on("submit", async () => {
      await view.submit();
      expect(mockRequest).toHaveBeenCalledWith({
        action: "view:select",
        data: { selection: "exit" },
      });
      done();
    });
  });
});
