import { PropsWithChildren } from "react";

export type CardListProps = PropsWithChildren<object>;

export function CardList({ children }: CardListProps) {
  return <ul className="flex flex-col space-y-6">{children}</ul>;
}
