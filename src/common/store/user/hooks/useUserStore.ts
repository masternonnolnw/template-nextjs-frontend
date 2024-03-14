import { useEffect } from 'react'

import userStore from '../user-store'

const requireAuth = () => {
  const initUser = userStore((state) => state.initUser)
  const isUserInit = userStore((state) => state.isUserInit)
  const isAuth = userStore((state) => state.isAuth)
  if (isUserInit && !isAuth) window.location.href = '/login'

  useEffect(() => {
    initUser()
  }, [])
}

export default requireAuth
