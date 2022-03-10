import { describe, it, expect, beforeEach } from "vitest";
import { ImageBuilder } from "./image-builder";

describe("HelloWorld", () => {
  it("adds optimized arg properly", () => {
    const builder = new ImageBuilder("www.google.com");
    expect(builder.optimize().build()).toEqual("www.google.com/m");
  });

  it("adds filters properly", () => {
    //blur
    const builder = new ImageBuilder("www.google.com");
    expect(builder.optimize().blur(10).build()).toEqual(
      "www.google.com/m/filters:blur(10)"
    );
  });

  it("adds filters properly", () => {
    const builder = new ImageBuilder("www.google.com");
    expect(builder.optimize().build()).toEqual("www.google.com/m");
  });
});
