"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
var Parser = /** @class */ (function (_super) {
    __extends(Parser, _super);
    function Parser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._parser = null;
        return _this;
    }
    Parser.prototype.parse = function (lineOfCsv) {
        var _a;
        if (!this._parser)
            throw new Error("no parser strategy found");
        return (_a = this._parser) === null || _a === void 0 ? void 0 : _a.parse(lineOfCsv);
    };
    Parser.prototype.setParser = function (strategy) {
        this._parser = strategy;
    };
    return Parser;
}(types_1.BaseComponent));
exports.default = Parser;
