"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mediator = void 0;
var utils_1 = require("../utils/utils");
var logger = utils_1.getLogger(__filename);
var Mediator = /** @class */ (function () {
    function Mediator(config) {
        if (config === void 0) { config = {}; }
        var _a, _b, _c;
        this.handlers = [];
        this.view = config.view || null;
        (_a = this.view) === null || _a === void 0 ? void 0 : _a.setMediator(this);
        this.filemanager = config.fileManager || null;
        (_b = this.filemanager) === null || _b === void 0 ? void 0 : _b.setMediator(this);
        this.parser = config.parser || null;
        (_c = this.parser) === null || _c === void 0 ? void 0 : _c.setMediator(this);
    }
    Mediator.prototype.addHandler = function (handler) {
        this.handlers.push(handler);
    };
    Mediator.prototype.getHandlers = function () {
        return this.handlers;
    };
    Mediator.prototype.request = function (payload) {
        var handler = this.handlers.find(function (handler) { return handler.action === payload.action; });
        if (handler) {
            handler.handle(payload.data || undefined);
        }
    };
    Mediator.prototype.init = function () {
        var _this = this;
        this.addHandler({
            action: "file-manager:getCsvFileNames",
            handle: function (data) {
                var _a, _b;
                logger.info(data);
                if (data) {
                    (_a = _this.view) === null || _a === void 0 ? void 0 : _a.setQuestion("select a file to convert", data.csvFilesNames);
                    (_b = _this.view) === null || _b === void 0 ? void 0 : _b.promptUser();
                }
            },
        });
    };
    return Mediator;
}());
exports.Mediator = Mediator;
exports.default = Mediator;
