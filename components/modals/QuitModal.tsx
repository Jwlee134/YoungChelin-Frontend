import { Button } from "@nextui-org/react";
import Modal from "./Modal";
import { userApi } from "@/libs/redux/api/userApi";
import { setToken } from "@/libs/utils";

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
  const [trigger, { isLoading }] = userApi.useDeleteAccountMutation();
  const { refetch } = userApi.useGetMeQuery();

  async function handleClick() {
    trigger().then(() => {
      setToken(null);
      refetch();
      onClose();
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      headerContent="회원 탈퇴"
      footerContent={
        <Button color="danger" onClick={handleClick} isLoading={isLoading}>
          탈퇴
        </Button>
      }
    >
      <p>정말 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
    </Modal>
  );
}
