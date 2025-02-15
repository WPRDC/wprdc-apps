import { A } from "@wprdc/ui";

interface BigButtonProps {
  href: string;
  title: string;
  subtitle: string;
  small?: boolean;
}

export function BigButton({
  href,
  title,
  subtitle,
  small = false,
}: BigButtonProps) {
  return (
    <A variant="button" href={href} className="w-72 p-4 text-center">
      <div className="text-2xl font-bold">{title}</div>
      <div className="mt-2 leading-4">{subtitle}</div>
    </A>
  );
}
