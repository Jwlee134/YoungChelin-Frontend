import { userApi } from "@/libs/redux/api/userApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useLoginRequired() {
  const router = useRouter();
  const { isError } = userApi.useGetMeQuery();

  useEffect(() => {
    if (!isError) return;
    alert("로그인이 필요한 서비스입니다.");
    router.push("/");
  }, [isError, router]);
}
