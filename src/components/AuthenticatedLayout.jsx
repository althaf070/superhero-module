
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { SidebarTrigger } from './ui/sidebar'
import { useAuthStore } from '@/store/useAuthStore'
import { useEffect } from 'react'

const AuthenticatedLayout = () => {
  const {isAuthenticated,checkAuth} = useAuthStore()
useEffect(() => {
checkAuth()
}, [checkAuth])
if(!isAuthenticated) return <Navigate to={'/login'} replace/>
  return (
    <>
        <Navbar/>
        <SidebarTrigger/>
        <Outlet/>
        
    </>
  )
}

export default AuthenticatedLayout