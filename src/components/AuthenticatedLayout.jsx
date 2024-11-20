
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
if(isCheckingAuth) return <div className='w-full min-h-[70vh] flex items-center justify-center'><Loader className='animate-spin ' size={44}/></div>
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