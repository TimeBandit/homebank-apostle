#!/usr/bin/env node

import FileManager from "./file-manager/file-manager";
import Mediator from "./mediator/mediator";
import Parser from "./parser/parser";
import smilebankStrategy from "./parser/strategies/smilebank-strategy";
import View from "./view/view";

console.log("starting...");

const view = new View();
const fileManager = new FileManager();
const parser = new Parser();
parser.setStrategy(smilebankStrategy);

const mediator = new Mediator({ view, fileManager, parser });
