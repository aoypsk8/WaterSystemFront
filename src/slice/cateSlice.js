import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cate: [],
  loadding: false,
  error: null,
};

const cateSlice = createSlice({
  name: "cate",
  initialState,
  reducers: {
    addCate: (state, action) => {
      state.cate = action.payload;
    },
  },
});

export const { addCate } = cateSlice.actions;
export default cateSlice.reducer;