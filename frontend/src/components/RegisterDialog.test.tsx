import { renderWithRedux, mockStore } from "../utils/test-utils";
import { screen } from "@testing-library/react";
import RegisterDialog from "./RegisterDialog";

const labels = [
  "First Name",
  "Last Name",
  /email/i,
  "Password",
  "Confirm Password",
];

test("Register dialog is shown", async () => {
  let store = mockStore({});
  renderWithRedux(
    <RegisterDialog open={true} handleClose={jest.fn()} />,
    store
  );
  labels.forEach((label) => {
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });
  expect(screen.getByRole("registerButton")).toBeInTheDocument();
});

describe