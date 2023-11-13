import { create } from "zustand";

interface IsIntersectingStore {
  isIntersecting: boolean;
  setIsIntersecting: (v: boolean) => void;
}

const useIsIntersecting = create<IsIntersectingStore>()((set) => ({
  isIntersecting: true,
  setIsIntersecting(v) {
    set(() => ({ isIntersecting: v }));
  },
}));

export default useIsIntersecting;
