import { describe, it, expect, beforeEach } from "vitest";
import { ImageBuilder } from "./image-builder";

describe("HelloWorld", () => {
  it("adds optimized arg properly", () => {
    const builder = new ImageBuilder("www.google.com");
    expect(builder.optimize().build()).toEqual("www.google.com/m/");
  });

  it("adds blur filter properly", () => {
    //blur
    const builder = new ImageBuilder("www.google.com");
    expect(builder.optimize().blur(10).build()).toEqual(
      "www.google.com/m/filters:blur(10)"
    );
  });

  it("adds width and height properly", () => {
    const builder = new ImageBuilder("www.google.com");
    expect(builder.optimize().size({ width: 12, height: 80 }).build()).toEqual(
      "www.google.com/m/12x80"
    );
  });

  it("adds only width properly", () => {
    const builder = new ImageBuilder("www.google.com");
    expect(builder.optimize().size({ width: 12 }).build()).toEqual(
      "www.google.com/m/12x0"
    );
  });

  it("adds only height properly", () => {
    const builder = new ImageBuilder("www.google.com");
    expect(builder.optimize().size({ height: 12 }).build()).toEqual(
      "www.google.com/m/0x12"
    );
  });

  it("adds smart crop", () => {
    const builder = new ImageBuilder("www.google.com");
    expect(
      builder.optimize().size({ width: 12, height: 80 }).smartCrop().build()
    ).toEqual("www.google.com/m/12x80/smart");
  });

  //TODO: make work
  it.skip("add filter blur and grayscale ", () => {
    const builder = new ImageBuilder("www.google.com");
    expect(
      builder
        .optimize()
        .size({ width: 12, height: 80 })
        .blur(10)
        .grayscale()
        .build()
    ).toEqual("www.google.com/m/12x80/filters:blur(10):gray()");
  });
});
