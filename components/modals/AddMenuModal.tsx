import { Button, Image, Input } from "@nextui-org/react";
import Modal from "./Modal";
import { evaluateApi } from "@/libs/redux/api/evaluateApi";
import { useSelector } from "@/libs/redux/store";
import { useForm } from "react-hook-form";
import { getBase64 } from "@/libs/utils";
import { ChangeEvent, useEffect, useState } from "react";

interface AddMenuModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

interface Form {
  name: string;
}

export default function AddMenuModal({
  isOpen,
  onOpenChange,
  onClose,
}: AddMenuModalProps) {
  const restaurantId = useSelector((state) => state.evaluation.restaurant.id);
  const [trigger, { isLoading }] = evaluateApi.usePostMenuMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>();
  const [file, setFile] = useState<{ data: File | null; url: string | null }>({
    data: null,
    url: null,
  });

  function onValid({ name }: Form) {
    if (!file.data) return;
    const formData = new FormData();
    formData.append("file", file.data);
    formData.append("menuName", name);
    formData.append("restaurantId", restaurantId + "");
    trigger(formData).unwrap().then(onClose);
  }

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await getBase64(file);
    setFile({ data: file, url });
    e.target.value = "";
  }

  useEffect(() => {
    return () => {
      reset();
      setFile({ data: null, url: null });
    };
  }, [isOpen, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      headerContent="메뉴 추가"
      footerContent={
        <Button
          color="primary"
          onClick={handleSubmit(onValid)}
          isLoading={isLoading}
        >
          추가
        </Button>
      }
    >
      <form className="space-y-3">
        <Input
          {...register("name", { required: true })}
          autoFocus
          label="메뉴명"
          variant="bordered"
          isInvalid={!!errors.name}
        />
        <div className="border border-dashed border-gray-300 text-gray-400 rounded-xl w-full aspect-square relative">
          <label
            htmlFor="file"
            className="w-full h-full flex justify-center items-center cursor-pointer"
          >
            클릭해서 사진 업로드
            {file.url && (
              <Image
                src={file.url}
                alt="썸네일"
                className="w-full h-full object-cover cursor-pointer rounded-xl"
                classNames={{ wrapper: "absolute inset-0" }}
              />
            )}
          </label>
        </div>
        <input
          id="file"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </form>
    </Modal>
  );
}
