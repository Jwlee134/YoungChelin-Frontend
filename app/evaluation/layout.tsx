import EvaluationFooter from "@/components/EvaluationFooter";

export default function EvaluteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-20 justify-between min-h-[calc(100vh-81px)]">
      <div className="max-w-screen-lg mx-auto pt-12 px-6">{children}</div>
      <EvaluationFooter />
    </div>
  );
}
