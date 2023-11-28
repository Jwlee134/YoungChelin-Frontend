"use client";

import { evaluationItems } from "@/libs/constants";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString, { ParsedQuery } from "query-string";
import { Key, useEffect, useState } from "react";
import { IoRefresh } from "react-icons/io5";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [parsed, setParsed] = useState<ParsedQuery<string>>(
    queryString.parse(searchParams.toString())
  );

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
    console.log(url); // API 요청
  }, [pathname, searchParams]);

  return (
    <div className="pt-12 px-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {Object.values(evaluationItems).map((item, i) => (
            <Dropdown key={i} backdrop="opaque" closeOnSelect={false}>
              <DropdownTrigger>
                <Button variant="bordered">
                  <span>{item.label}</span>
                  {parsed[Object.keys(evaluationItems)[i]] && (
                    <>
                      <Divider orientation="vertical" className="mx-2" />
                      <div className="flex space-x-2">
                        {item.data
                          .filter((data) =>
                            parsed[Object.keys(evaluationItems)[i]]?.includes(
                              data.value + ""
                            )
                          )
                          .map((data) => (
                            <Image
                              key={data.value}
                              src={data.src}
                              alt={data.description}
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
                {item.data.map((data) => (
                  <DropdownItem
                    key={data.value}
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
                          parsed[Object.keys(evaluationItems)[i]] !==
                            undefined &&
                          parsed[Object.keys(evaluationItems)[i]]?.includes(
                            data.value + ""
                          )
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
          ))}
        </div>
        <div className="flex space-x-2 ml-4">
          {searchParams && (
            <Button
              isIconOnly
              variant="bordered"
              className="text-xl"
              onClick={() => {
                const keyword = searchParams.get("keyword");
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
          >
            필터 적용
          </Button>
        </div>
      </div>
    </div>
  );
}
