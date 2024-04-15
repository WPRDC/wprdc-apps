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
      <div className="bg-primary mr-1 flex size-5 items-center justify-center rounded-full border-2 border-black">
        <div className="text font-bold">{step}</div>
      </div>
      <div className="text-sm font-bold uppercase text-gray-700">
        {children}
      </div>
    </div>
  );
}
