import { evaluationActions } from "@/libs/redux/slices/evaluationSlice";
import { useDispatch, useSelector } from "@/libs/redux/store";
import { getBase64 } from "@/libs/utils";
import { Image } from "@nextui-org/react";
import { ChangeEvent } from "react";

export default function UploadDishPhoto() {
  const item = useSelector(
    (state) =>
      state.evaluation.evaluationItems[
        Math.floor(state.evaluation.evaluationCursor / 2)
      ]
  );
  const dispatch = useDispatch();

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await getBase64(file);
    dispatch(evaluationActions.uploadPhoto({ dishId: item.id, data: url }));
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
          {item.fileUrl && (
            <Image
              src={item.fileUrl}
              alt="썸네일"
              className="w-full h-full object-cover cursor-pointer rounded-2xl"
              classNames={{ wrapper: "absolute inset-2" }}
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
    </div>
  );
}
