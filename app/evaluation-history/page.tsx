"use client";

import EvaluationCard from "@/components/EvaluationCard";
import { userApi } from "@/libs/redux/api/userApi";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function EvaluationHistoryPage() {
  const [id, setId] = useState(0);
  const { data } = userApi.useGetEvaluationHistoryQuery({ id });
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (!inView || !data) return;
    if (data.length && inView) {
      setId(parseInt(data[data.length - 1].id));
    }
  }, [inView, data]);

  return (
    <div className="pt-12 px-6">
      <h1 className="text-xl font-bold mb-4">평가 내역</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {data?.map((item, i) => (
          <EvaluationCard key={item.menuId} item={item} />
        ))}
        <div ref={ref} />
      </div>
    </div>
  );
}
