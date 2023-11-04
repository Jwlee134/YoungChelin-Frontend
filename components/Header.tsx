"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import LoginModal from "./modals/LoginModal";

export default function Header() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <header className="w-full h-20 drop-shadow-md bg-white">
      <div className="max-w-screen-lg mx-auto h-full items-center px-6 grid grid-cols-3">
        <Link href={"/"}>
          <Image src="/images/logo.png" alt="logo" width={100} height={43} />
        </Link>
        <div className="justify-self-center">{/* 검색창 */}</div>
        <div className="justify-self-end">
          <Dropdown>
            <DropdownTrigger>
              <Avatar showFallback src="" className="cursor-pointer" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Dropdown Actions">
              <DropdownItem onClick={onOpen}>로그인</DropdownItem>
              <DropdownItem>고객센터</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <LoginModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </header>
  );
}
