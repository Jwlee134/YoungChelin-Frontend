import { Document } from "@/app/api/keyword/route";
import { create } from "zustand";

export enum EvaluationSteps {
  RESTAURANT = "/evaluation/select-restaurant",
  MENU = "/evaluation/select-menu",
  EVALUATE = "/evaluation/evaluate",
}

export enum EvaluationItems {
  FLAVOR = "flavor",
  MOOD = "mood",
  PRICE = "price",
  CLEANLINESS = "cleanliness",
  PLATING = "plating",
  SERVICE = "service",
}

interface MapState {
  lat: number;
  lng: number;
  level: number;
}

interface RestaurantState {
  id: number;
  name: string;
  addr: string;
  x: number;
  y: number;
}

interface EvaluationItemState {
  mode: EvaluationItems | null;
  id: number;
  name: string;
  flavor: number | null;
  mood: number[];
  price: number | null;
  cleanliness: number | null;
  plating: number | null;
  service: number | null;
  file: { file: File; url: string } | null;
}

interface EvaluationState {
  data: Document[] | null;
  setData: (d: Document[] | null) => void;
  restaurant: RestaurantState;
  setRestaurant: (s: RestaurantState) => void;
  map: MapState;
  setMap: (s: MapState) => void;
  keyword: string;
  setKeyword: (v: string) => void;
  evaluationItems: EvaluationItemState[];
  manageDishes: (id: number, name: string) => void;
  manageEvaluationMode: (id: number, v: EvaluationItems | null) => void;
  evaluateDish: (
    dishId: number,
    v: number | null,
    type: EvaluationItems
  ) => void;
  uploadPhoto: (id: number, data: { file: File; url: string } | null) => void;
  evaluationCursor: number;
  setEvaluationCursor: (n: number) => void;
}

const useEvaluationStore = create<EvaluationState>()((set) => ({
  restaurant: { id: 0, name: "", addr: "", x: 0, y: 0 },
  setRestaurant: (s) => set({ restaurant: s }),
  data: null,
  setData: (d) => set({ data: d }),
  map: { lat: 35.836348, lng: 128.752962, level: 4 },
  setMap: (s) => set({ map: s }),
  keyword: "",
  setKeyword: (v: string) => set({ keyword: v }),
  evaluationItems: [],
  /* 메뉴 추가 및 삭제하는 메소드 */
  manageDishes: (id, name) =>
    set((state) => {
      const copy = [...state.evaluationItems];
      const idx = copy.findIndex((item) => item.id === id);
      if (idx === -1) {
        copy.push({
          mode: null,
          id,
          name,
          flavor: null,
          mood: [],
          cleanliness: null,
          plating: null,
          price: null,
          service: null,
          file: null,
        });
      } else {
        copy.splice(idx, 1);
      }
      return { evaluationItems: copy };
    }),
  manageEvaluationMode: (dishId, v) =>
    set((state) => {
      const copy = [...state.evaluationItems];
      const idx = copy.findIndex((item) => item.id === dishId);
      const obj = { ...copy[idx] };
      obj.mode = v;
      copy[idx] = obj;
      return { evaluationItems: copy };
    }),
  evaluateDish: (dishId, v, type) =>
    set((state) => {
      const copy = [...state.evaluationItems];
      const idx = copy.findIndex((item) => item.id === dishId);
      const obj = { ...copy[idx] };

      if (Array.isArray(obj[type]) && v !== null) {
        // 분위기 항목
        if ((obj[type] as number[]).includes(v))
          (obj[type] as number[]) = (obj[type] as number[]).filter(
            (item) => item !== v
          );
        else (obj[type] as number[]).push(v);
      } else {
        // 나머지 항목
        if (obj[type] === v) (obj[type] as number | null) = null;
        else (obj[type] as number | null) = v;
      }
      copy[idx] = obj;

      return { evaluationItems: copy };
    }),
  uploadPhoto: (dishId, data) =>
    set((state) => {
      const copy = [...state.evaluationItems];
      const idx = copy.findIndex((item) => item.id === dishId);
      const obj = { ...copy[idx] };
      obj.file = data;
      copy[idx] = obj;
      return { evaluationItems: copy };
    }),
  evaluationCursor: 0,
  setEvaluationCursor: (n) => set({ evaluationCursor: n }),
}));

export default useEvaluationStore;
