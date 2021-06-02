import Mediator from "../../mediator/mediator";
import Parser from "../parser";
import smilebankStrategy from "../strategies/smilebank-strategy";

const testData = [
  [
    "2019-05-28,LINK    09:14MAY25,ATM,,20.00,2254.25",
    "2019-05-28;3;;;LINK    09:14MAY25;-20;;",
  ],
  [
    "2019-09-04,JUSTPARK WITHDRAWA 377824,CREDIT,855.20,,4378.24",
    "2019-09-04;7;;;JUSTPARK WITHDRAWA 377824;855.2;;",
  ],
  [
    "2019-09-02,VIRGIN MOBILE      FA63305629,DD,,40.77,3523.04",
    "2019-09-02;10;;;VIRGIN MOBILE      FA63305629;-40.77;;",
  ],
  [
    "2019-05-29,TESCO STORE 2813,PURCHASE,,2.71,2626.54",
    "2019-05-29;5;;;TESCO STORE 2813;-2.71;;",
  ],
  [
    "2019-08-30,CRABB CURTIS       W1529 PATTERSON,BP/SO,,750.00,3563.81",
    "2019-08-30;6;;;CRABB CURTIS       W1529 PATTERSON;-750;;",
  ],
  [
    "2018-11-15,TFR 77915682212360,TRANSFER,,150.00,1829.51",
    "2018-11-15;4;;;TFR 77915682212360;-150;;",
  ],
  [
    "2018-11-15,TFR 77915682212360,OTHER,,150.00,1829.51",
    "2018-11-15;0;;;TFR 77915682212360;-150;;",
  ],
  [
    "2018-11-15,TFR 77915682212360,UNKNOWN,,150.00,1829.51",
    "2018-11-15;0;;;TFR 77915682212360;-150;;",
  ],
];

const badTestData = [["2018-11-15,TFR 77915682212360,blabla,,150.00,1829.51"]];

const parser = new Parser();
parser.strategy = smilebankStrategy;
const mediator = new Mediator({ parser });
const mockRequest = jest.spyOn(mediator, "request");

describe("parsers", () => {
  describe("smilbank stratergy", () => {
    test.each(testData)(
      "given %s parser should return %s",
      (source, parsed) => {
        console.log(source, parsed);
        parser.parse(source);
        expect(mockRequest).toHaveBeenCalledWith({
          action: "parser:result",
          data: { result: parsed },
        });
      }
    );
    test.each(badTestData)(
      "given %s parser should return an error",
      (source) => {
        const error = () => {
          parser.parse(source);
        };
        expect(error).toThrowError("no payment type for blabla");
      }
    );
  });
});
