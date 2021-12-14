import {
  expand,
  applyExpandRule,
  toPairs,
  expandPolymer,
  expandPolymerNTimes,
  charCounts,
  maxMinusMinCharCount,
} from "./app";

describe("app test suite", () => {
  describe("expand", () => {
    it("should expand the rule correctly", () => {
      expect(expand({ input: "AB", output: "C" })).toBe("ACB");
    });
  });
  describe("applyExpandRule", () => {
    it("should apply the rule if the string meet it", () => {
      expect(applyExpandRule("AB")({ input: "AB", output: "C" })).toBe("ACB");
    });
    it("should not apply the rule if the string does not meet it", () => {
      expect(applyExpandRule("AC")({ input: "AB", output: "C" })).toBe("AC");
      expect(applyExpandRule("ACB")({ input: "AB", output: "C" })).toBe("ACB");
    });
  });
  describe("toPairs", () => {
    it("should do the pairs agrupation correctly", () => {
      expect(toPairs("ABCD")).toEqual(["AB", "BC", "CD"]);
    });
    it("should work with a pair", () => {
      expect(toPairs("AB")).toEqual(["AB"]);
    });
  });
  describe("expandPolymer", () => {
    const rules = [
      { input: "CH", output: "B" },
      { input: "HH", output: "N" },
      { input: "CB", output: "H" },
      { input: "NH", output: "C" },
      { input: "HB", output: "C" },
      { input: "HC", output: "B" },
      { input: "HN", output: "C" },
      { input: "NN", output: "C" },
      { input: "BH", output: "H" },
      { input: "NC", output: "B" },
      { input: "NB", output: "B" },
      { input: "BN", output: "B" },
      { input: "BB", output: "N" },
      { input: "BC", output: "B" },
      { input: "CC", output: "N" },
      { input: "CN", output: "C" },
    ];
    it("should do the correct expansion", () => {
      const expandTest = expandPolymer(rules);
      expect(expandTest("CH")).toBe("CBH");
      expect(expandTest("NNCB")).toBe("NCNBCHB");
      expect(expandTest("NCNBCHB")).toBe("NBCCNBBBCBHCB");
    });
  });
  describe("expandPolymerNTimes", () => {
    const rules = [
      { input: "CH", output: "B" },
      { input: "HH", output: "N" },
      { input: "CB", output: "H" },
      { input: "NH", output: "C" },
      { input: "HB", output: "C" },
      { input: "HC", output: "B" },
      { input: "HN", output: "C" },
      { input: "NN", output: "C" },
      { input: "BH", output: "H" },
      { input: "NC", output: "B" },
      { input: "NB", output: "B" },
      { input: "BN", output: "B" },
      { input: "BB", output: "N" },
      { input: "BC", output: "B" },
      { input: "CC", output: "N" },
      { input: "CN", output: "C" },
    ];
    it("should do the correct expansion", () => {
      const expandTest = expandPolymerNTimes(rules);
      expect(expandTest(2)("NNCB")).toBe("NBCCNBBBCBHCB");
      expect(expandTest(3)("NNCB")).toBe("NBBBCNCCNBBNBNBBCHBHHBCHB");
      expect(expandTest(4)("NNCB")).toBe(
        "NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB"
      );
    });
  });
  describe("charCounts", () => {
    it("should return char counts", () => {
      expect(charCounts("AAABB")).toEqual({ A: 3, B: 2 });
    });
  });
  describe("maxMinusMinCharCount", () => {
    it("should return char counts operation", () => {
      expect(maxMinusMinCharCount("AAABBCDE")).toBe(2);
      expect(maxMinusMinCharCount("AAABBCDE")).toBe(2);
    });
  });
  describe("readme example", () => {
    const rules = [
      { input: "CH", output: "B" },
      { input: "HH", output: "N" },
      { input: "CB", output: "H" },
      { input: "NH", output: "C" },
      { input: "HB", output: "C" },
      { input: "HC", output: "B" },
      { input: "HN", output: "C" },
      { input: "NN", output: "C" },
      { input: "BH", output: "H" },
      { input: "NC", output: "B" },
      { input: "NB", output: "B" },
      { input: "BN", output: "B" },
      { input: "BB", output: "N" },
      { input: "BC", output: "B" },
      { input: "CC", output: "N" },
      { input: "CN", output: "C" },
    ];
    it("should return char counts operation", () => {
      expect(
        maxMinusMinCharCount(expandPolymerNTimes(rules)(10)("NNCB") as string)
      ).toBe(1588);
    });
  });
});
