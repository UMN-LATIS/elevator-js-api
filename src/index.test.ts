import { expect } from "@jest/globals";
import elevator from "./index";

describe("elevator api", () => {
  it("rejects setup without options", async () => {
    const testFn = () => {
      const elevatorInstance = new elevator();
    }
    expect(testFn).toThrow();
  });

   it("rejects invalid collections", async () => {
    const elevatorInstance = new elevator({
        key: "",
        secret: "",
        baseURL: ""
    });
    expect(elevatorInstance.getAssetsFromCollection("blah")).toThrow();

  });
});