import EvaluationFooter from "@/components/EvaluationFooter";

export default function EvalutionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-80px)]">
      <div className="pt-12 px-6">{children}</div>
      <EvaluationFooter />
    </div>
  );
}
