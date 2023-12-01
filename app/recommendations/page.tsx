"use client";

import Carousel from "@/components/Carousel";
import { userApi } from "@/libs/redux/api/userApi";
import { Spinner } from "@nextui-org/react";

const table: { [key: string]: string } = {
  recommend: "개인 추천 맛식",
  hotMenu: "인기 급상승 맛식",
  steadyMenu: "꾸준히 인기있는 맛식",
};

export default function RecommendationsPage() {
  const { data, isLoading } = userApi.useGetRecommendsQuery();

  return (
    <div className="px-6 py-12">
      {isLoading ? (
        <div className="w-full h-[calc(100vh-176px)] grid place-items-center">
          <Spinner />
        </div>
      ) : data ? (
        Object.keys(data).map((title, i) => (
          <Carousel key={i} title={table[title]} data={data[title]} />
        ))
      ) : null}
    </div>
  );
}
