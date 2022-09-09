<template>
  <div @click="onToggle">
    <img
      v-if="isFullscreen"
      src="../../../assets/images/notFull.png"
      style="width: 35px; height: 35px"
    />
    <img
      v-else
      src="../../../assets/images/isFull.png"
      style="width: 35px; height: 35px"
    />
  </div>
</template>

<script setup lang="ts">
import screenfull from 'screenfull'
import { onMounted, onUnmounted, ref } from 'vue'
const isFullscreen = ref(false)
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}
const onToggle = () => {
  screenfull.toggle()
}
// 设置监听器
onMounted(() => {
  screenfull.on('change', change)
})
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<style scoped></style>
