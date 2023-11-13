"use client";

import useIsIntersecting from "@/hooks/useIsIntersecting";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function HomeLogo() {
  const ref = useRef<HTMLAnchorElement>(null);
  const setIsIntersecting = useIsIntersecting(
    (state) => state.setIsIntersecting
  );

  useEffect(() => {
    let observerRefValue: HTMLAnchorElement | null = null;
    const observer = new IntersectionObserver(
      ([e]) => {
        setIsIntersecting(e.isIntersecting);
      },
      { rootMargin: "20px 0px 0px 0px" }
    );
    if (ref.current) {
      observer.observe(ref.current);
      observerRefValue = ref.current;
    }
    return () => {
      if (observerRefValue) observer.unobserve(observerRefValue);
    };
  }, [setIsIntersecting]);

  return (
    <Link ref={ref} href={"/"}>
      <Image src="/images/logo.png" alt="logo" width={256} height={111} />
    </Link>
  );
}
