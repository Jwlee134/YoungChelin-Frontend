import { useRouter, useSearchParams } from "next/navigation";
import Modal from "./Modal";
import { userApi } from "@/libs/redux/api/userApi";
import { useForm } from "react-hook-form";
import { Button, Input, Spinner } from "@nextui-org/react";
import { useEffect } from "react";

interface SignUpForm {
  username: string;
  password: string;
  passwordConfirm: string;
  error: string;
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
  const [signUp, { isLoading }] = userApi.useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<SignUpForm>();
  const router = useRouter();

  function onValid({ username, password, passwordConfirm }: SignUpForm) {
    if (password !== passwordConfirm) {
      setError("error", {
        message: "비밀번호가 일치하지 않습니다.",
      });
      return;
    }
    signUp({ email: email!, userName: username, password })
      .unwrap()
      .then(() => {
        reset();
        router.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (isOpen) verify({ email: email! });
  }, [isOpen, verify, email]);

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
        <form className="space-y-3 mb-6">
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
          <Button
            type="submit"
            className="w-full"
            onClick={handleSubmit(onValid)}
            isLoading={isLoading}
          >
            회원가입
          </Button>
          {errors.error?.message && (
            <div className="mt-3 text-sm text-red-500">
              {errors.error?.message}
            </div>
          )}
        </form>
      ) : (
        <div>이메일 인증이 실패하였습니다. 다시 시도해 주세요.</div>
      )}
    </Modal>
  );
}
