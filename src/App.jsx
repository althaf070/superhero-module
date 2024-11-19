import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Grievences from "./pages/Grievences"
import Navbar from "./components/Navbar"
import { SidebarTrigger } from "./components/ui/sidebar"
import Users from "./pages/Users"
import LoginPage from "./pages/Login"
import { useState } from "react"
import { SearchProvider } from "./context/useSearch"


const App = () => {
  const [searchQuery, setSearchQuery] = useState(""); 

  const handleSearch = (query) => {
    setSearchQuery(query)
  };
  return (
    <div className="w-full flex flex-col h-full">
      <SearchProvider>    
        <Navbar handleSearch={handleSearch}/>
      <SidebarTrigger />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/grievences" element={<Grievences searchQuery={searchQuery}/>}/>
      <Route path="/users" element={<Users/>}/>
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
    </SearchProvider>

    </div>
  )
}

export default App