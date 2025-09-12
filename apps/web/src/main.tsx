import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/app";
import "./index.css";
import { Provider } from "react-redux";
import store from "@/storage/store";
import { TRPCProvider } from "@/lib/trpc/trpc-provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TRPCProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </TRPCProvider>
  </React.StrictMode>
);
