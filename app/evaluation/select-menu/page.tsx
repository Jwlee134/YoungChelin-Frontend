"use client";

import {
  Card,
  CardBody,
  CardFooter,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "@/libs/redux/store";
import { shallowEqual } from "react-redux";
import { evaluationActions } from "@/libs/redux/slices/evaluationSlice";
import AddMenuModal from "@/components/modals/AddMenuModal";
import { evaluateApi } from "@/libs/redux/api/evaluateApi";

export default function SelectMenu() {
  const { restaurant, ids } = useSelector(
    ({ evaluation }) => ({
      restaurant: evaluation.restaurant,
      ids: evaluation.evaluationItems.map((item) => item.id),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { data } = evaluateApi.useGetDishesQuery(restaurant?.id + "", {
    skip: !restaurant?.id,
  });

  return (
    <>
      <h1 className="text-xl font-bold mb-4">
        {restaurant?.name}에서 무엇을 드셨나요?
      </h1>
      <p className="mb-4 text-sm text-gray-500">
        목록에 메뉴가 없나요?{" "}
        <span className="underline cursor-pointer" onClick={onOpen}>
          메뉴 추가하기
        </span>
      </p>
      <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {data?.map((item) => (
          <Card
            key={item.menuId}
            isPressable
            onPress={() =>
              dispatch(
                evaluationActions.manageDishes({
                  id: item.menuId,
                  name: item.menuName,
                })
              )
            }
            className="relative"
          >
            <CardBody className="p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.menuName}
                className="w-full object-cover aspect-[4/3]"
                src={item.url}
              />
            </CardBody>
            <CardFooter className="text-small">
              <b>{item.menuName}</b>
            </CardFooter>
            <AnimatePresence>
              {ids.includes(item.menuId) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/30 z-10 text-white grid place-items-center text-5xl"
                >
                  <IoCheckmarkCircleOutline />
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>
      <AddMenuModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
