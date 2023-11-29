"use client";

import {
  EvaluationSteps,
  evaluationActions,
} from "@/libs/redux/slices/evaluationSlice";
import { useDispatch, useSelector } from "@/libs/redux/store";
import { getFileFromBase64 } from "@/libs/utils";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { shallowEqual } from "react-redux";

export default function EvaluationFooter() {
  const router = useRouter();
  const pathname = usePathname();
  const { restaurant, items, totalLength, cursor, isPhotoStep } = useSelector(
    ({ evaluation }) => ({
      restaurant: evaluation.restaurant,
      items: evaluation.evaluationItems,
      totalLength: evaluation.evaluationItems.length * 2,
      cursor: evaluation.evaluationCursor,
      isPhotoStep: evaluation.evaluationCursor % 2 === 1,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const evaluationIdx = Math.floor(cursor / 2);

  function handlePrev() {
    if (pathname === EvaluationSteps.EVALUATE && cursor !== 0) {
      dispatch(evaluationActions.setEvaluationCursor(cursor - 1));
    } else {
      router.back();
    }
  }

  function handleNext() {
    if (pathname === EvaluationSteps.EVALUATE) {
      if (cursor < totalLength - 1) {
        dispatch(evaluationActions.setEvaluationCursor(cursor + 1));
      } else {
        // 평가 업로드 로직
        Promise.all(
          items.map(async (item) => {
            const file = await getFileFromBase64(item.id, item.fileUrl!);
            return { ...item, file };
          })
        ).then((items) => console.log(items));
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
          ? !items[evaluationIdx]?.fileUrl
          : items[evaluationIdx]?.flavor === null;
      default:
        return false;
    }
  }

  return (
    <footer className="h-20 border-t fixed bottom-0 left-0 right-0 w-full z-50 bg-white">
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
