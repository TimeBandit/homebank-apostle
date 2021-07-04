import { HomebankPaymentType } from "./types";

interface BaseStrategy {
  sourceHeaders: string;
  destinationHeaders: string;
  mapSourceTypeToHomebankType(
    sourceTransactionType: string
  ): HomebankPaymentType;
  parse(lineOfCsv: string): string | Error;
}

export default BaseStrategy;
