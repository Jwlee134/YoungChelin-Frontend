"use client";

import SignUpModal from "@/components/modals/SignUpModal";
import { useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";

export default function SignUpPage() {
  const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <div className="w-full h-full grid place-items-center">
      <SignUpModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </div>
  );
}
