import { defineStore } from 'pinia'
import { asyncRoutes } from '@/router/modules'
import { RouteRecordRaw } from 'vue-router'
import router from '@/router'

export interface MenuState {
  menuList: RouteRecordRaw[]
}

function hasPermission(permission: string[], needPermission: string) {
  for (let i = 0; i < permission.length; i++) {
    if (permission[i].startsWith(needPermission)) {
      return true
    }
  }
  return false
}
function filterRouter(routes: RouteRecordRaw[], permission: string[]) {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    if (route.children) {
      route.children = filterRouter(route.children, permission)
      if (route.children.length > 0) {
        res.push(route)
      }
    } else {
      if (route.meta!.permission) {
        if (hasPermission(permission, route.meta!.permission)) {
          res.push(route)
        }
      }
    }
  })
  return res
}
export const useMenuStore = defineStore('menu', {
  state: (): MenuState => ({
    menuList: []
  }),
  getters: {
    getMenus: (state) => state.menuList
  },

  actions: {
    /* setMenus(systemMenu: any) {
      this.menuList = systemMenu
    }, */
    generateSystemMenus(permission: string[]) {
      let routers = filterRouter(asyncRoutes, permission)
      //添加到动态路由
      routers.forEach((route) => {
        // 二级菜单跳成一级
        if (route.children?.length === 1) {
          route.redirect = null || route.path + '/' + route.children[0].path
          route.meta = route.children[0].meta
        }
        router.addRoute(route)
      })
      //添加动态菜单
      // this.setMenus(routers)
      this.menuList = routers
    }
  }
})
