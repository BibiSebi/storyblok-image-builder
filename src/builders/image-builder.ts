import type { IImageBuilder } from "@/interfaces/image-builder.interface";

export type Size = { width?: number; height?: number };

export class ImageBuilder implements IImageBuilder {
  private baseUrl: string;
  private filters: any = {};

  constructor(url: string) {
    this.baseUrl = url;
  }

  optimize = (): ImageBuilder => {
    this.baseUrl.concat("/m");
    return this;
  };

  size = (size: Size): ImageBuilder => {
    const { width = 0, height = 0 } = size;
    this.baseUrl.concat(this.getSizeString(size));
    return this;
  };

  smartCrop = (): ImageBuilder => {
    this.baseUrl.concat("/smart");
    return this;
  };

  blur = (radius: number): ImageBuilder => {
    this.filters = { ...this.filters, blur: radius };
    return this;
  };

  fit = (size: Size): ImageBuilder => {
    this.baseUrl.concat(`/fit-in/${this.getSizeString(size)}/`);
    return this;
  };

  build = (): string => {
    return this.baseUrl;
  };

  getSizeString = (size: Size) => {
    const { width = 0, height = 0 } = size;
    return `${width}x${height}`;
  };

  //wrap with slash
  //validation
}
