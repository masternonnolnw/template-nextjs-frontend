import axios from 'axios'

import { API_BASE_URL } from '@/common/env'

import { LoginResponse } from './interface'
import { ApiResponseType, ApiStatus } from './types'

class ApiService {
  constructor() {
    axios.defaults.baseURL = API_BASE_URL
  }
  setToken = (token: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  login = async (username: string, password: string): Promise<ApiResponseType<LoginResponse>> => {
    try {
      const response = await axios.post('/auth/login', { username, password })
      this.setToken(response.data.token)
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      }
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Invalid username or password',
      }
    }
  }
}

export const apiService = new ApiService()
