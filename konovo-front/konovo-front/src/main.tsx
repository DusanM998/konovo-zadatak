import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./container/App.tsx";
import { ToastContainer } from "react-toastify";
import "./index.css";
import { Provider } from "react-redux";
import store from "./storage/redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
