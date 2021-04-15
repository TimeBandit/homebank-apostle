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

export enum HomebankPaymentType {
  None,
  CreditCard,
  Cheque,
  Cash,
  Transfer,
  InternalTransfer,
  DebitCard,
  StandingOrder,
  ElectronicPayment,
  Deposit,
  FiFee,
  DirectDebit,
}
