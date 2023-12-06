"use client";

import EvaluationCard from "@/components/EvaluationCard";
import useLoginRequired from "@/hooks/useLoginRequired";
import { userApi } from "@/libs/redux/api/userApi";
import { useEffect, useRef, useState } from "react";

export default function EvaluationHistoryPage() {
  useLoginRequired();

  const [id, setId] = useState(0);
  const { data } = userApi.useGetEvaluationHistoryQuery({ id });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || !ref.current) return;
    let observerRefValue: HTMLDivElement | null = null;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !data[data.length - 1].last)
        setId(parseInt(data[data.length - 1].id));
    });
    observer.observe(ref.current);
    observerRefValue = ref.current;

    return () => {
      if (observerRefValue) observer.unobserve(observerRefValue);
    };
  }, [data]);

  return (
    <div className="py-12 px-6">
      <h1 className="text-xl font-bold mb-4">평가 내역</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {data?.map((item, i) => (
          <EvaluationCard
            key={item.id}
            item={item}
            ref={i === data.length - 1 ? ref : undefined}
            hasLink
          />
        ))}
      </div>
    </div>
  );
}
