import { useCallback, useEffect, useState } from "react";
import { NextBtn, PrevBtn } from "./CarouselInteractions";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import { Card, CardBody, CardFooter, Image, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { evaluationItems } from "@/libs/constants";
import { EvaluationItems } from "@/libs/redux/slices/evaluationSlice";

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
          <div className="grid grid-flow-col auto-cols-[25%] gap-4">
            {data.map((item) => (
              <div key={item.menuId} className="min-w-0">
                <Card
                  className="relative h-full"
                  as={Link}
                  href={`/dishes/${item.menuId}`}
                  shadow="sm"
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
                  <CardFooter className="text-sm block">
                    <div className="font-bold text-lg whitespace-nowrap overflow-hidden text-ellipsis mb-1">
                      {item.menuName}
                    </div>
                    <div className="flex gap-1 items-center flex-wrap">
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
                                  <Image
                                    width={28}
                                    src={v?.src}
                                    alt={v?.description}
                                  />
                                </Tooltip>
                              );
                            })
                            .flat();
                        }
                        const v = keyWithData.data.find(
                          (data) =>
                            data.value + "" ===
                            (item.evaluate[evaluatedKey] as string)
                        );
                        return (
                          <Tooltip
                            key={evaluatedKey}
                            content={v?.description}
                            closeDelay={0}
                          >
                            <Image
                              width={28}
                              src={v?.src}
                              alt={v?.description}
                            />
                          </Tooltip>
                        );
                      })}
                    </div>
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
