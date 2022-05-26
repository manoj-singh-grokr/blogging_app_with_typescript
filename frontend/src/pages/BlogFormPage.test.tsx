import { screen } from "@testing-library/react";
import { mockStore, renderWithRedux } from "../utils/test-utils";
import BlogFormPage from "./BlogFormPage";

test("redirected to home page if user is not logged in", () => {
  const store = mockStore({
    user: {
      userInfo: [],
      status: "",
      error: "",
    },
    blogs: { blogs: [] },
  });
  renderWithRedux(<BlogFormPage />, store);
  expect(screen.getByText("Home Page")).toBeInTheDocument();
});
