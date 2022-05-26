import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { mockStore, renderWithRedux } from "./utils/test-utils";

test("Entire page is shown", () => {
  const store = mockStore({
    user: {
      userInfo: [],
      status: "",
      error: "",
    },
  });
  renderWithRedux(<App />, store);
  const linkElement = screen.getByText("©Blog it");
  expect(linkElement).toBeInTheDocument();
});
