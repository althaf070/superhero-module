import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SidebarProvider
 } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { BrowserRouter,useLocation } from "react-router-dom";
const AppWrapper = () => {
  const location = useLocation();
  const showSideBar = location.pathname !== "/login"; 

  return (
    <>
      {showSideBar && <AppSidebar />} 
      <App />
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider>
       <AppWrapper/> 
      </SidebarProvider>
      </BrowserRouter>
  </StrictMode>
);