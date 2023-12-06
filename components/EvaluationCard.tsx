import { Card, CardBody, Image } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { ForwardedRef, forwardRef, memo } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import ResultDtoMapper from "./ResultDtoMapper";
import Link from "next/link";

interface Props {
  item: RestaurantEvaluateDto;
  handlePress?: (id: string) => void;
  selectedId?: string;
  hasLink?: boolean;
}

function EvaluationCard(
  { item, handlePress, selectedId, hasLink = false }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <Card
      shadow="sm"
      isPressable
      onPress={handlePress ? () => handlePress(item.id) : undefined}
      className="w-full"
      ref={ref}
      as={hasLink ? Link : undefined}
      href={hasLink ? `/dishes/${item.menuId}` : undefined}
    >
      <CardBody>
        <div className="flex gap-3">
          <Image
            src={item.url}
            alt="썸네일"
            width={140}
            className="aspect-square object-cover"
          />
          <div className="grow flex flex-col justify-between">
            <div className="font-bold mb-1">{item.menuName}</div>
            <ResultDtoMapper data={item.evaluate} fullWidth />
          </div>
        </div>
      </CardBody>
      {selectedId !== undefined && (
        <AnimatePresence>
          {selectedId === item.id && (
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
      )}
    </Card>
  );
}

const forwarded = forwardRef(EvaluationCard);

export default memo(forwarded);
