'use client'
import {useEffect, useMemo} from "react";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";
function Logout() {
  const router = useRouter()

  useEffect(() => {
    console.log('logout')
    Cookies.remove('token')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('role')
    router.push('/')
  }, [router])
  return (
    <div>Logout...</div>
  )
}

export default Logout