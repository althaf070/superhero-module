
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { SidebarTrigger } from './ui/sidebar'
import { useAuthStore } from '@/store/useAuthStore'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'

const AuthenticatedLayout = () => {
  const {isAuthenticated,checkAuth,isCheckingAuth} = useAuthStore()
useEffect(() => {
checkAuth()
}, [checkAuth])
if(isCheckingAuth) return <Loader className='animate-spin ' size={44}/>
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