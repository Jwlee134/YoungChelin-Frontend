import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Map from "../Map";
import { ChangeEvent, useState } from "react";
import { Document } from "@/app/api/keyword/route";
import { cls } from "@/libs/utils";
import { IoTrashOutline } from "react-icons/io5";

interface MapModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

export default function MapModal({
  isOpen,
  onOpenChange,
  onClose,
}: MapModalProps) {
  const [data, setData] = useState<Document[] | null>(null);
  const [selectedId, setSelectedId] = useState("");
  const [photos, setPhotos] = useState<
    { file: File; url: string; id: string }[]
  >([]);

  function handleClick() {
    onClose();
  }

  function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    setPhotos((prev) => [
      ...prev,
      ...Array.from(files).map((file) => ({
        id: `${file.name}-${file.size}-${file.lastModified}`,
        url: URL.createObjectURL(file),
        file,
      })),
    ]);
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h1>가게 선택</h1>
            </ModalHeader>
            <ModalBody className="relative">
              <p className="text-sm text-gray-500">
                ⚠ 현재 지도 영역 내에 존재하는 가게들을 검색합니다.
              </p>
              <div className="flex">
                <Map
                  data={data}
                  setData={setData}
                  setSelectedId={setSelectedId}
                />
              </div>
              <>
                <div className="w-full h-full absolute inset-0 z-10 bg-white grid grid-cols-2 p-6 overflow-y-auto gap-3">
                  {photos.map((photo, i) => (
                    <div
                      key={photo.id}
                      className={cls(
                        "relative aspect-square",
                        i === 0 ? "col-span-2" : "col-span-1"
                      )}
                    >
                      <Image
                        src={photo.url}
                        alt="thumbnail"
                        removeWrapper
                        className="w-full h-full object-cover"
                      />
                      <Button
                        isIconOnly
                        color="danger"
                        className="absolute right-2 top-2 z-10 text-base"
                        size="sm"
                        onClick={() =>
                          setPhotos((prev) =>
                            prev.filter((item) => item.id !== photo.id)
                          )
                        }
                      >
                        <IoTrashOutline />
                      </Button>
                    </div>
                  ))}
                  <label
                    htmlFor="file"
                    className={cls(
                      "w-full border border-dashed grid place-items-center border-gray-400 rounded-xl text-gray-500 cursor-pointer",
                      photos.length > 0
                        ? "col-span-1 aspect-square"
                        : "col-span-2"
                    )}
                  >
                    클릭하여 사진 업로드
                  </label>
                </div>
                <input
                  id="file"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleUpload}
                />
              </>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleClick}>
                완료
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
