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
import { motion, AnimatePresence } from "framer-motion";
import { userApi } from "@/libs/redux/api/userApi";
import { setToken } from "@/libs/utils";
import { useDispatch, useSelector } from "@/libs/redux/store";

export default function Header() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const pathname = usePathname();
  const isIntersecting = useSelector(
    (state) => state.global.isHomeLogoIntersecting
  );
  const { data, isError } = userApi.useGetMeQuery();
  const dispatch = useDispatch();

  return (
    <header className="w-full h-20 bg-white/70 fixed top-0 backdrop-blur-xl z-50">
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
          {pathname !== "/" && !pathname.includes("evaluation") && (
            <SearchBar />
          )}
        </div>
        <div className="justify-self-end">
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                showFallback
                src={!isError ? data?.url : ""}
                className="cursor-pointer"
              />
            </DropdownTrigger>
            {!isError ? (
              <DropdownMenu aria-label="Dropdown Actions">
                <DropdownItem key="my-page" href="/my-page">
                  마이페이지
                </DropdownItem>
                <DropdownItem
                  key="evaluation"
                  href="/evaluation/select-restaurant"
                >
                  평가
                </DropdownItem>
                <DropdownItem key="recommendations" href="/recommendations">
                  추천
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  onClick={() => {
                    setToken(null);
                    dispatch(
                      userApi.util.invalidateTags([{ type: "Profile" }])
                    );
                  }}
                >
                  로그아웃
                </DropdownItem>
              </DropdownMenu>
            ) : (
              <DropdownMenu aria-label="Dropdown Actions">
                <DropdownItem key="login" onClick={onOpen}>
                  로그인
                </DropdownItem>
              </DropdownMenu>
            )}
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
