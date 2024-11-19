
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { SidebarTrigger } from './ui/sidebar'

const AuthenticatedLayout = () => {
  return (
    <>
        <Navbar/>
        <SidebarTrigger/>
        <Outlet/>
        
    </>
  )
}

export default AuthenticatedLayout