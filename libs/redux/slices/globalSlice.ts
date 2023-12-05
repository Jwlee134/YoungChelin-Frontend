import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GlobalState {
  isHomeLogoIntersecting: boolean;
}

const initialState: GlobalState = {
  isHomeLogoIntersecting: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsHomeLogoIntersecting: (state, { payload }: PayloadAction<boolean>) => {
      state.isHomeLogoIntersecting = payload;
    },
  },
});

export const globalActions = { ...globalSlice.actions };

export default globalSlice.reducer;
