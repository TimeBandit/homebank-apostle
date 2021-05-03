import { HomebankPaymentType } from "./types";

interface BaseStrategy {
  getHomebankTransactionType(
    sourceTransactionType: string
  ): HomebankPaymentType;
  parse(lineOfCsv: string): string;
}

export default BaseStrategy;
