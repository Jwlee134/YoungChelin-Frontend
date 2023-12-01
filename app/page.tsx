"use client";

import HomeCard from "@/components/HomeCard";
import HomeLogo from "@/components/HomeLogo";
import SearchBar from "@/components/SearchBar";
import { homeApi } from "@/libs/redux/api/homeApi";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [id, setId] = useState(0);
  const { data } = homeApi.useGetHomeQuery({ id });
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (!inView || !data) return;
    if (data.length && inView) {
      setId(parseInt(data[data.length - 1].id));
    }
  }, [inView, data]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="flex justify-center mb-10 mt-[25vh]">
        <HomeLogo />
      </div>
      <SearchBar />
      <div className="pt-[calc(70vh-280px)] px-6 pb-12">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {data?.map((item) => (
            <HomeCard item={item} ref={ref} key={item.menuId} />
          ))}
        </div>
      </div>
    </div>
  );
}
