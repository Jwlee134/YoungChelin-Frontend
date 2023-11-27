"use client";

import useEvaluationStore from "@/hooks/useEvaluationStore";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useShallow } from "zustand/react/shallow";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";

const list = [
  {
    menuId: 143425,
    menuName: "카이센동",
    url: "https://nextui.org/images/fruit-1.jpeg",
  },
  {
    menuId: 234235,
    menuName: "스시",
    url: "https://nextui.org/images/fruit-1.jpeg",
  },
  {
    menuId: 37543,
    menuName: "asdf",
    url: "https://nextui.org/images/fruit-1.jpeg",
  },
  {
    menuId: 47457,
    menuName: "asdf",
    url: "https://nextui.org/images/fruit-1.jpeg",
  },
  {
    menuId: 52343,
    menuName: "asdf",
    url: "https://nextui.org/images/fruit-1.jpeg",
  },
];

export default function SelectMenu() {
  const { name, manageDishes, ids } = useEvaluationStore(
    useShallow((state) => ({
      name: state.restaurant.name,
      manageDishes: state.manageDishes,
      ids: state.evaluationItems.map((item) => item.id),
    }))
  );

  return (
    <>
      <h1 className="text-xl font-bold mb-4">{name}에서 무엇을 드셨나요?</h1>
      <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {list.map((item) => (
          <Card
            key={item.menuId}
            isPressable
            onPress={() => manageDishes(item.menuId, item.menuName)}
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
    </>
  );
}