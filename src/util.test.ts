import { first, last, list, shortLocation } from "./util";

describe("Util", () => {
  describe("list", () => {
    it("returns object wrapped in an array", () => {
      expect(list("test")).toEqual(["test"]);
    });

    it("returns object if it already is an array", () => {
      expect(list(["test"])).toEqual(["test"]);
    });
  });

  describe("first", () => {
    it("returns the first element of an array", () => {
      expect(first(["a", "b", "c"])).toEqual("a");
    });

    it("returns undefined if array is empty", () => {
      expect(first([])).toEqual(undefined);
    });
  });

  describe("last", () => {
    it("returns the last element of an array", () => {
      expect(last(["a", "b", "c"])).toEqual("c");
    });

    it("returns undefined if array is empty", () => {
      expect(last([])).toEqual(undefined);
    });
  });

  describe("shortLocation", () => {
    it("returns everything before the first comma", () => {
      expect(shortLocation("left,right")).toEqual("left");
    });

    it("returns everything if there is no comma", () => {
      expect(shortLocation("leftright")).toEqual("leftright");
    });
  });
});
