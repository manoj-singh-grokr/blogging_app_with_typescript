import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import BlogForm from "../components/BlogForm";

const BlogsPage = () => {
  return <div>Blogs Page</div>;
};

const HomePage = () => {
  return <div>Home Page</div>;
};

export const mockStore = configureStore([thunk]);

export const renderWithRedux = (component, store) => {
  return render(
    <BrowserRouter>
      <Provider store={store}>
        {component}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/write" element={<BlogForm />} />
          <Route path="/blogs" element={<BlogsPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};
