"use client";

import { cls } from "@/libs/utils";
import { Input } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { IoSearchOutline } from "react-icons/io5";

interface SearchForm {
  keyword: string;
}

export default function SearchBar() {
  const { register, handleSubmit } = useForm<SearchForm>();
  const pathname = usePathname();

  function onValid(data: SearchForm) {
    console.log(data);
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
          <span className="text-gray-400 text-xl">
            <IoSearchOutline />
          </span>
        }
      />
    </form>
  );
}
