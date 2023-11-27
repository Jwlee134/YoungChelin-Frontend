import { Button } from "@nextui-org/react";
import Modal from "./Modal";

interface QuitModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

export default function QuitModal({
  isOpen,
  onOpenChange,
  onClose,
}: QuitModalProps) {
  async function handleClick() {
    // 탈퇴 API 호출
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      headerContent="회원 탈퇴"
      footerContent={
        <Button color="danger" onClick={handleClick}>
          탈퇴
        </Button>
      }
    >
      <p>정말 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
    </Modal>
  );
}
