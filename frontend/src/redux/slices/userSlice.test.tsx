import store from "../store";
import { fetchUser } from "./userSlice";
import userReducer from "./userSlice";

const initialState = { userInfo: [], status: "", error: "" };
describe("user redux state tests", () => {
  it("Should initially set user to an empty array", () => {
    const state = store.getState().user;
    expect(state.userInfo).toEqual([]);
  });

  it("should set user to the received userInfo", async () => {
    const action = {
      type: fetchUser.fulfilled.type,
      payload: [{ firstname: "test", lastName: "user" }],
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: "fulfilled",
      userInfo: [{ firstname: "test", lastName: "user" }],
    });
  });

  it("should set userInfo empty", async () => {
    const action = {
      type: "user/logout",
      payload: [],
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: "idle",
      userInfo: {},
    });
  });
});
