import { Button, Card, CardBody, Image, Tooltip } from "@nextui-org/react";
import Modal from "./Modal";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

interface AddTopTenModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  selectedIdx: number | null;
}

export default function AddTopTenModal({
  isOpen,
  onOpenChange,
  onClose,
  selectedIdx,
}: AddTopTenModalProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  async function handleClick() {
    // 맛식 추가 API 호출
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
        <Button color="primary" onClick={handleClick}>
          추가
        </Button>
      }
      size="xl"
    >
      <div className="max-h-[50vh] overflow-y-auto space-y-3 p-3">
        {[1, 2, 3, 4, 5].map((item) => (
          <Card
            key={item}
            shadow="sm"
            isPressable
            onPress={() => handlePress(item)}
            className="w-full"
          >
            <CardBody>
              <div className="flex gap-3">
                <Image
                  src="https://nextui.org/images/fruit-1.jpeg"
                  alt="썸네일"
                  width={140}
                  className="aspect-square object-cover"
                />
                <div className="grow flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-bold">메뉴 이름</div>
                    <div className="text-sm text-black/50">2000.00.00</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tooltip content="hahahaha" closeDelay={0}>
                      <Image
                        width={50}
                        src="/images/taste4.png"
                        alt="맛 평가 항목"
                      />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </CardBody>
            <AnimatePresence>
              {selectedId === item && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/30 z-10 text-white grid place-items-center text-5xl"
                >
                  <IoCheckmarkCircleOutline />
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>
    </Modal>
  );
}
