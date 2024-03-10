import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import profileSlice from "./Slices/profileSlice";
import cartSlice from "./Slices/cartSlice";
import courseSlice from "./Slices/courseSlice";
export default configureStore({
    reducer:{
        auth:authSlice,
        profile:profileSlice,
        cart:cartSlice,
        course:courseSlice
    }
})