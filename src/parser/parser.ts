import createLogger from "logging";
import { BaseComponent } from "../types";
import BaseStrategy from "./strategies/base-strategy";

const logger = createLogger(__filename);

class Parser extends BaseComponent {
  private _parser: BaseStrategy | null = null;

  parse(lineOfCsv: string) {
    if (!this._parser) throw new Error("no parser strategy found");
    let result;
    try {
      result = this._parser?.parse(lineOfCsv);
      this.mediator?.request({
        action: "parser:result",
        data: { result },
      });
    } catch (error) {
      logger.error("Failed to parse: ", lineOfCsv, error);
      throw error;
    }
  }

  get headers() {
    return this._parser?.headers;
  }
  set strategy(strategy: BaseStrategy) {
    this._parser = strategy;
  }
}

export default Parser;
