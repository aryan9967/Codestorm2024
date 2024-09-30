import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChatbotProvider } from "./context/ChatbotContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SearchProvider>
      <BrowserRouter>
        <ChatbotProvider>
          <App />
        </ChatbotProvider>
      </BrowserRouter>
    </SearchProvider>
  </StrictMode>
);
