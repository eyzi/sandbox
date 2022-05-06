import { expect } from "chai";
import run, { RETURN_VALUE } from "./index";

describe("run function", function () {
  it("should return a constant value", async function () {
    const value = await run();
    expect(value).to.equal(RETURN_VALUE);
  });
});
