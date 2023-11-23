"use client";

import EvaluationDish from "@/components/EvaluationDish";
import useEvaluationStore from "@/hooks/useEvaluationStore";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

/* 
(1,0)
(0.309,0.951)
(−0.809,0.587)
(−0.809,−0.587)
(0.309,−0.951)
*/

export default function Evaluate() {
  const { length, cursor, setCursor } = useEvaluationStore(
    useShallow((state) => ({
      evaluationItems: state.evaluationItems,
      length: state.evaluationItems.length * 2,
      cursor: state.evaluationCursor,
      setCursor: state.setEvaluationCursor,
    }))
  );

  useEffect(() => {
    return () => {
      setCursor(0);
    };
  }, [setCursor]);

  return (
    <div className="flex overflow-hidden">
      {Array.from({ length }, (v, i) => i).map(
        (i) => cursor === i && <EvaluationDish key={i} />
      )}
    </div>
  );
}
