import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
import { memo } from "react";
import ResultDtoMapper from "./ResultDtoMapper";

interface Props {
  item: RestaurantEvaluateDto;
}

function HomeCard({ item }: Props) {
  return (
    <Card className="aspect-square" as={Link} href={`/dishes/${item.menuId}`}>
      <CardBody className="p-0">
        <Image
          shadow="sm"
          radius="none"
          alt="썸네일"
          className="w-full object-cover aspect-[4/3] h-full"
          classNames={{
            wrapper: "w-full h-full",
            zoomedWrapper: "w-full h-full",
          }}
          src={item.url}
          isZoomed
        />
      </CardBody>
      <CardFooter className="text-small flex justify-between aspect-[4/1] items-center">
        <div className="font-bold text-lg whitespace-nowrap overflow-hidden text-ellipsis ">
          {item.menuName}
        </div>
        <ResultDtoMapper data={item.evaluate} />
      </CardFooter>
    </Card>
  );
}

export default memo(HomeCard);
