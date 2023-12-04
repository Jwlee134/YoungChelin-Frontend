"use client";

import HomeCard from "@/components/HomeCard";
import { evaluationItems } from "@/libs/constants";
import { homeApi } from "@/libs/redux/api/homeApi";
import {
  Button,
  Checkbox,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from "@nextui-org/react";
import { useInView } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString, { ParsedQuery } from "query-string";
import { Key, useEffect, useRef, useState } from "react";
import { IoRefresh } from "react-icons/io5";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const initialData = queryString.parse(searchParams.toString());
  const [parsed, setParsed] = useState<ParsedQuery<string>>(initialData);
  const [id, setId] = useState(0);
  const [getByKeyword, { data: keywordData }] =
    homeApi.useLazyGetByKeywordQuery();
  const [getByFilter, { data: filterData, isLoading: isFiltering }] =
    homeApi.useLazyGetByFilterQuery();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const data = Object.keys(initialData).length > 1 ? filterData : keywordData;

  useEffect(() => {
    if (!inView || !data) return;
    if (data.length && inView) setId(parseInt(data[data.length - 1].id));
  }, [inView, data]);

  function handleMenuClick(key: Key, i: number) {
    const label = Object.keys(evaluationItems)[i];
    setParsed((prev) => {
      const copy = JSON.parse(JSON.stringify(prev)) as ParsedQuery<string>; // 깊은 복사
      if (!copy[label]) {
        // 존재하지 않는 키라면 새로 생성
        copy[label] = [key + ""];
      } else {
        if (!copy[label]?.includes(key.toString())) {
          // 키는 존재하는데 배열에 값이 없으면 새로 추가
          copy[label] = [...(copy[label] as string[]), key.toString()];
        } else {
          // 배열에 값이 존재하면 제거
          copy[label] = (copy[label] as string[]).filter(
            (item) => item !== key.toString()
          );
          // 배열이 비었다면 키 제거
          if (!copy[label]?.length) delete copy[label];
        }
      }
      return copy;
    });
  }

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    const params = url.split("?")[1];
    if (Object.keys(queryString.parse(params)).length === 1) {
      // 키워드만 존재
      getByKeyword({ id, qs: params });
    } else {
      // 필터 적용됨
      getByFilter({ id, qs: params });
    }
  }, [pathname, searchParams, id, getByKeyword, getByFilter]);

  return (
    <div className="pt-12 px-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {Object.values(evaluationItems).map((item, i) => {
            const ValueOfExistingKey = parsed[Object.keys(evaluationItems)[i]];
            return (
              <Dropdown key={i} backdrop="opaque" closeOnSelect={false}>
                <DropdownTrigger>
                  <Button variant="bordered">
                    <span>{item.label}</span>
                    {ValueOfExistingKey && (
                      <>
                        <Divider orientation="vertical" className="mx-2" />
                        <div className="flex space-x-2">
                          {Object.values(item.data)
                            .filter((item) =>
                              ValueOfExistingKey.includes(item.id)
                            )
                            .map((item) => (
                              <Image
                                key={item.id}
                                src={item.src}
                                alt={item.description}
                                classNames={{
                                  wrapper:
                                    "w-6 h-6 flex justify-center items-center",
                                }}
                              />
                            ))}
                        </div>
                      </>
                    )}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="필터 항목"
                  onAction={(key) => handleMenuClick(key, i)}
                >
                  {Object.values(item.data).map((data) => (
                    <DropdownItem
                      key={data.id}
                      startContent={
                        <Image
                          src={data.src}
                          alt={data.description}
                          classNames={{
                            wrapper: "w-9 h-9 flex justify-center items-center",
                          }}
                        />
                      }
                      endContent={
                        <Checkbox
                          isSelected={
                            ValueOfExistingKey !== undefined &&
                            ValueOfExistingKey?.includes(data.id)
                          }
                        />
                      }
                      variant="light"
                      textValue="필터 항목 설명"
                    >
                      <p className="pr-6">{data.description}</p>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            );
          })}
        </div>
        <div className="flex space-x-2 ml-4">
          {searchParams && (
            <Button
              isIconOnly
              variant="bordered"
              className="text-xl"
              onClick={() => {
                router.replace(`/search?keyword=${keyword}`);
                setParsed({ keyword });
              }}
            >
              <IoRefresh />
            </Button>
          )}
          <Button
            color="primary"
            onClick={() => {
              router.replace(`/search?${queryString.stringify(parsed)}`);
            }}
            isLoading={isFiltering}
          >
            필터 적용
          </Button>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 py-12">
        {data?.map((item) => (
          <HomeCard item={item} key={item.menuId} />
        ))}
        <div ref={ref} />
      </div>
    </div>
  );
}
