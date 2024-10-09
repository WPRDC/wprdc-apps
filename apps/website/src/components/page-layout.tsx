import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export interface PageLayoutProps extends PropsWithChildren {}

export function PageLayout({ children }: PageLayoutProps) {
  return <div className="w-full">{children}</div>;
}

export function Container({
  children,
  solo = false,
}: PropsWithChildren<{
  solo?: boolean;
}>) {
  return (
    <div
      className={twMerge(
        "px-8 lg:flex space-x-6 mx-auto lg:max-w-screen-lg xl:max-w-screen-xl",
        solo && "lg:block lg:max-w-screen-lg xl:max-w-screen-lg",
      )}
    >
      {children}
    </div>
  );
}

export function MainPanel({
  children,
  solo = false,
}: PropsWithChildren<{
  solo?: boolean;
}>) {
  return (
    <div
      className={twMerge(
        "py-8 lg:w-2/3 xl:w-3/4",
        solo && "lg:w-full xl:w-full",
      )}
    >
      {children}
    </div>
  );
}

export function SidePanel({ children }: PropsWithChildren<{}>) {
  return (
    <div className="pt-8 hidden lg:block lg:w-1/3 xl:w-1/4"> {children}</div>
  );
}

export function HeroPanel({ children }: PropsWithChildren<{}>) {
  return (
    <div className="w-full text-stone-200 bg-stone-500 py-2 xl:py-4 bg-diagmonds">
      {children}
    </div>
  );
}
