import { Document } from "@/app/api/keyword/route";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
  flavor: string | null;
  mood: string[];
  price: string | null;
  cleanliness: string | null;
  plating: string | null;
  service: string | null;
  fileUrl: string | null;
}

interface EvaluationState {
  addressData: Document[] | null;
  restaurant: RestaurantState;
  map: MapState;
  addressKeyword: string;
  evaluationItems: EvaluationItemState[];
  evaluationCursor: number;
}

const initialState: EvaluationState = {
  map: { lat: 35.836348, lng: 128.752962, level: 4 },
  addressData: null,
  addressKeyword: "",
  restaurant: { id: 0, name: "", addr: "", x: 0, y: 0 },
  evaluationItems: [],
  evaluationCursor: 0,
};

export const evaluationSlice = createSlice({
  name: "evaluation",
  initialState,
  reducers: {
    setMap: (state, { payload }: PayloadAction<MapState>) => {
      state.map = payload;
    },
    setAddressData: (state, { payload }: PayloadAction<Document[] | null>) => {
      state.addressData = payload;
    },
    setAddressKeyword: (state, { payload }: PayloadAction<string>) => {
      state.addressKeyword = payload;
    },
    setRestaurant: (state, { payload }: PayloadAction<RestaurantState>) => {
      state.restaurant = payload;
    },
    /* 메뉴 추가 및 삭제하는 메소드 */
    manageDishes: (
      state,
      { payload: { id, name } }: PayloadAction<{ id: number; name: string }>
    ) => {
      const idx = state.evaluationItems.findIndex((item) => item.id === id);
      if (idx === -1) {
        state.evaluationItems.push({
          mode: null,
          id,
          name,
          flavor: null,
          mood: [],
          cleanliness: null,
          plating: null,
          price: null,
          service: null,
          fileUrl: null,
        });
      } else {
        state.evaluationItems.splice(idx, 1);
      }
    },
    manageEvaluationMode: (
      state,
      {
        payload: { dishId, v },
      }: PayloadAction<{ dishId: number; v: EvaluationItems | null }>
    ) => {
      const idx = state.evaluationItems.findIndex((item) => item.id === dishId);
      state.evaluationItems[idx].mode = v;
    },
    evaluateDish: (
      state,
      {
        payload: { dishId, v, type },
      }: PayloadAction<{
        dishId: number;
        v: string | null;
        type: EvaluationItems;
      }>
    ) => {
      const idx = state.evaluationItems.findIndex((item) => item.id === dishId);
      if (Array.isArray(state.evaluationItems[idx][type]) && v !== null) {
        // 분위기 항목
        if ((state.evaluationItems[idx][type] as string[]).includes(v)) {
          (state.evaluationItems[idx][type] as string[]) = (
            state.evaluationItems[idx][type] as string[]
          ).filter((item) => item !== v);
        } else {
          (state.evaluationItems[idx][type] as string[]).push(v);
        }
      } else {
        // 나머지 항목
        if (state.evaluationItems[idx][type] === v)
          (state.evaluationItems[idx][type] as string | null) = null;
        else (state.evaluationItems[idx][type] as string | null) = v;
      }
    },
    uploadPhoto: (
      state,
      {
        payload: { dishId, data },
      }: PayloadAction<{
        dishId: number;
        data: string | null;
      }>
    ) => {
      const idx = state.evaluationItems.findIndex((item) => item.id === dishId);
      state.evaluationItems[idx].fileUrl = data;
    },
    setEvaluationCursor: (state, { payload }: PayloadAction<number>) => {
      state.evaluationCursor = payload;
    },
  },
});

export const evaluationActions = { ...evaluationSlice.actions };

export default evaluationSlice.reducer;
