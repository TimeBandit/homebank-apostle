import logger from "../logger/logger";
import { BaseComponent } from "../types";
import BaseStrategy from "./strategies/base-strategy";

class Parser extends BaseComponent {
  private _parser: BaseStrategy | null = null;

  parse(lineOfCsv: string) {
    if (!this._parser) throw new Error("no parser strategy found");
    let result;
    try {
      result = this._parser?.parse(lineOfCsv);
      logger.info("Parsed: ", lineOfCsv);
      this.mediator?.request({
        action: "parser:result",
        data: { result },
      });
      return result;
    } catch (error) {
      logger.error("Failed to parse: ", lineOfCsv, error);
      this.mediator?.request({
        action: "parser:result",
        data: { result: error },
      });
      throw error;
    }
  }

  setStrategy(strategy: BaseStrategy) {
    this._parser = strategy;
  }
}

export default Parser;
