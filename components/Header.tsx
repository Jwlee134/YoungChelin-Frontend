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
import SearchBar from "./SearchBar";
import { usePathname } from "next/navigation";
import useIsIntersecting from "@/hooks/useIsIntersecting";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const pathname = usePathname();
  const isIntersecting = useIsIntersecting((state) => state.isIntersecting);

  return (
    <header className="w-full h-20 bg-white/70 fixed top-0 backdrop-blur-xl">
      <div className="max-w-screen-lg mx-auto h-full items-center px-6 grid grid-cols-[1fr_2fr_1fr]">
        {pathname !== "/" ? (
          <Link href={"/"}>
            <Image src="/images/logo.png" alt="logo" width={100} height={43} />
          </Link>
        ) : (
          <div>
            <AnimatePresence>
              {!isIntersecting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={"/"}>
                    <Image
                      src="/images/logo.png"
                      alt="logo"
                      width={100}
                      height={43}
                    />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        <div className="justify-self-center w-full">
          {pathname !== "/" && <SearchBar />}
        </div>
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
