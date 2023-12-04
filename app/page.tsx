"use client";

import HomeCard from "@/components/HomeCard";
import HomeLogo from "@/components/HomeLogo";
import SearchBar from "@/components/SearchBar";
import { homeApi } from "@/libs/redux/api/homeApi";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [id, setId] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { data } = homeApi.useGetHomeQuery({ id });

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
    <div className="min-h-screen flex flex-col items-center">
      <div className="flex justify-center mb-10 mt-[25vh]">
        <HomeLogo />
      </div>
      <SearchBar />
      <div className="pt-[calc(70vh-280px)] px-6 pb-12 w-full">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full">
          {data?.map((item, i) => (
            <HomeCard
              item={item}
              key={item.id}
              ref={i === data.length - 1 ? ref : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
