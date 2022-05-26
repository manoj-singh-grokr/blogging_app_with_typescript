import { renderWithRedux, mockStore } from "../utils/test-utils";
import { act, fireEvent, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("Blog form is shown", async () => {
  let store = mockStore({
    user: { userInfo: {} },
  });
  renderWithRedux(<BlogForm />, store);
  expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
  expect(screen.getByRole(/blogsubmitbutton/i)).toBeInTheDocument();
});

test("errors are displayed when form is empty", async () => {
  let store = mockStore({
    user: { userInfo: {} },
  });
  renderWithRedux(<BlogForm />, store);
  await act(async () => {
    fireEvent.click(screen.getByRole(/blogsubmitbutton/i));
  });
  expect(screen.getByText("title is required!")).toBeInTheDocument();
  expect(screen.getByText("content is required!")).toBeInTheDocument();
});

test("redirected to blogs page when submitting the form", async () => {
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
    blogs: {
      blogs: [
        {
          userId: "1",
          id: "1",
          title: "Whatever",
          content: "Test content",
        },
      ],
    },
  });
  renderWithRedux(<BlogForm />, store);

  await act(async () => {
    const button = screen.getByRole("blogSubmitButton");
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/title/i), {
        target: { value: "Whatever" },
      });
      fireEvent.change(screen.getByLabelText(/content/i), {
        target: { value: "cool text" },
      });
      fireEvent.click(button);
    });
  });
  expect(screen.getByText("Whatever")).toBeInTheDocument();
  expect(screen.getByText("Test content")).toBeInTheDocument();
});
