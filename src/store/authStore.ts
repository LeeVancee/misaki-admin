import { defineStore } from 'pinia'
import { UserType } from './type'
import { login, loginByToken } from '@/api/Auth'
import { useMenuStore } from './menuStore'
import { useRouter } from 'vue-router'

const router = useRouter()
export interface AuthState {
  token: string
  userInfo: UserType
  roles: number[]
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: '',
    userInfo: {
      avatar: '',
      username: '',
      roleName: '',
      status: 1
    },
    roles: []
  }),

  actions: {
    //账号密码登录
    async login(requestUser: object) {
      await login(requestUser).then((result) => {
        this.userInfo = result.data
        this.token = result.data.token
        localStorage.setItem('token', result.data.token)
        const menuStore = useMenuStore()
        menuStore.generateSystemMenus(result.data.permissions)
      })
    },
    //token登录
    loginByToken(token: any) {
      this.token = token
      loginByToken(token)
        .then((result) => {
          this.userInfo = result.data
          localStorage.setItem('token', result.data.token)
          const menuStore = useMenuStore()
          menuStore.generateSystemMenus(result.data.permissions)
        })
        .catch(() => {
          localStorage.removeItem('token')
        })
    },
    addUserInfo(userInfo: UserType) {
      this.userInfo = userInfo
    }
  }
})
