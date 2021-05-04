"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = __importDefault(require("../parser"));
var smilebank_strategy_1 = __importDefault(require("../strategies/smilebank-strategy"));
var testData = [
    [
        "2019-05-28,LINK    09:14MAY25,ATM,,20.00,2254.25",
        "2019-05-28;3;;;LINK    09:14MAY25;-20;;",
    ],
    [
        "2019-09-04,JUSTPARK WITHDRAWA 377824,CREDIT,855.20,,4378.24",
        "2019-09-04;8;;;JUSTPARK WITHDRAWA 377824;855.2;;",
    ],
    [
        "2019-09-02,VIRGIN MOBILE      FA63305629,DD,,40.77,3523.04",
        "2019-09-02;11;;;VIRGIN MOBILE      FA63305629;-40.77;;",
    ],
    [
        "2019-05-29,TESCO STORE 2813,PURCHASE,,2.71,2626.54",
        "2019-05-29;6;;;TESCO STORE 2813;-2.71;;",
    ],
    [
        "2019-08-30,CRABB CURTIS       W1529 PATTERSON,BP/SO,,750.00,3563.81",
        "2019-08-30;7;;;CRABB CURTIS       W1529 PATTERSON;-750;;",
    ],
    [
        "2018-11-15,TFR 77915682212360,TRANSFER,,150.00,1829.51",
        "2018-11-15;4;;;TFR 77915682212360;-150;;",
    ],
];
var badTestData = [["2018-11-15,TFR 77915682212360,UNKNOWN,,150.00,1829.51"]];
var testParser = new parser_1.default();
testParser.setParser(smilebank_strategy_1.default);
describe("parser", function () {
    test.each(testData)("given %s parser should return %s", function (source, parsed) {
        var result = testParser.parse(source);
        expect(result).toEqual(parsed);
    });
    test.each(badTestData)("given %s parser should return an error", function (source) {
        var error = function () {
            testParser.parse(source);
        };
        expect(error).toThrowError("smile payment type not found");
    });
    it("should write a debug log on error", function () { });
});
