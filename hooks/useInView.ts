import { useEffect, useRef } from "react";

interface UseInViewArgs {
  callback: (inInView: boolean) => void;
}

export default function useInView({ callback }: UseInViewArgs) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let observerRefValue: HTMLDivElement | null = null;

    const observer = new IntersectionObserver(([entry]) => {
      callback(entry.isIntersecting);
    });
    observer.observe(ref.current);
    observerRefValue = ref.current;

    return () => {
      if (observerRefValue) observer.unobserve(observerRefValue);
    };
  }, [callback]);

  return { ref };
}
