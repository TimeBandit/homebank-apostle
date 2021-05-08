"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponent = void 0;
var BaseComponent = /** @class */ (function () {
    function BaseComponent(mediator) {
        if (mediator === void 0) { mediator = null; }
        this.mediator = mediator;
    }
    BaseComponent.prototype.setMediator = function (mediator) {
        this.mediator = mediator;
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
