import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Grievences from "./pages/Grievences";
import Users from "./pages/Users";
import LoginPage from "./pages/Login";
import { useState } from "react";
import { SearchProvider } from "./context/useSearch";
import AuthenticatedLayout from "./components/AuthenticatedLayout";


const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="w-full flex flex-col h-full">
      <SearchProvider>
       
        <Routes>

          <Route element={<AuthenticatedLayout handleSearch={handleSearch} />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/grievences"
              element={<Grievences searchQuery={searchQuery} />}
            />
            <Route path="/users" element={<Users />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </SearchProvider>
    </div>
  );
};

export default App;
