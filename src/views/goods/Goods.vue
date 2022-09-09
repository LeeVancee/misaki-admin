<!--  -->
<template>
  <div></div>

  <div>
    <el-button
      v-btn="'system:goods:goodsInfo:add'"
      @click="changeLang"
      type=""
      >{{ $t('menus.wIndex') }}</el-button
    >
    <el-button v-btn="'system:goods:goodsInfo:update'" type="">222</el-button>
    <el-button v-btn="'system:goods:goodsInfo:update'" type="">333</el-button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const changeLang = () => {
  alert(t('menus.wIndex'))
}
</script>
<style lang="scss" scoped></style>
