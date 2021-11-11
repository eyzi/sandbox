import { expect } from "chai";
import run from "./index";

describe("run function", function () {
  it("should return a constant value", async function () {
    const value = await run();
    expect(value).to.equal("New Value");
  });
});
