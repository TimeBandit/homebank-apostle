![alt text](img/banner.png "Homebank Apostle")

<h4>A tool to parse those transaction exports that aren't compatibable format</h4>
<br>

<p>
  <a href="https://github.com/TimeBandit/homebank-apostle/workflows/Node.js%20CI/badge.svg">
    <img src="https://github.com/TimeBandit/homebank-apostle/workflows/Node.js%20CI/badge.svg">
  </a>
  <a href="https://gitter.im/homebank-apostle/community">
    <img src="https://badges.gitter.im/homebank-apostle/community.svg">
  </a>
  <a href="https://paypal.me/imrannazir?locale.x=en_GB">
    <img src="https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=flat">
  </a>
</p>

<p>
  <a href="#key-features">Key Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

![screenshot](/img/demo.gif)

## Key Features

Homebank Apostle is tool to help you import files into Homebank. Export your internet banking transactions to CSV format and use this too convert make them readable by Homebank.

## Installation

## Usage

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

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

## License

[MIT](https://choosealicense.com/licenses/mit/)
