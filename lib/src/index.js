#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var file_manager_1 = __importDefault(require("./file-manager/file-manager"));
var mediator_1 = __importDefault(require("./mediator/mediator"));
var parser_1 = __importDefault(require("./parser/parser"));
var smilebank_strategy_1 = __importDefault(require("./parser/strategies/smilebank-strategy"));
var view_1 = __importDefault(require("./view/view"));
console.log("Lets parse your files...");
var view = new view_1.default();
var fileManager = new file_manager_1.default();
var parser = new parser_1.default();
parser.setStrategy(smilebank_strategy_1.default);
var mediator = new mediator_1.default({ view: view, fileManager: fileManager, parser: parser });
mediator.init();
fileManager.getCsvFileNames();
