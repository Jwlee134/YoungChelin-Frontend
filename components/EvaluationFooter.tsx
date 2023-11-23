"use client";

import useEvaluationStore, {
  EvaluationSteps,
} from "@/hooks/useEvaluationStore";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";

export default function EvaluationFooter() {
  const router = useRouter();
  const pathname = usePathname();
  const { restaurant, items, totalLength, cursor, setCursor, isPhotoStep } =
    useEvaluationStore(
      useShallow((state) => ({
        restaurant: state.restaurant,
        items: state.evaluationItems,
        totalLength: state.evaluationItems.length * 2,
        cursor: state.evaluationCursor,
        setCursor: state.setEvaluationCursor,
        isPhotoStep: state.evaluationCursor % 2 === 1,
      }))
    );
  const evaluationIdx = Math.floor(cursor / 2);

  function handlePrev() {
    if (pathname === EvaluationSteps.EVALUATE && cursor !== 0) {
      setCursor(cursor - 1);
    } else {
      router.back();
    }
  }

  function handleNext() {
    if (pathname === EvaluationSteps.EVALUATE) {
      if (cursor < totalLength - 1) {
        setCursor(cursor + 1);
      } else {
        // 평가 업로드 로직
        console.log(items);
      }
    } else {
      switch (pathname) {
        case EvaluationSteps.RESTAURANT:
          router.push(EvaluationSteps.MENU);
          break;
        case EvaluationSteps.MENU:
          router.push(EvaluationSteps.EVALUATE);
          break;
      }
    }
  }

  function handleDisabled() {
    switch (pathname) {
      case EvaluationSteps.RESTAURANT:
        return !restaurant.id;
      case EvaluationSteps.MENU:
        return !items.length;
      case EvaluationSteps.EVALUATE:
        return isPhotoStep
          ? !items[evaluationIdx].file
          : items[evaluationIdx].flavor === null;
      default:
        return false;
    }
  }

  return (
    <footer className="h-20 border-t fixed bottom-0 w-full z-50 bg-white">
      <div className="max-w-screen-lg flex justify-end items-center p-5 space-x-2 mx-auto">
        {pathname !== EvaluationSteps.RESTAURANT && (
          <Button onClick={handlePrev} color="primary" variant="light">
            이전
          </Button>
        )}
        <Button
          onClick={handleNext}
          color="primary"
          isDisabled={handleDisabled()}
        >
          {pathname === EvaluationSteps.EVALUATE && cursor === totalLength - 1
            ? "완료"
            : "다음"}
        </Button>
      </div>
    </footer>
  );
}
