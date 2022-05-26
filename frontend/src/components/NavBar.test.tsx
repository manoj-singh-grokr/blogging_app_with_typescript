import Navbar from "./NavBar";
import { act, fireEvent, screen } from "@testing-library/react";
import { mockStore, renderWithRedux } from "../utils/test-utils";

describe("Navbar", () => {
  test("shows blogs and logout when logged in", async () => {
    let store = mockStore({
      user: {
        userInfo: [{ firstName: "Manoj", lastName: "Singh" }],
        status: "fulfilled",
        error: "",
      },
    });
    renderWithRedux(<Navbar />, store);
    expect(screen.getAllByText(/blogs/i)).toHaveLength(2);
    expect(screen.getAllByText(/Logout/i)).toHaveLength(2);
  });

  test("blogs button redirects to /blogs", () => {
    let store = mockStore({
      user: {
        userInfo: [{ id: "2", firstName: "Manoj", lastName: "Singh" }],
        status: "fulfilled",
        error: "",
      },
      blogs: {
        blogs: [],
      },
    });
    renderWithRedux(<Navbar />, store);

    fireEvent.click(screen.getByRole("blogsButton"));
    expect(screen.getByText("Blogs Page"));
  });

  test("logout button logs the user out and redirects to homepage", () => {
    let store = mockStore({
      user: {
        userInfo: [{ id: "2", firstName: "Manoj", lastName: "Singh" }],
        status: "fulfilled",
        error: "",
      },
      blogs: {
        blogs: [],
      },
    });
    renderWithRedux(<Navbar />, store);

    fireEvent.click(screen.getByRole("logoutButton"));
  });

  test("login button opens the login dialog", () => {
    let store = mockStore({
      user: {
        userInfo: {},
        status: "",
        error: "",
      },
      blogs: {
        blogs: [],
      },
    });
    renderWithRedux(<Navbar />, store);
    fireEvent.click(screen.getByRole("loginButton"));
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test("register button opens the register dialog", () => {
    let store = mockStore({
      user: {
        userInfo: {},
        status: "",
        error: "",
      },
      blogs: {
        blogs: [],
      },
    });
    renderWithRedux(<Navbar />, store);
    fireEvent.click(screen.getByRole("registerButton"));
    expect(screen.getByLabelText(/^first name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^last name$/i)).toBeInTheDocument();
  });

  test("shows login and signup when not logged in", () => {
    let store = mockStore({ user: { userInfo: {}, status: "", error: "" } });
    renderWithRedux(<Navbar />, store);
    expect(screen.getAllByText(/login/i)).toHaveLength(2);
    expect(screen.getAllByText(/SIGN UP/i)).toHaveLength(2);
  });
});
