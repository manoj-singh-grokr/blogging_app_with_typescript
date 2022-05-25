import { renderWithRedux, mockStore } from "../utils/test-utils";
import { screen } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("Blog form is shown", async () => {
  let store = mockStore({});
  renderWithRedux(<BlogForm />, store);
  expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
  expect(screen.getByRole(/blogsubmitbutton/i)).toBeInTheDocument();
});
