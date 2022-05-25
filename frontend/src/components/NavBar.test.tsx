import Navbar from "./NavBar";
import { screen } from "@testing-library/react";
import { mockStore, renderWithRedux } from "../utils/test-utils";
import reducer, { fetchUser } from "../slices/userSlice";

test("Navbar shows blogs and logout when logged in", async () => {
  let store = mockStore({
    user: {
      userInfo: [{ firstName: "Manoj", lastName: "Singh" }],
      status: "fulfilled",
      error: "",
    },
  });
  renderWithRedux(<Navbar />, store);
  screen.debug();
  expect(screen.getAllByText(/blogs/i)).toHaveLength(2);
  expect(screen.getAllByText(/Logout/i)).toHaveLength(2);
});

test("Navbar shows login and signup when not logged in", () => {
  let store = mockStore({ user: { userInfo: {}, status: "", error: "" } });
  renderWithRedux(<Navbar />, store);

  expect(screen.getAllByText(/login/i)).toHaveLength(2);
  expect(screen.getAllByText(/SIGN UP/i)).toHaveLength(1);
});
