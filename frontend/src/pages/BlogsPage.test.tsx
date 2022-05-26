import { mockStore, renderWithRedux } from "../utils/test-utils";
import { screen } from "@testing-library/react";
import Blogspage from "./Blogspage";

test("Blogs are shown when user is logged in", async () => {
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
          userId: "2",
          id: "1",
          title: "Neque porro quisquam est qui dolorem ipsum quia",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis massa maximus, molestie neque eleifend, tristique lorem. Vestibulum nec orci sagittis, placerat eros non, vehicula metus. Suspendisse blandit augue id ipsum malesuada auctor. Suspendisse vel pretium enim. Suspendisse iaculis elementum leo in ullamcorper. Morbi egestas sapien ultricies justo finibus, eu vulputate urna commodo. Aenean eu dictum risus, sit amet vulputate massa. Maecenas sagittis varius mauris, ut faucibus tortor volutpat ut. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur congue gravida nibh, ac facilisis dui lacinia ac. Fusce mi nibh, tempus at laoreet id, faucibus non ligula. Maecenas tellus massa, vestibulum sit amet ex vel, tristique efficitur justo. Curabitur ex odio, tristique ac ligula in, commodo volutpat mauris. Nam rutrum, sapien nec eleifend fermentum, ligula nibh vulputate sapien, nec lobortis quam massa vel nulla. Etiam ante arcu, tempus quis nisl vel, tempor fringilla enim.",
        },
        {
          userId: "1",
          id: "2",
          title: "random title",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis massa maximus, molestie neque eleifend, tristique lorem. Vestibulum nec orci sagittis, placerat eros non, vehicula metus. Suspendisse blandit augue id ipsum malesuada auctor. Suspendisse vel pretium enim. Suspendisse iaculis elementum leo in ullamcorper. Morbi egestas sapien ultricies justo finibus, eu vulputate urna commodo. Aenean eu dictum risus, sit amet vulputate massa. Maecenas sagittis varius mauris, ut faucibus tortor volutpat ut. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur congue gravida nibh, ac facilisis dui lacinia ac. Fusce mi nibh, tempus at laoreet id, faucibus non ligula. Maecenas tellus massa, vestibulum sit amet ex vel, tristique efficitur justo. Curabitur ex odio, tristique ac ligula in, commodo volutpat mauris. Nam rutrum, sapien nec eleifend fermentum, ligula nibh vulputate sapien, nec lobortis quam massa vel nulla. Etiam ante arcu, tempus quis nisl vel, tempor fringilla enim.",
        },
      ],
      status: "fulfilled",
      error: "",
    },
  });
  renderWithRedux(<Blogspage />, store);
  expect(
    screen.getByText("Neque porro quisquam est qui dolorem ipsum quia")
  ).toBeInTheDocument();
  expect(screen.getByText("random title")).toBeInTheDocument();
});

test("redirected to home page if user is not logged in", () => {
  const store = mockStore({
    user: {
      userInfo: [],
      status: "",
      error: "",
    },
    blogs: { blogs: [] },
  });
  renderWithRedux(<Blogspage />, store);
  expect(screen.getByText("Home Page")).toBeInTheDocument();
});
