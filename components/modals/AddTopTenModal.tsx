import { Button } from "@nextui-org/react";
import Modal from "./Modal";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { userApi } from "@/libs/redux/api/userApi";
import EvaluationCard from "../EvaluationCard";

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
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [trigger, { isLoading }] = userApi.usePostTopTenMutation();
  const [id, setId] = useState(0);
  const { data } = userApi.useGetEvaluationHistoryQuery(
    { id },
    { skip: !isOpen }
  );
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (!inView || !data) return;
    if (data.length && inView) {
      setId(parseInt(data[data.length - 1].id));
    }
  }, [inView, data]);

  async function handleClick() {
    if (!topTen || selectedIdx === null) return;
    const item = data?.find((item) => item.menuId === selectedId)!;
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
    ])
      .unwrap()
      .then(onClose);
  }

  function handlePress(id: number) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

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
        {data?.map((item) => (
          <EvaluationCard
            key={item.menuId}
            item={item}
            handlePress={(id) => handlePress(id)}
            selectedId={selectedId}
            ref={item.last ? ref : undefined}
          />
        ))}
      </div>
    </Modal>
  );
}
