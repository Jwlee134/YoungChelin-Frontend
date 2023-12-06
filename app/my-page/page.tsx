"use client";

import MyPageCard from "@/components/MyPageCard";
import ChangePasswordModal from "@/components/modals/ChangePasswordModal";
import EditProfilePictureModal from "@/components/modals/EditProfilePictureModal";
import QuitModal from "@/components/modals/QuitModal";
import useLoginRequired from "@/hooks/useLoginRequired";
import { userApi } from "@/libs/redux/api/userApi";
import { Avatar, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function MyPage() {
  useLoginRequired();

  const {
    isOpen: isEditProfilePictureOpen,
    onOpen: onEditProfilePictureOpen,
    onOpenChange: onEditProfilePictureOpenChange,
  } = useDisclosure();
  const {
    isOpen: isChangePasswordOpen,
    onOpen: onChangePasswordOpen,
    onOpenChange: onChangePasswordOpenChange,
  } = useDisclosure();
  const {
    isOpen: isQuitOpen,
    onOpen: onQuitOpen,
    onOpenChange: onQuitOpenChange,
  } = useDisclosure();
  const router = useRouter();
  const { data, isError } = userApi.useGetMeQuery();

  return (
    <div className="pt-20 px-6">
      <div className="flex items-center">
        <Avatar className="w-40 h-40" src={isError ? "" : data?.url} />
        <div className="pl-10 text-4xl">
          안녕하세요,
          <br />
          미식이님.
        </div>
      </div>
      <div className="pt-20">
        <div className="text-2xl text-gray-500">내 활동</div>
        <div className="flex gap-4 py-6">
          <MyPageCard
            label="맛식 Top 10"
            onPress={() => router.push("/top-ten")}
          />
          <MyPageCard
            label="평가 내역"
            onPress={() => router.push("/evaluation-history")}
          />
        </div>
        <div className="text-2xl text-gray-500">프로필 관리</div>
        <div className="flex gap-4 py-6 flex-wrap">
          <MyPageCard
            label="프로필 사진 수정"
            onPress={onEditProfilePictureOpen}
          />
          <MyPageCard label="비밀번호 변경" onPress={onChangePasswordOpen} />
          <MyPageCard label="회원 탈퇴" onPress={onQuitOpen} />
          <EditProfilePictureModal
            isOpen={isEditProfilePictureOpen}
            onOpenChange={onEditProfilePictureOpenChange}
            onClose={onEditProfilePictureOpenChange}
          />
          <ChangePasswordModal
            isOpen={isChangePasswordOpen}
            onOpenChange={onChangePasswordOpenChange}
            onClose={onChangePasswordOpenChange}
          />
          <QuitModal
            isOpen={isQuitOpen}
            onOpenChange={onQuitOpenChange}
            onClose={onQuitOpenChange}
          />
        </div>
      </div>
    </div>
  );
}
