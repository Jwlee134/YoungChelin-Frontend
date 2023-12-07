"use client";

import ResultDtoMapper from "@/components/ResultDtoMapper";
import { detailApi } from "@/libs/redux/api/detailApi";
import { Image } from "@nextui-org/react";
import { useParams } from "next/navigation";

const table = {};

export default function DishPage() {
  const { id } = useParams();
  const { data } = detailApi.useGetDetailQuery(id as string);

  return (
    <div className="max-w-screen-md min-h-[calc(100vh-80px)] mx-auto pb-12">
      <Image
        src={data?.url}
        alt="메뉴 사진"
        width="100%"
        className="aspect-[4/3] object-cover"
        radius="none"
      />
      {data?.resultDto && (
        <>
          <h2 className="mt-4 text-xl font-bold">받은 뱃지들</h2>
          <div className="flex justify-between items-center py-4 px-4 md:px-0">
            <ResultDtoMapper fullWidth data={data.resultDto} size="lg" />
          </div>
        </>
      )}
      <div className="mt-4">
        {data?.statistic.map((statistic, i) => (
          <div key={i}>
            <h1 className="text-xl font-bold ">
              {i === 0
                ? `이 맛식은 평균 ${statistic.avg}점의 맛 평가를 받았습니다.`
                : i === 1
                ? `이 맛식은 지금까지 평가된 맛식들 중 상위 ${statistic.avg}퍼센트의 맛을 가졌습니다.`
                : ""}
            </h1>
            <Image src={statistic.url} alt="통계" width="100%" radius="none" />
          </div>
        ))}
      </div>
    </div>
  );
}
