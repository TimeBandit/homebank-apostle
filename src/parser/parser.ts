import { BaseComponent } from "../types";
import { status } from "../utils/utils";
import BaseStrategy from "./strategies/base-strategy";

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
      status.fail(`Failed to parse: ${lineOfCsv}: ${error}`);
      throw error;
    }
  }

  get destinationHeaders() {
    return this._parser?.destinationHeaders;
  }
  get sourceHeaders() {
    return this._parser?.sourceHeaders;
  }
  set strategy(strategy: BaseStrategy) {
    this._parser = strategy;
  }
}

export default Parser;
