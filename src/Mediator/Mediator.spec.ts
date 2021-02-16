import Mediator from "./Mediator";

const mockFirstActionHandler = jest.fn();
const mockSecondActionHandler = jest.fn();

const mediator = new Mediator({});

describe("mediator", () => {
  it("should have no handlers", () => {
    expect(mediator.getHandlers()).toHaveLength(0);
  });
  it("should add a handler", () => {
    const handler = {
      action: "test-handler",
      handle: mockFirstActionHandler,
    };
    mediator.addHandler(handler);

    expect(mediator.getHandlers()[0]).toMatchObject(handler);
  });
  it("should call the correct handler when requested", () => {
    const handler = {
      action: "test:action",
      handle: mockFirstActionHandler,
    };
    mediator.addHandler(handler);

    const handler2 = {
      action: "second-handler",
      handle: mockSecondActionHandler,
    };
    mediator.addHandler(handler2);

    mediator.request({ action: "test:action", data: { count: 3 } });

    expect(mockFirstActionHandler).toHaveBeenCalled();
    expect(mockFirstActionHandler).toHaveBeenCalledTimes(1);
    expect(mockFirstActionHandler).toHaveBeenCalledWith({ count: 3 });
    expect(mockSecondActionHandler).toHaveBeenCalledTimes(0);
  });
});
