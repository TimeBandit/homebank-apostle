jest.mock("fs", () => {
  const originalFsModule = jest.requireActual("fs");

  // * mock specific method in a module
  return {
    ...originalFsModule,
    readFileSync: jest.fn(),
  };
});

import fs from "fs";
// mock a file opening
describe("describe", () => {
  it("should open a csv file", () => {
    console.log(fs);
  });
  // it("should return the first line of the file", () => {});
});
