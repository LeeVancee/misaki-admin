<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="transitionName">
        <keep-alive :include="includeList">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const transitionName = ref('slide-left')

// watch监控路由meta
watch(
  () => route.meta.index,
  (to, from) => {
    if (to && from) {
      transitionName.value = to < from ? 'slide-right' : 'slide-left'
    }
  }
)
const includeList = ref<string[]>([])
// 监听meta中keepAlive为true的页面,如果为true,则动态缓存
watch(
  () => route,
  (newVal: any, oldVal) => {
    if (
      newVal.name &&
      newVal.meta.keepAlive &&
      includeList.value.indexOf(newVal.name) === -1
    ) {
      includeList.value.push(newVal.name)
    }
  },
  { deep: true }
) // 开启深度监听
</script>

<style lang="scss" scoped>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  width: 100vw;
  will-change: transform;
  transition: all 500ms;
  // position: absolute;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
