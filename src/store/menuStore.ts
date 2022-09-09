import { defineStore } from 'pinia'
import { asyncRoutes } from '@/router/modules'
import { RouteRecordRaw } from 'vue-router'

export interface MenuState {
  menuList: RouteRecordRaw[]
}

export const useMenuStore = defineStore('menu', {
  state: (): MenuState => ({
    menuList: []
  }),
  getters: {
    getMenus: (state) => state.menuList
  },

  actions: {
    setMenus(systemMenu: any) {
      this.menuList = systemMenu
    }
  }
})
