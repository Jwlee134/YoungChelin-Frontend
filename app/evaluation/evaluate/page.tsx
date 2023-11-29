"use client";

import EvaluationDish from "@/components/EvaluationDish";
import { evaluationActions } from "@/libs/redux/slices/evaluationSlice";
import { useDispatch, useSelector } from "@/libs/redux/store";
import { useEffect } from "react";
import { shallowEqual } from "react-redux";

/* 
(1,0)
(0.309,0.951)
(−0.809,0.587)
(−0.809,−0.587)
(0.309,−0.951)
*/

export default function Evaluate() {
  const { length, cursor } = useSelector(
    ({ evaluation }) => ({
      length: evaluation.evaluationItems.length * 2,
      cursor: evaluation.evaluationCursor,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(evaluationActions.setEvaluationCursor(0));
    };
  }, [dispatch]);

  return (
    <div className="flex overflow-hidden">
      {Array.from({ length }, (v, i) => i).map(
        (i) => cursor === i && <EvaluationDish key={i} />
      )}
    </div>
  );
}
