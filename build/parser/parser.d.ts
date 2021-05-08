import { BaseComponent } from "../types";
import BaseStrategy from "./strategies/base-strategy";
declare class Parser extends BaseComponent {
    private _parser;
    parse(lineOfCsv: string): string;
    setParser(strategy: BaseStrategy): void;
}
export default Parser;