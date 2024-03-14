import { User } from '@/common/interface/user'

export type LoginResponse = {
  user: User
  token: string
}
