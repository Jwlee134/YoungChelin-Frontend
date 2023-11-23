import useEvaluationStore, {
  EvaluationItems,
} from "@/hooks/useEvaluationStore";
import { AnimatePresence } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import EvaluationItem from "./EvaluationItem";
import { evaluationItems } from "@/libs/constants";
import { cls, handleConsonant } from "@/libs/utils";
import UploadDishPhoto from "./UploadDishPhoto";

export default function EvaluationDish() {
  const { cursor, items, evaluate, manageEvaluationMode } = useEvaluationStore(
    useShallow((state) => ({
      cursor: state.evaluationCursor,
      items: state.evaluationItems,
      evaluate: state.evaluateDish,
      manageEvaluationMode: state.manageEvaluationMode,
    }))
  );
  const evaluationIdx = Math.floor(cursor / 2);
  const isEvaluate = cursor % 2 === 0;

  function handleItemClick(v: EvaluationItems) {
    if (items[evaluationIdx].mode === v)
      manageEvaluationMode(items[evaluationIdx].id, null);
    else manageEvaluationMode(items[evaluationIdx].id, v);
  }

  return (
    <div className="w-full h-[calc(100vh-208px)] flex flex-col">
      <h1 className="text-xl font-bold">
        {isEvaluate
          ? `${handleConsonant(items[evaluationIdx].name)} 평가해주세요.`
          : `${items[evaluationIdx].name}의 사진을 올려주세요.`}
      </h1>
      {isEvaluate ? (
        <div className="grow flex items-center justify-center mt-4">
          <div
            onClick={() => handleItemClick(EvaluationItems.FLAVOR)}
            className="relative w-20 h-20 p-2 rounded-full border-2 bg-white grid place-items-center font-bold text-lg cursor-pointer"
          >
            {evaluationItems[EvaluationItems.FLAVOR].label}
            <AnimatePresence>
              {items[evaluationIdx].mode === EvaluationItems.FLAVOR &&
                evaluationItems[EvaluationItems.FLAVOR].data.map((item) => (
                  <EvaluationItem
                    key={item.value}
                    item={item}
                    type={EvaluationItems.FLAVOR}
                    onClick={() =>
                      evaluate(
                        items[evaluationIdx].id,
                        item.value,
                        EvaluationItems.FLAVOR
                      )
                    }
                  />
                ))}
            </AnimatePresence>
          </div>
          <div className="absolute -translate-y-[150px]">
            <div className="relative flex justify-center items-center">
              <div
                onClick={() => handleItemClick(EvaluationItems.MOOD)}
                className={cls(
                  "w-16 h-16 text-sm rounded-full flex justify-center items-center border-2 transition-background",
                  items[evaluationIdx].flavor === null
                    ? "cursor-not-allowed bg-black/30"
                    : "cursor-pointer bg-white"
                )}
              >
                {evaluationItems[EvaluationItems.MOOD].label}
              </div>
              <AnimatePresence>
                {items[evaluationIdx].mode === EvaluationItems.MOOD &&
                  evaluationItems[EvaluationItems.MOOD].data.map((item) => (
                    <EvaluationItem
                      key={item.value}
                      item={item}
                      type={EvaluationItems.MOOD}
                      onClick={() =>
                        evaluate(
                          items[evaluationIdx].id,
                          item.value,
                          EvaluationItems.MOOD
                        )
                      }
                    />
                  ))}
              </AnimatePresence>
            </div>
          </div>
          <div className="absolute -translate-y-[46.35px] translate-x-[142.65px]">
            <div className="relative flex justify-center items-center">
              <div
                onClick={() => handleItemClick(EvaluationItems.CLEANLINESS)}
                className={cls(
                  "w-16 h-16 text-sm rounded-full flex justify-center items-center border-2 transition-background",
                  items[evaluationIdx].flavor === null
                    ? "cursor-not-allowed bg-black/30"
                    : "cursor-pointer bg-white"
                )}
              >
                {evaluationItems[EvaluationItems.CLEANLINESS].label}
              </div>
              <AnimatePresence>
                {items[evaluationIdx].mode === EvaluationItems.CLEANLINESS &&
                  evaluationItems[EvaluationItems.CLEANLINESS].data.map(
                    (item) => (
                      <EvaluationItem
                        key={item.value}
                        item={item}
                        type={EvaluationItems.CLEANLINESS}
                        onClick={() =>
                          evaluate(
                            items[evaluationIdx].id,
                            item.value,
                            EvaluationItems.CLEANLINESS
                          )
                        }
                      />
                    )
                  )}
              </AnimatePresence>
            </div>
          </div>
          <div className="absolute translate-y-[121.35px] translate-x-[88.05px]">
            <div className="relative flex justify-center items-center">
              <div
                onClick={() => handleItemClick(EvaluationItems.PRICE)}
                className={cls(
                  "w-16 h-16 text-sm rounded-full flex justify-center items-center border-2 transition-background",
                  items[evaluationIdx].flavor === null
                    ? "cursor-not-allowed bg-black/30"
                    : "cursor-pointer bg-white"
                )}
              >
                {evaluationItems[EvaluationItems.PRICE].label}
              </div>
            </div>
          </div>
          <div className="absolute translate-y-[121.35px] -translate-x-[88.05px]">
            <div className="relative flex justify-center items-center">
              <div
                onClick={() => handleItemClick(EvaluationItems.PLATING)}
                className={cls(
                  "w-16 h-16 text-sm rounded-full flex justify-center items-center border-2 transition-background",
                  items[evaluationIdx].flavor === null
                    ? "cursor-not-allowed bg-black/30"
                    : "cursor-pointer bg-white"
                )}
              >
                {evaluationItems[EvaluationItems.PLATING].label}
              </div>
              <AnimatePresence>
                {items[evaluationIdx].mode === EvaluationItems.PLATING &&
                  evaluationItems[EvaluationItems.PLATING].data.map((item) => (
                    <EvaluationItem
                      key={item.value}
                      item={item}
                      type={EvaluationItems.PLATING}
                      onClick={() =>
                        evaluate(
                          items[evaluationIdx].id,
                          item.value,
                          EvaluationItems.PLATING
                        )
                      }
                    />
                  ))}
              </AnimatePresence>
            </div>
          </div>
          <div className="absolute -translate-y-[46.35px] -translate-x-[142.65px]">
            <div className="relative flex justify-center items-center">
              <div
                onClick={() => handleItemClick(EvaluationItems.SERVICE)}
                className={cls(
                  "w-16 h-16 text-sm rounded-full flex justify-center items-center border-2 transition-background",
                  items[evaluationIdx].flavor === null
                    ? "cursor-not-allowed bg-black/30"
                    : "cursor-pointer bg-white"
                )}
              >
                {evaluationItems[EvaluationItems.SERVICE].label}
              </div>
              <AnimatePresence>
                {items[evaluationIdx].mode === EvaluationItems.SERVICE &&
                  evaluationItems[EvaluationItems.SERVICE].data.map((item) => (
                    <EvaluationItem
                      key={item.value}
                      item={item}
                      type={EvaluationItems.SERVICE}
                      onClick={() =>
                        evaluate(
                          items[evaluationIdx].id,
                          item.value,
                          EvaluationItems.SERVICE
                        )
                      }
                    />
                  ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      ) : (
        <UploadDishPhoto />
      )}
    </div>
  );
}
