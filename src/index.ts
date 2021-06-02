#!/usr/bin/env node

import FileManager from "./file-manager/file-manager";
import Mediator from "./mediator/mediator";
import Parser from "./parser/parser";
import smilebankStrategy from "./parser/strategies/smilebank-strategy";
import View from "./view/view";

console.log("Lets parse your files...");

const view = new View();
const fileManager = new FileManager();
const parser = new Parser();
parser.strategy = smilebankStrategy;

const mediator = new Mediator({ view, fileManager, parser });
mediator.init();
fileManager.getCsvFileNames();
