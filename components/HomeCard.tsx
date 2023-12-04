import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
import { ForwardedRef, forwardRef, memo } from "react";
import ResultDtoMapper from "./ResultDtoMapper";

interface Props {
  item: RestaurantEvaluateDto;
}

function HomeCard({ item }: Props, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <Card as={Link} href={`/dishes/${item.menuId}`} ref={ref}>
      <CardBody className="p-0 grow-0">
        <Image
          shadow="sm"
          radius="none"
          alt="썸네일"
          width="100%"
          className="object-cover aspect-[4/3]"
          src={item.url}
          isZoomed
        />
      </CardBody>
      <CardFooter className="text-small flex justify-between items-start">
        <div className="font-bold text-lg whitespace-nowrap overflow-hidden text-ellipsis">
          {item.menuName}
        </div>
        <ResultDtoMapper data={item.evaluate} />
      </CardFooter>
    </Card>
  );
}

const forwarded = forwardRef(HomeCard);

export default memo(forwarded);
