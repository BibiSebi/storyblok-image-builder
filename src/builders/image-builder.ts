import type { IImageBuilder } from "@/interfaces/image-builder.interface";

export type Size = { width?: number; height?: number };

export class ImageBuilder implements IImageBuilder {
  private baseUrl: string;

  private filters: any = {};

  private settings: any = {
    optimize: { isActive: false, value: "/m/" },
    fitIn: { isActive: false, value: "fit-in/" },
    size: { isActive: false, value: "/smart" },
    smart: { isActive: false },
  };

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public optimize = (): ImageBuilder => {
    this.addOptions("optimize", "/m/");
    return this;
  };

  //choosing an object instead of two parameters, as it prevents complexity and order confusions
  public size = (size: Size): ImageBuilder => {
    this.addOptions("size", this.getSizeString(size));
    return this;
  };

  public smartCrop = (): ImageBuilder => {
    this.addOptions("smart", "/smart");
    return this;
  };

  public blur = (radius: number): ImageBuilder => {
    this.addOptions("optimize", "/m");
    this.filters = { ...this.filters, blur: radius };
    return this;
  };

  public grayscale = (): ImageBuilder => {
    this.addOptions("optimize", "/m/");
    this.filters = { ...this.filters, grayscale: true };
    return this;
  };

  public fit = (size?: Size): ImageBuilder => {
    //if no size then use the existing
    return this;
  };

  public build = (): string => {
    for (const setting in this.settings) {
      if (this.settings[setting].isActive) {
        this.baseUrl = this.baseUrl.concat(this.settings[setting].value);
      }
    }

    const filters: string = this.getFiltersString(this.filters);

    return this.baseUrl + filters;
  };

  private addOptions = (prop: string, value?: string) => {
    this.settings = { ...this.settings, [prop]: { isActive: true, value } };
  };

  private getFiltersString = (filters: any): string => {
    const filterKeys = Object.keys(filters);
    const filterStr = "/filters";

    if (filterKeys.length === 0) {
      return "";
    }

    return filterKeys.reduce((acc: any, filter: any) => {
      return `${acc}:${filter}(${filters[filter]})`;
    }, filterStr);
  };

  private getSizeString = (size: Size) => {
    const { width = 0, height = 0 } = size;
    return `${width}x${height}`;
  };

  //wrap with slash
  //validation
}
