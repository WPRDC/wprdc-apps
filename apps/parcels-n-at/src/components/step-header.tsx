import type { ReactNode } from "react";

export interface StepHeaderProps {
  step: number;
  children: ReactNode;
}

export function StepHeader({
  step,
  children,
}: StepHeaderProps): React.ReactElement {
  return (
    <div className="my-1 flex items-center">
      <div className="bg-primary mr-2 flex size-8 items-center justify-center rounded-full border-4 border-black">
        <div className="pl-px font-mono text-2xl leading-none font-bold">
          {step}
        </div>
      </div>
      <div className="text-3xl font-bold">{children}</div>
    </div>
  );
}
