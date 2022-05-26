import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  "/users/fetchUser",
  async (values: { email: string; password: string }) => {
    const { email, password } = values;
    const { data } = await axios.get(
      "/users?email=" + email + "&password=" + password
    );
    return data;
  }
);

export const registerUser = createAsyncThunk(
  "/users/registerUser",
  async (values: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    const userValues = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
    };
    await axios.post("/users", userValues);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { userInfo: {}, status: "", error: "" },
  reducers: {
    logout(state: any) {
      state.user.userInfo = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.userInfo = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
