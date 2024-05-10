import formatCurrency from "../../scripts/utils/formatCurrency.js";


describe("test suite: formatCurrency", () => {

  it("convert cents to dollars" , () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });

  it("works with zero", () => {
    expect(formatCurrency(0)).toEqual("0.00")
  });

 describe("rounding" , () => {
  it("round up to the nearest cents" , () => {
    expect(formatCurrency(2000.4)).toEqual("20.00");
    expect(formatCurrency(2000.6)).toEqual("20.01");
  });
 });
});