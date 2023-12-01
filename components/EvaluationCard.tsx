import { evaluationItems } from "@/libs/constants";
import { EvaluationItems } from "@/libs/redux/slices/evaluationSlice";
import { Card, CardBody, Image, Tooltip } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { ForwardedRef, forwardRef, memo } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

interface Props {
  item: RestaurantEvaluateDto;
  handlePress?: (id: number) => void;
  selectedId?: number | null;
}

function EvaluationCard(
  { item, handlePress, selectedId }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <Card
      key={item.menuId}
      shadow="sm"
      isPressable
      onPress={handlePress ? () => handlePress(item.menuId) : undefined}
      className="w-full"
      ref={ref}
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
            <div className="flex items-center gap-1 flex-wrap">
              {Object.keys(item.evaluate).map((evaluatedKey) => {
                const keyWithData =
                  evaluationItems[evaluatedKey as EvaluationItems];
                if (evaluatedKey === EvaluationItems.MOOD) {
                  return item.evaluate[evaluatedKey]
                    .map((mood) => {
                      const v = keyWithData.data.find(
                        (data) => data.value === parseInt(mood)
                      );
                      return (
                        <Tooltip
                          key={mood}
                          content={v?.description}
                          closeDelay={0}
                        >
                          <Image width={28} src={v?.src} alt={v?.description} />
                        </Tooltip>
                      );
                    })
                    .flat();
                }
                const v = keyWithData.data.find(
                  (data) =>
                    data.value + "" === (item.evaluate[evaluatedKey] as string)
                );
                return (
                  <Tooltip
                    key={evaluatedKey}
                    content={v?.description}
                    closeDelay={0}
                  >
                    <Image width={28} src={v?.src} alt={v?.description} />
                  </Tooltip>
                );
              })}
            </div>
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

const forwarded = forwardRef(EvaluationCard);

export default memo(forwarded);
