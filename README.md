![Node.js CI](https://github.com/TimeBandit/homebank-apostle/workflows/Node.js%20CI/badge.svg)

## homebank-apostle

![Homebank Apostle ](./header-small.png "Homebank Apostle")

> **Homebank Apostle** is tool to help you import files into Homebank.
> Export your internet banking transactions to CSV format and use
> this too convert make them readable by Homebank.

- [homebank-apostle](#homebank-apostle)
- [Features](#features)
- [Installation](#installation)
- [Support](#support)
- [Contributing](#contributing)

## Features

## Installation

## Support

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
