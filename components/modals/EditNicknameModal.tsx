import { Button, Input } from "@nextui-org/react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";

interface EditNicknameModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

interface Form {
  nickname: string;
}

export default function EditNicknameModal({
  isOpen,
  onOpenChange,
  onClose,
}: EditNicknameModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: { nickname: "" },
  });

  async function onValid({ nickname }: Form) {
    console.log(nickname);
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      headerContent="닉네임 수정"
      footerContent={
        <Button color="primary" type="submit" onClick={handleSubmit(onValid)}>
          수정
        </Button>
      }
    >
      <Input
        {...register("nickname", { required: "닉네임을 입력하세요." })}
        variant="bordered"
        isInvalid={!!errors.nickname?.message}
        errorMessage={errors.nickname?.message}
      />
    </Modal>
  );
}
