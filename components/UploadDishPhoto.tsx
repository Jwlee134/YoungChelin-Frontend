import useEvaluationStore from "@/hooks/useEvaluationStore";
import { getBase64 } from "@/libs/utils";
import { Image } from "@nextui-org/react";
import { ChangeEvent } from "react";
import { useShallow } from "zustand/react/shallow";

export default function UploadDishPhoto() {
  const { item, uploadPhoto } = useEvaluationStore(
    useShallow((state) => ({
      item: state.evaluationItems[Math.floor(state.evaluationCursor / 2)],
      uploadPhoto: state.uploadPhoto,
    }))
  );

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await getBase64(file);
    uploadPhoto(item.id, { file, url });
    e.target.value = "";
  }

  return (
    <div className="grow flex justify-center items-center">
      <div className="border border-dashed border-gray-300 text-gray-400 rounded-2xl w-[50vw] h-[50vw] relative">
        <label
          htmlFor="file"
          className="w-full h-full flex justify-center items-center cursor-pointer"
        >
          클릭해서 사진 업로드
        </label>
        {item.file?.url && (
          <Image
            src={item.file.url}
            alt="썸네일"
            className="w-full h-full object-cover cursor-pointer rounded-2xl"
            classNames={{ wrapper: "absolute inset-2" }}
            onClick={() => uploadPhoto(item.id, null)}
          />
        )}
      </div>
      <input
        id="file"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
