import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Web3ModalProvider } from "./components/Layout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Web3ModalProvider>
      <App />
    </Web3ModalProvider>
  </StrictMode>
);
