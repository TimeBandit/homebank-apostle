import papa from "papaparse";
import BaseStrategy from "./base-strategy";
import {
  HomebankPaymentType,
  HomebankTransaction,
  SmilePaymentType,
} from "./types";

const SOURCE_HEADERS = "Date,Description,Type,Money In,Money Out,Balance";
const DESTINATION_HEADERS = "date;payment;info;payee;memo;amount;category;tags";
interface SmileTransaction {
  Date: string;
  Description: string;
  Type: SmilePaymentType;
  ["Money In"]: string;
  ["Money Out"]: string;
  Balance: string;
}

class SmileBankStrategy implements BaseStrategy {
  sourceHeaders = SOURCE_HEADERS;
  destinationHeaders = DESTINATION_HEADERS;
  mapSourceTypeToHomebankType(
    sourceTransactionType: SmilePaymentType
  ): HomebankPaymentType {
    let homeBankTransactionType: HomebankPaymentType;
    switch (sourceTransactionType) {
      case SmilePaymentType.ATM:
        homeBankTransactionType = HomebankPaymentType.Cash;
        break;
      case SmilePaymentType.Credit:
        homeBankTransactionType = HomebankPaymentType.BankTransfer;
        break;
      case SmilePaymentType.DirectDebit:
        homeBankTransactionType = HomebankPaymentType.DirectDebit;
        break;
      case SmilePaymentType.Purchase:
        homeBankTransactionType = HomebankPaymentType.DebitCard;
        break;
      case SmilePaymentType.StandingOrder:
        homeBankTransactionType = HomebankPaymentType.StandingOrder;
        break;
      case SmilePaymentType.Transfer:
        homeBankTransactionType = HomebankPaymentType.ElectronicPayment;
        break;
      case SmilePaymentType.Interest:
        homeBankTransactionType = HomebankPaymentType.FiFee;
        break;
      case SmilePaymentType.Other:
      case SmilePaymentType.Unknown:
        homeBankTransactionType = HomebankPaymentType.None;
        break;
      default:
        throw new Error(`no payment type for ${sourceTransactionType}`);
    }
    return homeBankTransactionType;
  }

  private toJSON(lineOfCsv: string): SmileTransaction {
    return papa.parse<SmileTransaction>(this.sourceHeaders + "\n" + lineOfCsv, {
      header: true,
    }).data[0]; // par
  }

  private toCSV(data: HomebankTransaction): string {
    return papa.unparse([data], { header: false, delimiter: ";" });
  }

  private getAmount(transaction: SmileTransaction): number {
    const amount =
      parseFloat(transaction["Money In"]) ||
      -1 * parseFloat(transaction["Money Out"]);

    if (isNaN(amount)) {
      throw new Error(
        `error transforming ${JSON.stringify(transaction, null, 2)}`
      );
    }
    return amount;
  }

  parse(lineOfCsv: string): string {
    const smileTransaction = this.toJSON(lineOfCsv);

    const homebankTransaction: HomebankTransaction = {
      date: smileTransaction.Date,
      payment: this.mapSourceTypeToHomebankType(smileTransaction.Type),
      info: "",
      payee: "",
      memo: smileTransaction.Description,
      amount: this.getAmount(smileTransaction),
      category: "",
      tags: "",
    };

    return this.toCSV(homebankTransaction);
  }
}

export default new SmileBankStrategy();
