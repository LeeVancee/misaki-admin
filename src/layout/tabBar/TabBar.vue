<template>
  <el-tabs
    v-model="activeKey"
    type="card"
    @tab-click="clickHandle"
    @tab-remove="removeTab"
    @contextmenu.prevent.native="openContextMenu($event)"
    editable
    class="demo-tabs"
  >
    <el-tab-pane
      v-for="item in tabList"
      :key="item.path"
      :label="item.title"
      :name="item.path"
    >
    </el-tab-pane>
  </el-tabs>
  <ul
    v-show="contextMenuVisible"
    :style="{ left: left + 'px', top: top + 'px' }"
    class="contentMenu"
  >
    <li @click="closeAllTabs">关闭所有</li>
    <li @click="closeOtherTabs('left')">关闭左边</li>
    <li @click="closeOtherTabs('right')">关闭右边</li>
    <li @click="closeOtherTabs('other')">关闭其他</li>
  </ul>
</template>
<script lang="ts" setup>
import { computed, onMounted, Ref, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMainStore } from '@/store'
import { Itab } from '@/store/type'

const mainStore = useMainStore()
const route = useRoute()
const router = useRouter()

const tabList = computed(() => {
  return mainStore.getAddTab
})
//索引
const activeKey = ref('')
//添加tab
const addTab = () => {
  const { meta, path } = route
  const tab: Itab = {
    path: path,
    title: meta.title as string
  }
  mainStore.addTab(tab)
}

// 刷新缓存数据
const refresh = () => {
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('tabs_routes', JSON.stringify(tabList.value))
  })
  let session = sessionStorage.getItem('tabs_routes')
  if (session) {
    let tabItem = JSON.parse(session)
    tabItem.forEach((tab: Itab) => {
      mainStore.addTab(tab)
    })
  }
}
refresh()
// 监控
watch(
  () => route.path,
  () => {
    activeKey.value = route.path
    addTab()
  },
  { immediate: true } //立即执行
)
// 点击tab
const clickHandle = (event: any) => {
  router.push({ path: event.props.name })
}
//移除Tab
const removeTab = (targetName: string) => {
  if (tabList.value.length === 1) {
    return alert('last page')
  }
  //如果是删除当前页
  if (activeKey.value === targetName) {
    tabList.value.forEach((tab: Itab, index: number) => {
      if (tab.path === targetName) {
        const nextTab = tabList.value[index + 1] || tabList.value[index - 1]
        if (nextTab) {
          activeKey.value = nextTab.path
        }
      }
    })
  }
  mainStore.closeCurrentTab(targetName)
}

// 右键显示菜单列表
const contextMenuVisible: Ref<boolean> = ref(false)
const left = ref('')
const top = ref('')
const openContextMenu = (e: any) => {
  if (e.srcElement.id) {
    let currentContextTabId = e.srcElement.id.split('-')[1]
    mainStore.saveCurrentContextTabId(currentContextTabId)
    contextMenuVisible.value = true
    left.value = e.clientX
    top.value = e.clientY + 10
  }
}
// 关闭所有
const closeAllTabs = () => {
  mainStore.closeAllTabs()
  contextMenuVisible.value = false
  router.push('/index')
}
// 关闭其他（选中之外）

const closeOtherTabs = (part: string) => {
  mainStore.closeOtherTabs(part)
  contextMenuVisible.value = false
}
onMounted(() => {
  //初始化页面生成tab
  addTab()
  //刷新保存数据
  refresh()
})
// 监控右键删除列表 如果有点击事件，则消失
watch(
  () => contextMenuVisible.value,
  () => {
    if (contextMenuVisible.value) {
      window.addEventListener('click', () => (contextMenuVisible.value = false))
    } else {
      window.removeEventListener(
        'click',
        () => (contextMenuVisible.value = false)
      )
    }
  }
)
</script>
<style lang="scss" scoped>
/* .demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
} */
.contentMenu {
  width: 100px;
  margin: 0;
  border: 1px solid #ccc;
  background-color: #fff;
  z-index: 1000;
  position: absolute;
  list-style-type: none;
  padding: 5px, 0;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.2);
  li {
    margin: 0;
    padding: 7px 10px;
    &:hover {
      background-color: #f2f2f2;
      cursor: pointer;
    }
  }
}
</style>
