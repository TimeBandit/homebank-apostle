import apostle from "./Apostle";

describe("apostle", () => {
  it("should have no handlers", () => {
    expect(apostle.getHandlers()).toHaveLength(0);
  });
  it("should add a handler", () => {
    const mockHandleFunction = jest.fn();
    const handler = { name: "testHandler", handle: mockHandleFunction };

    apostle.addHandler(handler);

    expect(apostle.getHandlers()[0]).toMatchObject(handler);
  });
  it("should call a handler when requested", () => {});
  it("should not call the handler with incorect name", () => {});
  // it("runs your tests", () => {
  //   expect(1).toEqual(1);
  // });
});
