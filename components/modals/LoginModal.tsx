import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { userApi } from "@/libs/redux/api/userApi";
import { setToken } from "@/libs/utils";
import EmailInputs from "../EmailInputs";

interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

export interface LoginForm {
  username: string;
  email: string;
  emailAddress: string;
  password: string;
  error: string;
}

enum Mode {
  LOGIN,
  SIGN_UP,
  AFTER_SIGN_UP,
  FIND_PW,
  AFTER_FIND_PW,
  FIND_ID,
  AFTER_FIND_ID,
}

const texts = {
  0: ["로그인", "로그인"],
  1: ["회원가입", "이메일 인증"],
  2: ["인증 링크가 전송되었습니다.", "확인"],
  3: ["비밀번호 찾기", "비밀번호 찾기"],
  4: ["임시 비밀번호 발급", "확인"],
  5: ["아이디 찾기", "확인"],
  6: ["아이디 찾기", "확인"],
};

export default function LoginModal({
  isOpen,
  onOpenChange,
  onClose,
}: LoginModalProps) {
  const [mode, setMode] = useState<Mode>(Mode.LOGIN);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>();
  const [login, { isLoading: isLoggingIn }] = userApi.useLoginMutation();
  const [sendEmail, { isLoading: isSendingEmail }] =
    userApi.useSendEmailMutation();
  const [findId, { isLoading: isFindingId }] = userApi.useFindIdMutation();
  const [findPw, { isLoading: isFindingPw }] = userApi.useFindPwMutation();
  const [foundUsername, setFoundUsername] = useState("");

  function onValid({ email, emailAddress, password }: LoginForm) {
    const combinedEmail = `${email}@${emailAddress}`;

    switch (mode) {
      case Mode.LOGIN:
        login({ userName: combinedEmail, password })
          .unwrap()
          .then(({ token }) => {
            setToken(token);
            onClose();
          });
        break;
      case Mode.SIGN_UP:
        sendEmail({ email: combinedEmail })
          .unwrap()
          .then(() => {
            setMode(Mode.AFTER_SIGN_UP);
          });
        break;
      case Mode.FIND_PW:
        findPw({ email: combinedEmail })
          .unwrap()
          .then(() => {
            setMode(Mode.AFTER_FIND_PW);
          });

        break;
      case Mode.FIND_ID:
        findId({ email: combinedEmail })
          .unwrap()
          .then((username) => {
            setFoundUsername(username);
            setMode(Mode.AFTER_FIND_ID);
          });
    }
  }

  useEffect(() => {
    return () => {
      setMode(Mode.LOGIN);
      setFoundUsername("");
      reset();
    };
  }, [isOpen, reset]);

  let bodyContent = (
    <>
      <form className="space-y-3">
        <Input
          {...register("username", { required: true })}
          autoFocus
          label="아이디"
          variant="bordered"
          isInvalid={!!errors.password}
        />
        <Input
          {...register("password", { required: true })}
          type="password"
          label="비밀번호"
          variant="bordered"
          isInvalid={!!errors.password}
        />
        <Button
          type="submit"
          className="w-full"
          onClick={handleSubmit(onValid)}
          isLoading={isLoggingIn}
        >
          {texts[mode][1]}
        </Button>
      </form>
      <div className="py-2 flex justify-end items-center text-sm text-gray-500 gap-6">
        <div className="cursor-pointer" onClick={() => setMode(Mode.SIGN_UP)}>
          회원가입
        </div>
        <div className="cursor-pointer" onClick={() => setMode(Mode.FIND_ID)}>
          아이디 찾기
        </div>
        <div className="cursor-pointer" onClick={() => setMode(Mode.FIND_PW)}>
          비밀번호 찾기
        </div>
      </div>
    </>
  );

  if (mode === Mode.SIGN_UP) {
    bodyContent = (
      <>
        <form className="space-y-3">
          <EmailInputs register={register} errors={errors} />
          <Button
            type="submit"
            className="w-full"
            onClick={handleSubmit(onValid)}
            isLoading={isSendingEmail}
          >
            {texts[mode][1]}
          </Button>
        </form>
        <div className="py-2 flex justify-end items-center text-sm text-gray-500 gap-6">
          <div className="cursor-pointer" onClick={() => setMode(Mode.LOGIN)}>
            로그인
          </div>
        </div>
      </>
    );
  }

  if (mode === Mode.AFTER_SIGN_UP) {
    bodyContent = (
      <>
        <div>이메일을 통해 본인인증을 완료해 주시기 바랍니다.</div>
        <Button className="my-3" onClick={onClose}>
          {texts[mode][1]}
        </Button>
      </>
    );
  }

  if (mode === Mode.FIND_PW) {
    bodyContent = (
      <form className="space-y-3 mb-6">
        <EmailInputs register={register} errors={errors} />
        <Button
          type="submit"
          className="w-full"
          onClick={handleSubmit(onValid)}
          isLoading={isFindingPw}
        >
          {texts[mode][1]}
        </Button>
      </form>
    );
  }

  if (mode === Mode.AFTER_FIND_PW) {
    bodyContent = (
      <>
        <div>해당 이메일로 임시 비밀번호가 발급되었습니다.</div>
        <Button className="my-3" onClick={onClose}>
          {texts[mode][1]}
        </Button>
      </>
    );
  }

  if (mode === Mode.FIND_ID) {
    bodyContent = (
      <form className="space-y-3 mb-6">
        <EmailInputs register={register} errors={errors} />
        <Button
          type="submit"
          className="w-full"
          onClick={handleSubmit(onValid)}
          isLoading={isFindingId}
        >
          {texts[mode][1]}
        </Button>
      </form>
    );
  }

  if (mode === Mode.AFTER_FIND_ID) {
    bodyContent = (
      <>
        <div>아이디는 {foundUsername} 입니다.</div>
        <Button className="my-3" onClick={onClose}>
          {texts[mode][1]}
        </Button>
      </>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      headerContent={texts[mode][0]}
    >
      {bodyContent}
    </Modal>
  );
}
