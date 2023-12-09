"use client";

import EvaluationCard from "@/components/EvaluationCard";
import useInView from "@/hooks/useInView";
import useLoginRequired from "@/hooks/useLoginRequired";
import { userApi } from "@/libs/redux/api/userApi";
import { useState } from "react";

export default function EvaluationHistoryPage() {
  useLoginRequired();
  const [id, setId] = useState(0);
  const { data, error } = userApi.useGetEvaluationHistoryQuery({ id });
  const { ref } = useInView({
    callback(inInView) {
      if (inInView && data && !data[data.length - 1].last)
        setId(parseInt(data[data.length - 1].id));
    },
  });

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
        {error &&
          "data" in error &&
          (error.data as string).includes("value") && (
            <div className="text-black/50">평가 내역이 존재하지 않습니다.</div>
          )}
      </div>
    </div>
  );
}
