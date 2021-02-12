import apostle from "./Apostle";

const mockFirstActionHandler = jest.fn();
const mockSecondActionHandler = jest.fn();

describe("apostle", () => {
  it("should have no handlers", () => {
    expect(apostle.getHandlers()).toHaveLength(0);
  });
  it("should add a handler", () => {
    const handler = {
      action: "test-handler",
      handler: mockFirstActionHandler,
    };
    apostle.addHandler(handler);

    expect(apostle.getHandlers()[0]).toMatchObject(handler);
  });
  it("should call the correct handler when requested", () => {
    const handler = {
      action: "fist-action",
      handler: mockFirstActionHandler,
    };
    apostle.addHandler(handler);

    const handler2 = {
      action: "second-handler",
      handler: mockSecondActionHandler,
    };
    apostle.addHandler(handler2);

    apostle.request({ action: "fist-action", data: { count: 3 } });

    expect(mockFirstActionHandler).toHaveBeenCalled();
    expect(mockFirstActionHandler).toHaveBeenCalledTimes(1);
    expect(mockFirstActionHandler).toHaveBeenCalledWith({ count: 3 });
    expect(mockSecondActionHandler).toHaveBeenCalledTimes(0);
  });
});
