import { BaseComponent } from "../types";
import BaseStrategy from "./strategies/base-strategy";

class Parser extends BaseComponent {
  private _parser: BaseStrategy | null = null;

  parse(lineOfCsv: string) {
    this._parser?.parse(lineOfCsv);
  }

  setParser(strategy: BaseStrategy) {
    this._parser = strategy;
  }
}

export default Parser;
