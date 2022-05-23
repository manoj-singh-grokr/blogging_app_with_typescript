import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type State = {
  blogs: Array<Object>;
  status: string | null;
  error: string | undefined;
};

const initialState: State = {
  blogs: [],
  status: "idle",
  error: "",
};

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (values: { id: string }) => {
    const response = await axios.get("/blogs");
    const data = await response.data;
    const userBlogs = data.filter((item: any) => item.userId === values.id);
    return userBlogs;
  }
);

export const addBlog = createAsyncThunk(
  "blogs/addBlog",
  async (values: { userId: string; title: string; content: string }) => {
    await axios.post("/blogs", values);
  }
);

const postsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    resetBlogs(state: any) {
      state.blogs.blogs = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetBlogs } = postsSlice.actions;

export default postsSlice.reducer;
