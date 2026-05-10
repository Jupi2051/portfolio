declare module "croppie" {
  type CroppieResultOptions = {
    type?: "blob" | "base64" | "canvas" | "rawcanvas" | string;
    format?: "jpeg" | "webp" | "png";
    quality?: number;
    size?: "viewport" | { width?: number; height?: number };
    circle?: boolean;
    backgroundColor?: string;
  };

  type CroppieOptions = {
    viewport?: { width: number; height: number; type?: string };
    boundary?: { width: number; height: number };
    showZoomer?: boolean;
    enableResize?: boolean;
    enableOrientation?: boolean;
    mouseWheelZoom?: boolean | string;
    enableZoom?: boolean;
    enforceBoundary?: boolean;
    maxZoom?: number;
    minZoom?: number;
    customClass?: string;
    url?: string;
  };

  export default class Croppie {
    readonly elements: {
      boundary: HTMLElement;
      viewport: HTMLElement;
      preview: HTMLElement;
      img: HTMLImageElement;
      zoomer: HTMLInputElement;
    };

    constructor(element: HTMLElement, options?: CroppieOptions);
    bind(options: { url: string }): Promise<void>;
    /** Crop rectangle in source image coordinates [x1, y1, x2, y2]. */
    get(): { points: number[]; zoom: number; orientation: number };
    result(options: CroppieResultOptions | string): Promise<Blob | string>;
    setZoom(value: number): void;
    destroy(): void;
  }
}
