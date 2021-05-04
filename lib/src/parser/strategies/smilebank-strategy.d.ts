import BaseStrategy from "./base-strategy";
import { HomebankPaymentType } from "./types";
declare enum SmilePaymentType {
    ATM = "ATM",
    Transfer = "TRANSFER",
    Purchase = "PURCHASE",
    StandingOrder = "BP/SO",
    Credit = "CREDIT",
    DirectDebit = "DD"
}
declare class SmileBankStrategy implements BaseStrategy {
    getHomebankTransactionType(sourceTransactionType: SmilePaymentType): HomebankPaymentType;
    private toJSON;
    private toCSV;
    private getAmount;
    parse(lineOfCsv: string): string;
}
declare const _default: SmileBankStrategy;
export default _default;
