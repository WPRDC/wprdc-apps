import { PropsWithChildren } from "react";

export type CardProps = PropsWithChildren<object>;

export function Card({ children }: CardProps) {
  return (
    <li className="max-w-2xl rounded border-2 border-black bg-white p-3">
      {children}
    </li>
  );
}
