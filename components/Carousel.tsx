import { useCallback, useEffect, useState } from "react";
import { NextBtn, PrevBtn } from "./CarouselInteractions";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import { Card, CardBody, CardFooter, Image, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { evaluationItems } from "@/libs/constants";
import { EvaluationItems } from "@/libs/redux/slices/evaluationSlice";
import ResultDtoMapper from "./ResultDtoMapper";

interface Props {
  data: RecommendDto[];
  title: string;
}

const temp = {
  flavor: "0",
  mood: ["0", "1", "2", "3", "4"],
  price: "2",
  service: "2",
  plating: "2",
  cleanliness: "2",
};

export default function Carousel({ data, title }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) for (let i = 0; i < 4; i++) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) for (let i = 0; i < 4; i++) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <>
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="relative">
        <div className="overflow-hidden py-8" ref={emblaRef}>
          <div className="grid grid-flow-col auto-cols-[30%] gap-4">
            {data.map((item) => (
              <div key={item.menuId} className="min-w-0">
                <Card
                  className="aspect-square"
                  as={Link}
                  href={`/dishes/${item.menuId}`}
                  shadow="sm"
                >
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
              </div>
            ))}
          </div>
        </div>
        <PrevBtn onClick={scrollPrev} disabled={prevBtnDisabled} />
        <NextBtn onClick={scrollNext} disabled={nextBtnDisabled} />
      </div>
    </>
  );
}
