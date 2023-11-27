import {
  Modal as ModalComponent,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  headerContent?: ReactNode;
  footerContent?: ReactNode;
  children: ReactNode | ((onClose: () => void) => ReactNode);
}

export default function Modal({
  isOpen,
  onOpenChange,
  onClose,
  headerContent,
  footerContent,
  children,
}: ModalProps) {
  return (
    <ModalComponent
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {headerContent && <ModalHeader>{headerContent}</ModalHeader>}
            {children && (
              <ModalBody>
                {typeof children === "function" ? children(onClose) : children}
              </ModalBody>
            )}
            {footerContent && <ModalFooter>{footerContent}</ModalFooter>}
          </>
        )}
      </ModalContent>
    </ModalComponent>
  );
}
