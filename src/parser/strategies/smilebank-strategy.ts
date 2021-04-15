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

  toJSON(lineOfCsv: string): SmileTransaction {
    return papa.parse<SmileTransaction>(SMILE_BANK_HEADERS + "\n" + lineOfCsv, {
      header: true,
    }).data[0]; // par
  }

  toCSV(data: HomebankTransaction): string {
    return papa.unparse([data], { header: false, delimiter: ";" });
  }

  parse(lineOfCsv: string): string {
    const smileTransaction = this.toJSON(lineOfCsv);
    const homeBankTransactionType = this.getHomebankTransactionType(
      smileTransaction.Type
    );

    const amount =
      parseFloat(smileTransaction["Money In"]) ||
      -1 * parseFloat(smileTransaction["Money Out"]);

    if (isNaN(amount)) {
      throw new Error(
        `error transforming ${JSON.stringify(smileTransaction, null, 2)}`
      );
    }

    const homebankTransaction = {
      date: smileTransaction.Date,
      payment: homeBankTransactionType,
      info: "",
      payee: "",
      memo: smileTransaction.Description,
      amount,
      category: "",
      tags: "",
    };

    return this.toCSV(homebankTransaction);
  }
}

export default new SmileBankStrategy();
