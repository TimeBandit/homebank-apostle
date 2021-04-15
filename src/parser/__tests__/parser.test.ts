import Parser from "../parser";
import smilebankStrategy from "../strategies/smilebank-strategy";

const testData = [
  [
    "2018-10-31,LINK    15:37OCT31,ATM,,250.00,2374.65",
    "2018-10-31;;;;LINK    15:37OCT31;-250;;ATM",
  ],
  [
    "2018-10-25,E HERRERO-FOS      ROOM RENT,CREDIT,350.00,,3511.18",
    "2018-10-25;;;;E HERRERO-FOS      ROOM RENT;350;;CREDIT",
  ],
  [
    "2018-10-31,VIRGIN MOBILE      FA63305629,DD,,11.50,2363.15",
    "2018-10-31;;;;VIRGIN MOBILE      FA63305629;-11.5;;DD",
  ],
  [
    "2018-11-02,ASDA SUPERSTORE,PURCHASE,,64.05,2251.36",
    "2018-11-02;;;;ASDA SUPERSTORE;-64.05;;PURCHASE",
  ],
  [
    "2018-10-25,SABINE-NW-ACC      PAY BACK FOR INTER,BP/SO,,1050.00,3161.18",
    "2018-10-25;;;;SABINE-NW-ACC      PAY BACK FOR INTER;-1050;;BP/SO",
  ],
  [
    "2018-11-15,TFR 77915682212360,TRANSFER,,150.00,1829.51",
    "2018-11-15;4;;;TFR 77915682212360;-150;;",
  ],
  [
    "2018-11-15,TFR 77915682212360,UNKNOWN,,150.00,1829.51",
    "2018-11-15;4;;;TFR 77915682212360;-150;;",
  ],
];

const testParser = new Parser();
testParser.setParser(smilebankStrategy);
describe("parser", () => {
  test.each(testData)("give %s parser should return %s", (source, parsed) => {
    const result = testParser.parse(source);
    expect(result).toEqual(parsed);
  });

  it("should throw an error if csv cannot be parsed", () => {});
});
