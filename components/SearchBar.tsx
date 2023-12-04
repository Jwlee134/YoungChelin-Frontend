"use client";

import { cls } from "@/libs/utils";
import { Input } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { IoSearchOutline } from "react-icons/io5";
import queryString from "query-string";

interface SearchForm {
  keyword: string;
}

export default function SearchBar() {
  const params = useSearchParams();
  const initialKeyword = params.get("keyword");
  const { register, handleSubmit } = useForm<SearchForm>({
    defaultValues: { keyword: initialKeyword || "" },
  });
  const pathname = usePathname();
  const router = useRouter();

  function onValid({ keyword }: SearchForm) {
    const obj = queryString.parse(params.toString());
    obj["keyword"] = keyword;
    router.replace(`/search?${queryString.stringify(obj)}`);
  }

  return (
    <form
      className={cls(
        "w-full max-w-lg z-50",
        pathname === "/" ? "sticky top-3 mx-auto" : ""
      )}
      onSubmit={handleSubmit(onValid)}
    >
      <Input
        {...register("keyword", { required: true })}
        variant="bordered"
        startContent={
          <span className="text-gray-400 text-lg">
            <IoSearchOutline />
          </span>
        }
      />
    </form>
  );
}
