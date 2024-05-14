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
      <div className="bg-primary mr-2 flex size-8 items-center justify-center rounded-full border-4 border-black ">
        <div className="pl-0.5 font-mono text-2xl font-bold leading-none">
          {step}
        </div>
      </div>
      <div className="text-3xl font-bold">{children}</div>
    </div>
  );
}
