"use client";

import { globalActions } from "@/libs/redux/slices/globalSlice";
import { useDispatch } from "@/libs/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function HomeLogo() {
  const ref = useRef<HTMLAnchorElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let observerRefValue: HTMLAnchorElement | null = null;
    const observer = new IntersectionObserver(
      ([e]) => {
        dispatch(globalActions.setIsHomeLogoIntersecting(e.isIntersecting));
      },
      { rootMargin: "28px 0px 0px 0px" }
    );
    if (ref.current) {
      observer.observe(ref.current);
      observerRefValue = ref.current;
    }
    return () => {
      if (observerRefValue) observer.unobserve(observerRefValue);
    };
  }, [dispatch]);

  return (
    <Link ref={ref} href={"/"}>
      <Image src="/images/logo.png" alt="logo" width={256} height={111} />
    </Link>
  );
}
