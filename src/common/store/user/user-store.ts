import { create } from 'zustand'

import { User } from '@/common/interface/user'
import { apiService } from '@/common/service/api/service'
import { ApiStatus } from '@/common/service/api/types'

interface IUserStore {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  isUserInit: boolean
  isAuth: boolean
  user: User
  token: string
  initUser: () => void
  login: (username: string, password: string) => Promise<User>
}

const userStore = create<IUserStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  isUserInit: false,
  isAuth: false,
  user: {} as User,
  token: '',

  initUser: () => {
    if (userStore.getState().isLoading || userStore.getState().isUserInit) return
    if (typeof window === 'undefined') return
    set({ isLoading: true })
    const userInStorage = localStorage.getItem('user')
    const user = userInStorage ? JSON.parse(userInStorage) : undefined
    const token = localStorage.getItem('token') ?? ''
    if (user) {
      apiService.setToken(token)
      set({ isUserInit: true, isAuth: true, user, token, isLoading: false })
    } else {
      window.location.href = '/loginAgency'
      set({ isUserInit: true, isLoading: false })
    }
  },

  login: async (username: string, password: string) => {
    const response = await apiService.login(username, password)
    if (response.status === ApiStatus.ERROR) throw new Error(response.errorMessage)

    set({ isAuth: true, user: response.data.user })
    localStorage.setItem('user', JSON.stringify(response.data.user))
    localStorage.setItem('token', response.data.token)

    return response.data.user
  },
}))

export default userStore
