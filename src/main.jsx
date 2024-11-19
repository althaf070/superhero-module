import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SidebarProvider
 } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <AppSidebar />
      
        <App />
      </SidebarProvider>
      </BrowserRouter>
  </StrictMode>
);
