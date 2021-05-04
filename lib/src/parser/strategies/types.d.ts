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
export declare enum HomebankPaymentType {
    None = 0,
    CreditCard = 1,
    Cheque = 2,
    Cash = 3,
    Transfer = 4,
    InternalTransfer = 5,
    DebitCard = 6,
    StandingOrder = 7,
    ElectronicPayment = 8,
    Deposit = 9,
    FiFee = 10,
    DirectDebit = 11
}
