<template>
  <div>
    <el-dropdown>
      <div>
        <img
          src="../../../assets/images/lang.png"
          style="width: 35px; height: 35px"
          alt=""
        />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            @click="toLang('chs')"
            :disabled="getCurrentLang == 'chs'"
            >中文</el-dropdown-item
          >
          <el-dropdown-item
            @click="toLang('en')"
            :disabled="getCurrentLang == 'en'"
            >英文</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const toLang = (lang: string) => {
  i18n.locale.value = lang
  localStorage.setItem('lang', lang)
}
const getCurrentLang = computed(() => {
  return i18n.locale.value
})
</script>

<style scoped></style>
