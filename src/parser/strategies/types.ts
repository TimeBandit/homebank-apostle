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

// from 0=none to 10=FI fee (in the same order of the list)
export enum HomebankPaymentType {
  None = 0,
  CreditCard = 1,
  Cheque = 2,
  Cash = 3,
  Transfer = 4,
  DebitCard = 5,
  StandingOrder = 6,
  ElectronicPayment = 7,
  Deposit = 8,
  FiFee = 9,
  DirectDebit = 10,
}
