import { cls } from "@/libs/utils";
import { Button } from "@nextui-org/react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export function PrevBtn({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <Button
      isIconOnly
      className={cls(
        "absolute top-1/2 -translate-y-1/2 left-1 text-2xl bg-transparent",
        disabled ? "text-gray-400" : "text-white"
      )}
      onClick={onClick}
    >
      <IoChevronBack />
    </Button>
  );
}

export function NextBtn({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <Button
      isIconOnly
      className={cls(
        "absolute top-1/2 -translate-y-1/2 right-1 text-2xl bg-transparent drop-shadow",
        disabled ? "text-gray-400" : "text-white"
      )}
      onClick={onClick}
    >
      <IoChevronForward />
    </Button>
  );
}
