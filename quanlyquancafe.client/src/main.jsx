import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NDaF1cXmhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEFiWH1acXRVT2VYWU12WA=="
);
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
import { store } from "./store";
import { Provider } from "react-redux";

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
