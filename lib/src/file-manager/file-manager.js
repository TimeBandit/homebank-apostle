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
var fs_1 = __importDefault(require("fs"));
var line_reader_1 = __importDefault(require("line-reader"));
var path_1 = __importDefault(require("path"));
var types_1 = require("../types");
var utils_1 = require("../utils/utils");
var logger = utils_1.getLogger(__filename);
var FileManager = /** @class */ (function (_super) {
    __extends(FileManager, _super);
    function FileManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.reader = null;
        _this.fileName = "";
        return _this;
    }
    FileManager.prototype.loadFile = function (fileName) {
        var that = this;
        this.fileName = fileName;
        return new Promise(function (resolve, reject) {
            line_reader_1.default.open(fileName, function (err, reader) {
                var _a;
                if (err) {
                    resolve(err);
                }
                that.reader = reader;
                resolve(that.reader.isOpen());
                (_a = that.mediator) === null || _a === void 0 ? void 0 : _a.request({
                    action: "file-manager:loadFile",
                    data: { open: that.reader.isOpen() },
                });
            });
        });
    };
    FileManager.prototype.readLine = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a;
            if (!_this.reader) {
                reject(new Error("No reader initialized"));
            }
            (_a = _this.reader) === null || _a === void 0 ? void 0 : _a.nextLine(function (err, line) {
                var _a;
                if (err) {
                    reject(err);
                }
                resolve(line || "");
                (_a = _this.mediator) === null || _a === void 0 ? void 0 : _a.request({
                    action: "file-manager:readLine",
                    data: { line: line },
                });
            });
        });
    };
    FileManager.prototype.hasNextLine = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a, _b, _c;
            if ((_a = _this.reader) === null || _a === void 0 ? void 0 : _a.hasNextLine()) {
                resolve(true);
                (_b = _this.mediator) === null || _b === void 0 ? void 0 : _b.request({
                    action: "file-manager:hasNextLine",
                    data: { hasNextLine: true },
                });
            }
            (_c = _this.reader) === null || _c === void 0 ? void 0 : _c.close(function (err) {
                var _a;
                if (err) {
                    reject(err);
                }
                else {
                    resolve(false);
                    (_a = _this.mediator) === null || _a === void 0 ? void 0 : _a.request({
                        action: "file-manager:hasNextLine",
                        data: { hasNextLine: true },
                    });
                }
            });
        });
    };
    FileManager.prototype.getCsvFileNames = function () {
        var _a;
        var files = fs_1.default.readdirSync("./");
        var csvFilesNames = files.filter(function (fileName) {
            return path_1.default.extname(fileName) === ".csv";
        });
        if (csvFilesNames.length === 0) {
            logger.error("No csv files to select from");
        }
        (_a = this.mediator) === null || _a === void 0 ? void 0 : _a.request({
            action: "file-manager:getCsvFileNames",
            data: { csvFilesNames: csvFilesNames },
        });
    };
    return FileManager;
}(types_1.BaseComponent));
exports.default = FileManager;
