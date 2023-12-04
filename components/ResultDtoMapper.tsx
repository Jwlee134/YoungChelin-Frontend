import { evaluationItems } from "@/libs/constants";
import { EvaluationItems } from "@/libs/redux/slices/evaluationSlice";
import { cls } from "@/libs/utils";
import { Image, Tooltip } from "@nextui-org/react";

interface Props {
  data: ResultDto;
  fullWidth?: boolean;
}

export default function ResultDtoMapper({ data, fullWidth = false }: Props) {
  return (
    <div
      className={cls(
        "flex gap-1 items-center flex-wrap",
        fullWidth ? "" : "max-w-[156px]"
      )}
    >
      {Object.keys(data).map((evaluatedKey, i) => {
        const keyWithData = evaluationItems[evaluatedKey as EvaluationItems];
        const v = Object.values(data)?.[i] as string;
        if (evaluatedKey === EvaluationItems.MOOD) {
          return data?.[evaluatedKey]
            ?.map((mood) => {
              return (
                <Tooltip
                  key={mood}
                  content={keyWithData.data[mood].description}
                  closeDelay={0}
                >
                  <Image
                    src={keyWithData.data[mood].src}
                    alt={keyWithData.data[mood].description}
                    className="max-w-[28px]"
                  />
                </Tooltip>
              );
            })
            .flat();
        }
        const item = keyWithData.data[v];
        if (item) {
          return (
            <Tooltip
              key={evaluatedKey}
              content={item.description}
              closeDelay={0}
            >
              <Image
                src={item.src}
                alt={item.description}
                className="max-w-[28px]"
              />
            </Tooltip>
          );
        }
        return null;
      })}
    </div>
  );
}
