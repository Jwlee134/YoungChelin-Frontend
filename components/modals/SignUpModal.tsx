import { useRouter, useSearchParams } from "next/navigation";
import Modal from "./Modal";
import { userApi } from "@/libs/redux/api/userApi";
import { useForm } from "react-hook-form";
import { Button, Input, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage";

interface SignUpForm {
  username: string;
  password: string;
  passwordConfirm: string;
}

interface SignUpModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

export default function SignUpModal({
  isOpen,
  onOpenChange,
  onClose,
}: SignUpModalProps) {
  const email = useSearchParams().get("email");
  const [verify, { isLoading: isVerifying, isSuccess }] =
    userApi.useVerifyEmailMutation();
  const [signUp, { isLoading, error }] = userApi.useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpForm>();
  const router = useRouter();
  const [customErrorMsg, setCustomErrorMsg] = useState("");

  function onValid({ username, password, passwordConfirm }: SignUpForm) {
    if (password !== passwordConfirm) {
      setCustomErrorMsg("비밀번호가 일치하지 않습니다.");
      return;
    }
    signUp({ email: email!, userName: username, password })
      .unwrap()
      .then(() => {
        reset();
        router.replace("/");
      });
  }

  useEffect(() => {
    if (isOpen) verify({ email: email! });
  }, [isOpen, verify, email]);

  useEffect(() => {
    if (!error) return;
    if ("status" in error) {
      setCustomErrorMsg(
        error.status === 409
          ? "이미 존재하는 아이디입니다."
          : "비밀번호는 영문 대,소문자와 숫자, 특수기호가 적어도 1개 이상씩 포함된 8자 ~ 20자의 비밀번호여야 합니다."
      );
    }
  }, [error]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      headerContent="회원가입"
      isDismissable={false}
      hideCloseButton
      footerContent={
        !isSuccess && (
          <Button onClick={() => router.replace("/")} isLoading={isLoading}>
            홈으로 돌아가기
          </Button>
        )
      }
    >
      {isVerifying ? (
        <Spinner />
      ) : isSuccess ? (
        <form className="space-y-3 mb-6" onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("username", { required: true })}
            autoFocus
            label="아이디"
            variant="bordered"
            isInvalid={!!errors.username}
          />
          <Input
            {...register("password", { required: true })}
            type="password"
            label="비밀번호"
            variant="bordered"
            isInvalid={!!errors.password}
          />
          <Input
            {...register("passwordConfirm", { required: true })}
            type="password"
            label="비밀번호 확인"
            variant="bordered"
            isInvalid={!!errors.passwordConfirm}
          />
          <Button type="submit" className="w-full" isLoading={isLoading}>
            회원가입
          </Button>
          {customErrorMsg && <ErrorMessage text={customErrorMsg} />}
        </form>
      ) : (
        <div>이메일 인증이 실패하였습니다. 다시 시도해 주세요.</div>
      )}
    </Modal>
  );
}
