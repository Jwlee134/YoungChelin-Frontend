import { create } from "zustand";

interface IntersectionState {
  isIntersecting: boolean;
  setIsIntersecting: (v: boolean) => void;
}

const useIntersectionStore = create<IntersectionState>()((set) => ({
  isIntersecting: true,
  setIsIntersecting(v) {
    set(() => ({ isIntersecting: v }));
  },
}));

export default useIntersectionStore;
