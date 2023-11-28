import useEvaluationStore, {
  EvaluationItems,
} from "@/hooks/useEvaluationStore";
import { evaluationItems } from "@/libs/constants";
import { cls } from "@/libs/utils";
import { Image, Tooltip } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";

interface Props {
  item: {
    value: number;
    description: string;
    src: string;
    pos: { y: number; x: number };
  };
  type: EvaluationItems;
  onClick: () => void;
}

export default function EvaluationItem({ item, type, onClick }: Props) {
  const { items, cursor } = useEvaluationStore(
    useShallow((state) => ({
      items: state.evaluationItems,
      cursor: state.evaluationCursor,
    }))
  );

  const condition = Array.isArray(items[Math.floor(cursor / 2)][type])
    ? (items[Math.floor(cursor / 2)][type] as number[]).includes(item.value)
    : items[Math.floor(cursor / 2)][type] === item.value;

  return (
    <Tooltip showArrow closeDelay={0} content={item.description}>
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
          src={evaluationItems[type].data[item.value].src}
          alt={evaluationItems[type].data[item.value].description}
          width={type === EvaluationItems.FLAVOR ? 40 : 32}
          height={type === EvaluationItems.FLAVOR ? 40 : 32}
        />
      </motion.div>
    </Tooltip>
  );
}
