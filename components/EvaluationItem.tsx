import { evaluationItems } from "@/libs/constants";
import { EvaluationItems } from "@/libs/redux/slices/evaluationSlice";
import { useSelector } from "@/libs/redux/store";
import { cls } from "@/libs/utils";
import { Image, Tooltip } from "@nextui-org/react";
import { motion } from "framer-motion";
import { shallowEqual } from "react-redux";

interface Props {
  item: {
    id: string;
    description: string;
    src: string;
    pos: {
      y: number;
      x: number;
    };
  };
  type: EvaluationItems;
  onClick: () => void;
}

export default function EvaluationItem({ item, type, onClick }: Props) {
  const { items, cursor } = useSelector(
    ({ evaluation }) => ({
      items: evaluation.evaluationItems,
      cursor: evaluation.evaluationCursor,
    }),
    shallowEqual
  );

  const condition = Array.isArray(items[Math.floor(cursor / 2)][type])
    ? (items[Math.floor(cursor / 2)][type] as string[]).includes(item.id)
    : items[Math.floor(cursor / 2)][type] === item.id;

  return (
    <Tooltip
      showArrow
      closeDelay={0}
      content={evaluationItems[type].data[item.id].description}
    >
      <motion.div
        initial={{
          translateX: item.pos.x / 1.2,
          translateY: item.pos.y / 1.2,
          opacity: 0,
        }}
        animate={{ translateX: item.pos.x, translateY: item.pos.y, opacity: 1 }}
        exit={{
          translateX: item.pos.x / 1.2,
          translateY: item.pos.y / 1.2,
          opacity: 0,
        }}
        className={cls(
          "absolute text-sm rounded-full flex justify-center items-center border-2 cursor-pointer transition-background",
          condition ? "bg-black/30" : "bg-white",
          type === EvaluationItems.FLAVOR ? "w-14 h-14" : "w-12 h-12"
        )}
        onClick={onClick}
      >
        <Image
          src={evaluationItems[type].data[item.id].src}
          alt={evaluationItems[type].data[item.id].description}
          width={type === EvaluationItems.FLAVOR ? 40 : 32}
          height={type === EvaluationItems.FLAVOR ? 40 : 32}
        />
      </motion.div>
    </Tooltip>
  );
}
