import store from "../store";
import { fetchBlogs } from "./blogsSlice";
import blogsReducer from "./blogsSlice";

const initialState = { blogs: [], status: "", error: "" };
describe("blogs redux state tests", () => {
  it("Should initially set blogs to an empty array", () => {
    const state = store.getState().blogs;
    expect(state.blogs).toEqual([]);
  });

  it("should set blogs to the received blogs", async () => {
    const action = {
      type: fetchBlogs.fulfilled.type,
      payload: [
        {
          userId: "2",
          id: "1",
          title: "Neque porro quisquam est qui dolorem ipsum quia",
          content:
            "Lore ate volutpa massa vel nulla. Etiam ante arcu, tempus quis nisl vel, tempor fringilla enim.",
        },
      ],
    };
    const state = blogsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: "succeeded",
      blogs: [
        {
          userId: "2",
          id: "1",
          title: "Neque porro quisquam est qui dolorem ipsum quia",
          content:
            "Lore ate volutpa massa vel nulla. Etiam ante arcu, tempus quis nisl vel, tempor fringilla enim.",
        },
      ],
    });
  });

  it("should set blogs to an empty array", async () => {
    const action = {
      type: "blogs/resetBlogs",
    };
    const state = blogsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: "idle",
      blogs: [],
    });
  });
});
