import { Button } from "@nextui-org/react";
import Modal from "./Modal";
import { useEffect, useRef, useState } from "react";
import { userApi } from "@/libs/redux/api/userApi";
import EvaluationCard from "../EvaluationCard";
import useInView from "@/hooks/useInView";

interface AddTopTenModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  selectedIdx: number | null;
  topTen: TopTenDto[] | undefined;
}

export default function AddTopTenModal({
  isOpen,
  onOpenChange,
  onClose,
  selectedIdx,
  topTen,
}: AddTopTenModalProps) {
  const [selectedId, setSelectedId] = useState("");
  const [trigger, { isLoading, error }] = userApi.usePostTopTenMutation();
  const [id, setId] = useState(0);
  const { data, error: evaluationError } = userApi.useGetEvaluationHistoryQuery(
    { id },
    { skip: !isOpen }
  );
  const { ref } = useInView({
    callback(inInView) {
      if (inInView && data && !data[data.length - 1].last)
        setId(parseInt(data[data.length - 1].id));
    },
  });

  async function handleClick() {
    if (!topTen || selectedIdx === null) return;
    const item = data?.find((item) => item.id === selectedId)!;
    trigger([
      ...topTen,
      {
        evaluate: item?.evaluate,
        menuId: item.menuId,
        menuName: item.menuName,
        restaurantId: item.restaurantId,
        url: item.url,
        rank: selectedIdx + 1 + "",
      },
    ]);
    onClose();
  }

  function handlePress(id: string) {
    setSelectedId((prev) => (prev === id ? "" : id));
  }

  useEffect(() => {
    if (!error) return;
    if ("status" in error && error.status === 409)
      alert("같은 메뉴를 중복으로 추가할 수 없습니다.");
  }, [error]);

  useEffect(() => {
    return () => {
      setSelectedId("");
    };
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      headerContent={`${
        selectedIdx !== null ? `Top ${selectedIdx + 1} ` : ""
      }맛식 추가`}
      footerContent={
        <Button color="primary" onClick={handleClick} isLoading={isLoading}>
          추가
        </Button>
      }
      size="xl"
    >
      <div className="max-h-[50vh] overflow-y-auto space-y-3 p-3">
        {data?.map((item, i) => (
          <EvaluationCard
            key={item.id}
            item={item}
            handlePress={(id) => handlePress(id)}
            selectedId={selectedId}
            ref={i === data.length - 1 ? ref : undefined}
          />
        ))}
        {evaluationError &&
          "data" in evaluationError &&
          (evaluationError.data as string).includes("value") && (
            <div className="text-black/50">평가 내역이 존재하지 않습니다.</div>
          )}
      </div>
    </Modal>
  );
}
