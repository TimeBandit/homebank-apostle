#!/usr/bin/env node

import FileManager from "./file-manager/file-manager";
import Mediator from "./mediator/mediator";
import Parser from "./parser/parser";
import smilebankStrategy from "./parser/strategies/smilebank-strategy";
import { getLogger } from "./utils/utils";
import View from "./view/view";

const logger = getLogger(__filename);
logger.info("Lets parse your files...");

const view = new View();
const fileManager = new FileManager();
const parser = new Parser();
parser.strategy = smilebankStrategy;

const mediator = new Mediator({ view, fileManager, parser });
mediator.init();
fileManager.getCsvFileNames();
