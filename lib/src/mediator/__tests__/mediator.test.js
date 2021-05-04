"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mediator_1 = __importDefault(require("../mediator"));
var mockFirstActionHandler = jest.fn();
var mockSecondActionHandler = jest.fn();
var mediator = new mediator_1.default({});
describe("mediator", function () {
    it("should have no handlers", function () {
        expect(mediator.getHandlers()).toHaveLength(0);
    });
    it("should add a handler", function () {
        var handler = {
            action: "test-handler",
            handle: mockFirstActionHandler,
        };
        mediator.addHandler(handler);
        expect(mediator.getHandlers()[0]).toMatchObject(handler);
    });
    it("should call the correct handler when requested", function () {
        var handler = {
            action: "test:action",
            handle: mockFirstActionHandler,
        };
        mediator.addHandler(handler);
        var handler2 = {
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
