import { defineStore } from 'pinia'
import { Itab } from './type'

interface State {
  tabsList: Array<Itab>
}

export const useMainStore = defineStore('main', {
  state: (): State => ({
    tabsList: []
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
    }
  }
})
