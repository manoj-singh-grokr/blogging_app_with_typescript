import { renderWithRedux, mockStore } from "../utils/test-utils";
import { screen } from "@testing-library/react";
import Footer from "./Footer";

test("footer is shown", async () => {
  let store = mockStore({});
  renderWithRedux(<Footer />, store);
  expect(screen.getByText("©Blog it")).toBeInTheDocument();
});
