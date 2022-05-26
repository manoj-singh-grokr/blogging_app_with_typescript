import { renderWithRedux, mockStore } from "../utils/test-utils";
import { act, fireEvent, screen } from "@testing-library/react";
import RegisterDialog from "./RegisterDialog";
import { ErrorSharp } from "@mui/icons-material";

const labels = [
  "First Name",
  "Last Name",
  /email/i,
  "Password",
  "Confirm Password",
];

const errors = [
  /first name is required!/i,
  /last name is required!/i,
  /email is required!/i,
  /password is required!/i,
  /please confirm your password!/i,
];

describe("register", () => {
  let store = mockStore({});
  renderWithRedux(
    <RegisterDialog open={true} handleClose={jest.fn()} />,
    store
  );

  test("dialog is shown", () => {
    labels.forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
    expect(screen.getByRole("registerButton")).toBeInTheDocument();
  });

  test("form errors are shown", async () => {
    let store = mockStore({});
    renderWithRedux(
      <RegisterDialog open={true} handleClose={jest.fn()} />,
      store
    );
    await act(async () => {
      fireEvent.click(screen.getByRole("registerButton"));
    });
    errors.forEach((error) => {
      expect(screen.getByText(error)).toBeInTheDocument();
    });
  });

  test("form is submitted when no errors", async () => {
    let store = mockStore({});
    renderWithRedux(
      <RegisterDialog open={true} handleClose={jest.fn()} />,
      store
    );
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/first name/i), {
        target: { value: "user" },
      });
      fireEvent.change(screen.getByLabelText(/last name/i), {
        target: { value: "test" },
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "user123@email.com" },
      });
      fireEvent.change(screen.getByLabelText(/^password$/i), {
        target: { value: "password" },
      });
      fireEvent.change(screen.getByLabelText(/^confirm password$/i), {
        target: { value: "password" },
      });
      fireEvent.click(screen.getByRole("registerButton"));
    });
  });
});
