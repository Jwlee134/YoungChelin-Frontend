import {
  Modal as ModalComponent,
  ModalProps as ModalComponentProps,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/react";
import { ReactNode } from "react";

interface ModalProps extends Omit<ModalComponentProps, "children"> {
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
  ...rest
}: ModalProps) {
  return (
    <ModalComponent
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      {...rest}
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
