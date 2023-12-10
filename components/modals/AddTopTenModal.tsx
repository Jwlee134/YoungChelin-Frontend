import { Button } from "@nextui-org/react";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import { evaluationHistoryAdapter, userApi } from "@/libs/redux/api/userApi";
import EvaluationCard from "../EvaluationCard";
import useInView from "@/hooks/useInView";

interface AddTopTenModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  selectedRank: number | null;
}

export default function AddTopTenModal({
  isOpen,
  onOpenChange,
  onClose,
  selectedRank,
}: AddTopTenModalProps) {
  const { data: topTen } = userApi.useGetTopTenQuery();
  const [selectedId, setSelectedId] = useState("");
  const [trigger, { isLoading, error }] = userApi.usePostTopTenMutation();
  const [id, setId] = useState(0);
  const { data, error: evaluationError } = userApi.useGetEvaluationHistoryQuery(
    { id },
    { skip: !isOpen }
  );
  const selectedData = data
    ? evaluationHistoryAdapter.getSelectors().selectAll(data)
    : [];
  const { ref } = useInView({
    callback(inInView) {
      if (
        inInView &&
        selectedData &&
        !selectedData[selectedData.length - 1].last
      )
        setId(parseInt(selectedData[selectedData.length - 1].id));
    },
  });

  async function handleClick() {
    const item = data?.entities[selectedId];
    if (!topTen?.entities || selectedRank === null || !item) return;
    const topTens = Object.values(topTen.entities) as TopTenDto[];
    trigger([
      ...topTens,
      {
        evaluate: item?.evaluate,
        menuId: item.menuId,
        menuName: item.menuName,
        restaurantId: item.restaurantId,
        url: item.url,
        rank: selectedRank + "",
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
        selectedRank !== null ? `Top ${selectedRank} ` : ""
      }맛식 추가`}
      footerContent={
        <Button color="primary" onClick={handleClick} isLoading={isLoading}>
          추가
        </Button>
      }
      size="xl"
    >
      <div className="max-h-[50vh] overflow-y-auto space-y-3 p-3">
        {selectedData?.map((item, i) => (
          <EvaluationCard
            key={item.id}
            item={item}
            handlePress={(id) => handlePress(id)}
            selectedId={selectedId}
            ref={i === selectedData.length - 1 ? ref : undefined}
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
