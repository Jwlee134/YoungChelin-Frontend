import { evaluationItems } from "@/libs/constants";
import { EvaluationItems } from "@/libs/redux/slices/evaluationSlice";
import { Card, CardBody, CardFooter, Image, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { ForwardedRef, forwardRef, memo } from "react";

interface Props {
  item: RestaurantEvaluateDto;
}

function HomeCard({ item }: Props, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <Card
      key={item.menuId}
      className="relative"
      as={Link}
      href={`/dishes/${item.menuId}`}
      ref={item.last ? ref : undefined}
    >
      <CardBody className="p-0 flex-grow-0">
        <Image
          shadow="sm"
          radius="none"
          alt="썸네일"
          className="w-full object-cover aspect-[4/3]"
          src={item.url}
          isZoomed
        />
      </CardBody>
      <CardFooter className="text-small flex justify-between items-center">
        <div className="font-bold text-lg whitespace-nowrap overflow-hidden text-ellipsis">
          {item.menuName}
        </div>
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
                    <Tooltip key={mood} content={v?.description} closeDelay={0}>
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
      </CardFooter>
    </Card>
  );
}

const forwarded = forwardRef(HomeCard);

export default memo(forwarded);
