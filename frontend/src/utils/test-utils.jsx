import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

export const mockStore = configureStore([thunk]);

export const renderWithRedux = (component, store) => {
  return render(
    <BrowserRouter>
      <Provider store={store}>{component}</Provider>
    </BrowserRouter>
  );
};
