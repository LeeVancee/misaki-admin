<template>
  <div class="head-bar">
    <el-row :gutter="24" style="display: flex; align-items: center">
      <el-col :span="18" :offset="0">
        <!-- BreadCrumb -->
        <bread-crumb />
      </el-col>
      <!-- screenfull -->
      <el-col :span="1">
        <screen-full />
      </el-col>
      <!-- language -->
      <el-col :span="1">
        <language-bar />
      </el-col>
      <el-col :span="4">
        <!-- 用户头像 -->
        <user-bar />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from './BreadCrumb.vue'
import UserBar from './UserBar.vue'
import LanguageBar from './LanguageBar.vue'
import ScreenFull from './ScreenFull.vue'
</script>

<style scoped></style>
