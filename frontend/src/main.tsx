import { ConfigProvider } from "antd";
import "normalize.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.tsx";
import "./index.css";
import { purple } from "@ant-design/colors";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              headerBg: "white",
              headerColor: "black",
            },
          },
          token: {
            // Seed Token
            colorPrimary: purple[5],
          },
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
