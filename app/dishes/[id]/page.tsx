"use client";

import ResultDtoMapper from "@/components/ResultDtoMapper";
import { detailApi } from "@/libs/redux/api/detailApi";
import { Image } from "@nextui-org/react";
import { useParams } from "next/navigation";

export default function DishPage() {
  const { id } = useParams();
  const { data } = detailApi.useGetDetailQuery(id as string);

  return (
    <div className="max-w-screen-md min-h-[calc(100vh-80px)] mx-auto">
      <Image
        src={data?.url}
        alt="메뉴 사진"
        width="100%"
        className="aspect-[4/3] object-cover"
        radius="none"
      />
      <div className="flex justify-between items-center py-4 px-4 md:px-0">
        {data?.resultDto && <ResultDtoMapper fullWidth data={data.resultDto} />}
      </div>
      {data?.statistic.map((statistic, i) => (
        <div key={i}>
          <Image src={statistic.url} alt="통계" width="100%" radius="none" />
        </div>
      ))}
    </div>
  );
}
