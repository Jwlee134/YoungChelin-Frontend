"use client";

import ResultDtoMapper from "@/components/ResultDtoMapper";
import AddTopTenModal from "@/components/modals/AddTopTenModal";
import { userApi } from "@/libs/redux/api/userApi";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import { Fragment, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";

export default function TopTen() {
  const [isEdit, setIsEdit] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { data } = userApi.useGetTopTenQuery();

  function handleClick(i: number) {
    setSelectedIdx(i);
    onOpen();
  }

  return (
    <div className="py-12 px-6 max-w-screen-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">맛식 top 10</h1>
        <Button
          onClick={() => setIsEdit((prev) => !prev)}
          variant="light"
          className="text-gray-400"
        >
          {isEdit ? "완료" : "수정"}
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 10 }, (v, i) => {
          const idx = data?.findIndex((item) => item.rank === i + 1 + "");
          return (
            <Fragment key={i}>
              {idx !== undefined && idx !== -1 ? (
                <Card className="aspect-square">
                  <CardBody className="p-0">
                    <Image
                      src={data?.[idx].url}
                      alt="썸네일"
                      radius="none"
                      className="object-cover aspect-[5/4] w-full h-full"
                      classNames={{ wrapper: "w-full h-full" }}
                    />
                  </CardBody>
                  <CardFooter className="flex justify-between items-center aspect-[5/1] shrink-0">
                    <div className="w-full font-bold text-lg text-ellipsis whitespace-nowrap overflow-hidden">
                      {data?.[idx].menuName}
                    </div>
                    {data && <ResultDtoMapper data={data?.[idx].evaluate} />}
                  </CardFooter>
                  {isEdit && (
                    <Button
                      className="absolute top-4 right-4 z-10 bg-red-400 text-white w-10 h-10 text-xl p-0 border border-red-300"
                      radius="full"
                      isIconOnly
                    >
                      <HiOutlineTrash />
                    </Button>
                  )}
                </Card>
              ) : (
                <div
                  className="border border-dashed border-gray-400 rounded-xl aspect-square flex justify-center items-center cursor-pointer"
                  onClick={() => handleClick(i)}
                >
                  <span className="text-5xl text-gray-300">{i + 1}</span>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
      <AddTopTenModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        selectedIdx={selectedIdx}
        topTen={data}
      />
    </div>
  );
}
