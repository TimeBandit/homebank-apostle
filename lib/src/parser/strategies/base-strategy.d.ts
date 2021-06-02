import { HomebankPaymentType } from "./types";
interface BaseStrategy {
    getHomebankTransactionType(sourceTransactionType: string): HomebankPaymentType;
    parse(lineOfCsv: string): string | Error;
}
export default BaseStrategy;
