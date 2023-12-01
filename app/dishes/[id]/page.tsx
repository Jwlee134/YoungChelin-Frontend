"use client";

import { evaluationItems } from "@/libs/constants";
import { detailApi } from "@/libs/redux/api/detailApi";
import { EvaluationItems } from "@/libs/redux/slices/evaluationSlice";
import { Image, Tooltip } from "@nextui-org/react";
import { useParams } from "next/navigation";

export default function DishPage() {
  const { id } = useParams();
  const { data } = detailApi.useGetDetailQuery(id as string);

  return (
    <div className="max-w-screen-md min-h-[calc(100vh-80px)] mx-auto">
      <Image
        src={data?.url}
        alt="메뉴 사진"
        className="aspect-[4/3] object-cover"
        radius="none"
      />
      <div className="flex justify-between items-center py-4 px-4 md:px-0">
        <div className="flex gap-1">
          {data?.resultDto &&
            Object.keys(data.resultDto).map((evaluatedKey) => {
              const keyWithData =
                evaluationItems[evaluatedKey as EvaluationItems];
              if (evaluatedKey === EvaluationItems.MOOD) {
                return data.resultDto[evaluatedKey]
                  .map((mood) => {
                    const v = keyWithData.data.find(
                      (data) => data.value === parseInt(mood)
                    );
                    return (
                      <Tooltip
                        key={mood}
                        content={v?.description}
                        closeDelay={0}
                      >
                        <Image width={28} src={v?.src} alt={v?.description} />
                      </Tooltip>
                    );
                  })
                  .flat();
              }
              const v = keyWithData.data.find(
                (item) =>
                  item.value + "" === (data.resultDto[evaluatedKey] as string)
              );
              return (
                <Tooltip
                  key={evaluatedKey}
                  content={v?.description}
                  closeDelay={0}
                >
                  <Image width={28} src={v?.src} alt={v?.description} />
                </Tooltip>
              );
            })}
        </div>
      </div>
      {data?.statistics.map((statistic, i) => (
        <div key={i}>
          <Image
            src={statistic.url}
            className="w-full"
            alt="통계"
            radius="none"
          />
        </div>
      ))}
    </div>
  );
}
