import { mockStore, renderWithRedux } from "../utils/test-utils";
import { act, fireEvent, screen } from "@testing-library/react";
import HomePage from "./HomePage";

test("HomePage intro is shown", () => {
  const store = mockStore({
    user: {
      userInfo: [],
      status: "",
      error: "",
    },
  });
  renderWithRedux(<HomePage />, store);
  expect(
    screen.getByText(/Blog thoughts and mysteries of your personal life/i)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Create your own personal thought catalog/i)
  ).toBeInTheDocument();
});

test("Login dialog opens up when user is not logged in on clicking create blog button", () => {
  const store = mockStore({
    user: {
      userInfo: [],
      status: "",
      error: "",
    },
  });
  renderWithRedux(<HomePage />, store);
  const button = screen.getByRole("createBlogButton");
  fireEvent.click(button);
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});

test("redirected to blogs page when logged in on clicking create blog button", async () => {
  const store = mockStore({
    user: {
      userInfo: [
        {
          id: "1",
          firstName: "Test",
          lastName: "User",
          email: "test@gmail.com",
        },
      ],
      status: "",
      error: "",
    },
  });
  renderWithRedux(<HomePage />, store);

  await act(async () => {
    const button = screen.getByRole("createBlogButton");
    fireEvent.click(button);
  });
  expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
});
