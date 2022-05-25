import { renderWithRedux, mockStore } from "../utils/test-utils";
import { screen } from "@testing-library/react";
import Blogs from "./Blogs";

test("Blog is shown", async () => {
  let store = mockStore({});
  renderWithRedux(
    <Blogs  title="testing" content="fdksjf djfadf sdfj lsfj lkjflk jalk" />,
    store
  );
  expect(screen.getByText("testing")).toBeInTheDocument();
  expect(
    screen.getByText("fdksjf djfadf sdfj lsfj lkjflk jalk")
  ).toBeInTheDocument();
});
