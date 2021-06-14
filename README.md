![Node.js CI](https://github.com/TimeBandit/homebank-apostle/workflows/Node.js%20CI/badge.svg)

![alt text](banner.png "Homebank Apostle")

<h4>A tool for importing your csv files into Homebank</h4>

<p>
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#contributing">Contributing</a> •
</p>

Homebank Apostle is tool to help you import files into Homebank. Export your internet banking transactions to CSV format and use this too convert make them readable by Homebank.

## Installation

## Usage

## Contributing

To add support for other bank exports you must first create a strategy for it. This tell the tool how to map payment types from your bank to something Homebanks can understand.

Below are the payment types that Homebank currently supports. They correspond to the selectables of the Payment dropdown list you see when you edit a transaction in Homebank. The ordering is important

```
enum HomebankPaymentType {
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
```

Create a stategy for your bank that implement the BaseStrategy interface. This maps the payment types for your bank to Homebank transaction types. It needs a `parse(...)` method that takes a like of CSV from your source file and a `mapSourceTypeToHomebankType(...)` that does the actual mapping of the payment types.
