import papa from "papaparse";
import BaseStrategy from "./base-strategy";
import { HomebankPaymentType, HomebankTransaction } from "./types";

const SMILE_BANK_HEADERS = "Date,Description,Type,Money In,Money Out,Balance";

interface SmileTransaction {
  Date: string;
  Description: string;
  Type: SmilePaymentType;
  ["Money In"]: string;
  ["Money Out"]: string;
}

enum SmilePaymentType {
  ATM = "ATM",
  Transfer = "TRANSFER",
  Purchase = "PURCHASE",
  StandingOrder = "BP/SO",
  Credit = "CREDIT",
  DirectDebit = "DD",
}

class SmileBankStrategy implements BaseStrategy {
  getHomebankTransactionType(
    sourceTransactionType: SmilePaymentType
  ): HomebankPaymentType {
    let homeBankTransactionType: HomebankPaymentType;
    switch (sourceTransactionType) {
      case SmilePaymentType.ATM:
        homeBankTransactionType = HomebankPaymentType.Cash;
        break;
      case SmilePaymentType.Credit:
        homeBankTransactionType = HomebankPaymentType.ElectronicPayment;
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
        homeBankTransactionType = HomebankPaymentType.Transfer;
        break;
      default:
        homeBankTransactionType = HomebankPaymentType.None;
    }
    return homeBankTransactionType;
  }

  private toJSON(lineOfCsv: string): SmileTransaction {
    return papa.parse<SmileTransaction>(SMILE_BANK_HEADERS + "\n" + lineOfCsv, {
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

    const homebankTransaction = {
      date: smileTransaction.Date,
      payment: this.getHomebankTransactionType(smileTransaction.Type),
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
