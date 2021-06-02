import { HomebankPaymentType } from "./types";

interface BaseStrategy {
  headers: string;
  mapSourceTypeToHomebankType(
    sourceTransactionType: string
  ): HomebankPaymentType;
  parse(lineOfCsv: string): string | Error;
}

export default BaseStrategy;
