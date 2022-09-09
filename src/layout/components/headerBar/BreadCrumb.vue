<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item>{{ $t('menus.wIndex') }}</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">{{
        $t(item.meta.title)
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue'
import { useRoute, RouteLocationMatched } from 'vue-router'

const route = useRoute()
const breadcrumb: Ref<RouteLocationMatched[]> = ref([])
const getBreadCrumb = () => {
  //过滤路由信息
  let matched = route.matched.filter(
    (item) => item.meta && item.meta.title && item.children.length !== 1
  )
  //拿到第一条数据
  const first = matched[0]
  if (first.path == '/index') {
    matched = []
  }

  breadcrumb.value = matched
}

getBreadCrumb()

// 监控路由 如发生变化，面包屑改变
watch(
  () => route.path,
  () => {
    getBreadCrumb()
  }
)
</script>

<style scoped></style>
