import { Button, Input } from "@nextui-org/react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

interface Form {
  currentPw: string;
  newPw: string;
  confirmNewPw: string;
}

export default function ChangePasswordModal({
  isOpen,
  onOpenChange,
  onClose,
}: ChangePasswordModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Form>();

  async function onValid({ currentPw, newPw, confirmNewPw }: Form) {
    if (newPw !== confirmNewPw) {
      setError("confirmNewPw", { message: "새 비밀번호가 일치하지 않습니다." });
      return;
    }
    // 비밀번호 변경 API 호출
  }

  const errorMessage =
    errors.newPw?.type === "required" ||
    errors.currentPw?.type === "required" ||
    errors.confirmNewPw?.type === "required"
      ? "필수 항목이 누락되었습니다."
      : errors.confirmNewPw?.message?.includes("일치")
      ? errors.confirmNewPw.message
      : "";

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      headerContent="비밀번호 변경"
      footerContent={
        <Button color="primary" onClick={handleSubmit(onValid)}>
          수정
        </Button>
      }
    >
      <Input
        {...register("currentPw", { required: true })}
        variant="bordered"
        label="현재 비밀번호"
        isInvalid={errors.currentPw?.type === "required"}
        /* 또는 현재 비밀번호 불일치시 setError에서 설정한 type */
      />
      <Input
        {...register("newPw", { required: true })}
        variant="bordered"
        label="새 비밀번호"
        isInvalid={errors.newPw?.type === "required"}
      />
      <Input
        {...register("confirmNewPw", { required: true })}
        variant="bordered"
        label="새 비밀번호 확인"
        errorMessage={errorMessage}
        isInvalid={
          errors.confirmNewPw?.type === "required" ||
          errors.confirmNewPw?.message?.includes("일치")
        }
      />
    </Modal>
  );
}
