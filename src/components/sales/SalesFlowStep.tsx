import { Check } from "lucide-react";

export type SalesStep = {
  id: number;
  title: string;
  description: string;
};

export type SalesFlowStepProps = {
  currentStep: number;
  steps: SalesStep[];
};

export function SalesFlowStep({ currentStep, steps }: SalesFlowStepProps) {
  return (
    <section className="rounded border border-charcoal-black/10 bg-brick-white p-4 shadow-subtle-line">
      <h3 className="mb-4 font-serif-jp text-lg text-charcoal-black">売買フロー</h3>
      <ol className="grid gap-3 md:grid-cols-4">
        {steps.map((step) => {
          const completed = step.id < currentStep;
          const active = step.id === currentStep;
          return (
            <li key={step.id} className="rounded border border-charcoal-black/10 bg-washi-white p-3">
              <div className={`mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${completed ? "bg-celadon-blue text-washi-white" : active ? "bg-light-copper text-washi-white" : "bg-concrete-grey text-rust-iron"}`}>
                {completed ? <Check size={14} /> : step.id}
              </div>
              <p className="text-sm font-semibold text-charcoal-black">{step.title}</p>
              <p className="text-xs text-rust-iron">{step.description}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default SalesFlowStep;
