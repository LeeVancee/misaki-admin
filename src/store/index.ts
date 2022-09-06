import { defineStore } from 'pinia'
import { Itab } from './type'

interface State {
  tabsList: Array<Itab>
  contextMenuTabId: string
}

export const useMainStore = defineStore('main', {
  state: (): State => ({
    tabsList: [],
    contextMenuTabId: ''
  }),

  getters: {
    getAddTab(state: State) {
      return state.tabsList
    }
  },
  actions: {
    //添加tab
    addTab(tab: Itab) {
      const isSome = this.tabsList.some((item) => item.path == tab.path)
      if (!isSome) {
        this.tabsList.push(tab)
      }
    },
    // 删除tab
    closeCurrentTab(targetName: string) {
      const index = this.tabsList.findIndex((item) => item.path == targetName)
      this.tabsList.splice(index, 1)
    },
    // 右键打开菜单保存path
    saveCurrentContextTabId(curTextMenuTabId: any) {
      this.contextMenuTabId = curTextMenuTabId
    },
    // 删除所有tab
    closeAllTabs() {
      this.tabsList = []
      sessionStorage.removeItem('tabs_routes')
    },
    //删除其他tab
    closeOtherTabs(part: string) {
      if (part === 'other') {
        this.tabsList = this.tabsList.filter(
          (item) => item.path == this.contextMenuTabId
        )
      } else if (part == 'left') {
        const index = this.tabsList.findIndex(
          (item) => item.path == this.contextMenuTabId
        )
        this.tabsList.splice(0, index)
      } else if (part == 'right') {
        const index = this.tabsList.findIndex(
          (item) => item.path == this.contextMenuTabId
        )
        this.tabsList.splice(index + 1)
      }
    }
  }
})
