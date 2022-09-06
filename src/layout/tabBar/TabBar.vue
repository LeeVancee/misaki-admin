<template>
  <el-tabs
    v-model="activeKey"
    type="card"
    @tab-click="clickHandle"
    @tab-remove="removeTab"
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
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
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
// 监控
watch(
  () => route.path,
  () => {
    activeKey.value = route.path
    addTab()
  }
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
</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
