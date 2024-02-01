import { combineReducers } from "@reduxjs/toolkit";
import  userReducer  from "./userSlice";
import  productReducer  from "./productSlice";
import  productEditReducer  from "./productEditSlice";
import  cateReducer  from "./cateSlice";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  cate: cateReducer,
  productedit: productEditReducer,
});

export default rootReducer;