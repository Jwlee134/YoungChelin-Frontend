import { useCallback, useEffect, useState } from "react";
import { NextBtn, PrevBtn } from "./CarouselInteractions";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
import ResultDtoMapper from "./ResultDtoMapper";

interface Props {
  data: RecommendDto[];
  title: string;
}

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
                  className="h-full"
                  as={Link}
                  href={`/dishes/${item.menuId}`}
                  shadow="sm"
                >
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
