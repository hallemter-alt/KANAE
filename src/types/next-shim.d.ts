declare module "next" {
  export type Metadata = Record<string, unknown>;
}

declare module "next/types.js" {
  export type ResolvingMetadata = Record<string, unknown>;
  export type ResolvingViewport = Record<string, unknown>;
}

declare module "next/link" {
  import type { ComponentType, ReactNode } from "react";

  export type LinkProps = {
    href: string;
    children?: ReactNode;
    className?: string;
    title?: string;
    onClick?: () => void;
  };

  const Link: ComponentType<LinkProps>;
  export default Link;
}

declare module "next/navigation" {
  export function redirect(path: string): never;
  export function notFound(): never;
  export function usePathname(): string;
}

declare module "next/font/google" {
  type FontOptions = {
    variable?: string;
    subsets?: string[];
    weight?: string[];
  };

  type FontResult = {
    className: string;
    variable: string;
  };

  export function Noto_Serif_JP(options: FontOptions): FontResult;
  export function Noto_Sans_JP(options: FontOptions): FontResult;
}

declare module "next/image" {
  import type { ComponentType } from "react";

  type ImageProps = {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
  };

  const Image: ComponentType<ImageProps>;
  export default Image;
}

declare module "next/server" {
  export class NextResponse {
    static next(): NextResponse;
    static redirect(url: URL | string): NextResponse;
  }
}
