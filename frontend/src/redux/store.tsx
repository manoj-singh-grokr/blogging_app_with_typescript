import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./slices/userSlice";
import blogsSlice from "./slices/blogsSlice";

const store = configureStore({
  reducer: { user: usersSlice, blogs: blogsSlice },
});

export type AppDispatch = typeof store.dispatch;

export default store;
