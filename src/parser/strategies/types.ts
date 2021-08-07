export interface HomebankTransaction {
  date: string;
  payment: HomebankPaymentType;
  info: string;
  payee: string;
  memo: string;
  amount: number;
  category: string;
  tags: string;
}

// from 1=none to 11=direct debit (in the same order of the list)
export enum HomebankPaymentType {
  None = 1,
  CreditCard = 2,
  Cheque = 3,
  Cash = 4,
  BankTransfer = 5,
  DebitCard = 6,
  StandingOrder = 7,
  ElectronicPayment = 8,
  Deposit = 9,
  FiFee = 10,
  DirectDebit = 11,
}

export enum SmilePaymentType {
  ATM = "ATM",
  Transfer = "TRANSFER",
  Purchase = "PURCHASE",
  StandingOrder = "BP/SO",
  Credit = "CREDIT",
  DirectDebit = "DD",
  Other = "OTHER",
  Unknown = "UNKNOWN",
}
