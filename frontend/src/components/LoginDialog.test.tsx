import { renderWithRedux, mockStore } from "../utils/test-utils";
import { screen } from "@testing-library/react";
import LoginDialog from "./LoginDialog";

test("Login dialog is shown", async () => {
  let store = mockStore({});
  renderWithRedux(<LoginDialog open={true} handleClose={jest.fn()} />, store);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("loginButton")).toBeInTheDocument();
});
