import { renderWithRedux, mockStore } from "../utils/test-utils";
import { act, fireEvent, screen } from "@testing-library/react";
import LoginDialog from "./LoginDialog";

describe("login", () => {
  test("dialog is shown", () => {
    let store = mockStore({});
    renderWithRedux(<LoginDialog open={true} handleClose={jest.fn()} />, store);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("loginButton")).toBeInTheDocument();
  });

  test("form errors are shown", async () => {
    let store = mockStore({});
    renderWithRedux(<LoginDialog open={true} handleClose={jest.fn()} />, store);
    await act(async () => {
      fireEvent.click(screen.getByRole("loginButton"));
    });
    expect(screen.getByText(/email is required!/i));
    expect(screen.getByText(/password is required!/i));
  });

  test("form is submitted when no errors", async () => {
    let store = mockStore({});
    renderWithRedux(<LoginDialog open={true} handleClose={jest.fn()} />, store);
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "user123" },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: "password" },
      });
      fireEvent.click(screen.getByRole("loginButton"));
    });
  });
});
