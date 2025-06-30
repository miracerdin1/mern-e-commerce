import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import store from "@/store/store.ts";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/toaster.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster duration={5000} />
    </Provider>
  </BrowserRouter>,
);
