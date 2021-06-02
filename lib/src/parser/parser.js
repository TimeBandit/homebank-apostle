"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logging_1 = __importDefault(require("logging"));
var types_1 = require("../types");
var logger = logging_1.default(__filename);
var Parser = /** @class */ (function (_super) {
    __extends(Parser, _super);
    function Parser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._parser = null;
        return _this;
    }
    Parser.prototype.parse = function (lineOfCsv) {
        var _a, _b, _c;
        if (!this._parser)
            throw new Error("no parser strategy found");
        var result;
        try {
            result = (_a = this._parser) === null || _a === void 0 ? void 0 : _a.parse(lineOfCsv);
            logger.info("Parsed: ", lineOfCsv);
            (_b = this.mediator) === null || _b === void 0 ? void 0 : _b.request({
                action: "parser:result",
                data: { result: result },
            });
            return result;
        }
        catch (error) {
            logger.error("Failed to parse: ", lineOfCsv, error);
            (_c = this.mediator) === null || _c === void 0 ? void 0 : _c.request({
                action: "parser:result",
                data: { result: error },
            });
            throw error;
        }
    };
    Parser.prototype.setStrategy = function (strategy) {
        this._parser = strategy;
    };
    return Parser;
}(types_1.BaseComponent));
exports.default = Parser;
