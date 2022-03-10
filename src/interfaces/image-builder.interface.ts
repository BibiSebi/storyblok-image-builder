import type { ImageBuilder, Size } from "@/builders/image-builder";

export interface IImageBuilder {
  optimize: () => ImageBuilder;
  size: (size: Size) => ImageBuilder;
  smartCrop: () => ImageBuilder;
  fit: (size: Size) => ImageBuilder;
  build: () => string;
  blur: (radius: number) => ImageBuilder;
}
