"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var papaparse_1 = __importDefault(require("papaparse"));
var types_1 = require("./types");
var SMILE_BANK_HEADERS = "Date,Description,Type,Money In,Money Out,Balance";
var SmilePaymentType;
(function (SmilePaymentType) {
    SmilePaymentType["ATM"] = "ATM";
    SmilePaymentType["Transfer"] = "TRANSFER";
    SmilePaymentType["Purchase"] = "PURCHASE";
    SmilePaymentType["StandingOrder"] = "BP/SO";
    SmilePaymentType["Credit"] = "CREDIT";
    SmilePaymentType["DirectDebit"] = "DD";
})(SmilePaymentType || (SmilePaymentType = {}));
var SmileBankStrategy = /** @class */ (function () {
    function SmileBankStrategy() {
    }
    SmileBankStrategy.prototype.getHomebankTransactionType = function (sourceTransactionType) {
        var homeBankTransactionType;
        switch (sourceTransactionType) {
            case SmilePaymentType.ATM:
                homeBankTransactionType = types_1.HomebankPaymentType.Cash;
                break;
            case SmilePaymentType.Credit:
                homeBankTransactionType = types_1.HomebankPaymentType.ElectronicPayment;
                break;
            case SmilePaymentType.DirectDebit:
                homeBankTransactionType = types_1.HomebankPaymentType.DirectDebit;
                break;
            case SmilePaymentType.Purchase:
                homeBankTransactionType = types_1.HomebankPaymentType.DebitCard;
                break;
            case SmilePaymentType.StandingOrder:
                homeBankTransactionType = types_1.HomebankPaymentType.StandingOrder;
                break;
            case SmilePaymentType.Transfer:
                homeBankTransactionType = types_1.HomebankPaymentType.Transfer;
                break;
            default:
                throw new Error("smile payment type not found");
        }
        return homeBankTransactionType;
    };
    SmileBankStrategy.prototype.toJSON = function (lineOfCsv) {
        return papaparse_1.default.parse(SMILE_BANK_HEADERS + "\n" + lineOfCsv, {
            header: true,
        }).data[0]; // par
    };
    SmileBankStrategy.prototype.toCSV = function (data) {
        return papaparse_1.default.unparse([data], { header: false, delimiter: ";" });
    };
    SmileBankStrategy.prototype.getAmount = function (transaction) {
        var amount = parseFloat(transaction["Money In"]) ||
            -1 * parseFloat(transaction["Money Out"]);
        if (isNaN(amount)) {
            throw new Error("error transforming " + JSON.stringify(transaction, null, 2));
        }
        return amount;
    };
    SmileBankStrategy.prototype.parse = function (lineOfCsv) {
        var smileTransaction = this.toJSON(lineOfCsv);
        var homebankTransaction = {
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
    };
    return SmileBankStrategy;
}());
exports.default = new SmileBankStrategy();
