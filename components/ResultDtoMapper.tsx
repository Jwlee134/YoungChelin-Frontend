import { evaluationItems } from "@/libs/constants";
import { EvaluationItems } from "@/libs/redux/slices/evaluationSlice";
import { cls } from "@/libs/utils";
import { Image, Tooltip } from "@nextui-org/react";

interface Props {
  data: ResultDto;
  fullWidth?: boolean;
  size?: "md" | "lg";
}

export default function ResultDtoMapper({
  data,
  fullWidth = false,
  size = "md",
}: Props) {
  return (
    <div
      className={cls(
        "flex items-center flex-wrap",
        fullWidth ? "" : "max-w-[156px]",
        size === "md" ? "gap-1" : "gap-2"
      )}
    >
      {Object.keys(data).map((evaluatedKey) => {
        const keyWithData = evaluationItems[evaluatedKey as EvaluationItems];
        if (evaluatedKey === EvaluationItems.MOOD) {
          return data[evaluatedKey]
            .map((mood) => {
              return (
                <Tooltip
                  key={mood}
                  content={keyWithData.data[mood].description}
                  closeDelay={0}
                >
                  <Image
                    src={keyWithData.data[mood].src}
                    alt={keyWithData.data[mood].description}
                    className={cls(
                      size === "md" ? "max-w-[28px]" : "max-w-[34px]"
                    )}
                  />
                </Tooltip>
              );
            })
            .flat();
        }
        const value = data[evaluatedKey] as string;
        const item = keyWithData.data[value];
        if (item)
          return (
            <Tooltip
              key={evaluatedKey}
              content={item.description}
              closeDelay={0}
            >
              <Image
                src={item.src}
                alt={item.description}
                className={cls(size === "md" ? "max-w-[28px]" : "max-w-[34px]")}
              />
            </Tooltip>
          );
        return null;
      })}
    </div>
  );
}
