import { Card, CardBody, Image } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import ResultDtoMapper from "./ResultDtoMapper";

interface Props {
  item: RestaurantEvaluateDto;
  handlePress?: (id: number) => void;
  selectedId?: number | null;
}

function EvaluationCard({ item, handlePress, selectedId }: Props) {
  return (
    <Card
      key={item.menuId}
      shadow="sm"
      isPressable
      onPress={handlePress ? () => handlePress(item.menuId) : undefined}
      className="w-full"
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
          {selectedId === item.menuId && (
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

export default memo(EvaluationCard);
