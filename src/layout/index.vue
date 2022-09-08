<template>
  <div class="layout">
    <el-container>
      <el-aside :style="'width:' + autoWidth">
        <logo-bar :collapsed="collapsed" />
        <menu-bar :collapsed="collapsed" />
      </el-aside>
      <el-container>
        <el-header>
          <el-row
            :gutter="24"
            style="width: 100%; display: flex; align-items: center"
          >
            <!-- 侧边栏按钮 -->
            <el-col :span="1">
              <el-icon size="26px" style="margin-right: 15px" @click="click">
                <component :is="collapsed ? Expand : Fold" />
              </el-icon>
            </el-col>
            <!-- header业务 -->

            <el-col :span="23">
              <header-bar />
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <!-- tabList -->
          <tab-bar />
          <AppMain />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import logoBar from './components/logoBar/index.vue'
import menuBar from './components/menuBar/index.vue'
import AppMain from './components/appMain/AppMain.vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import HeaderBar from './components/headerBar/index.vue'
import TabBar from './components/tabBar/TabBar.vue'
import { isMobile } from '../untils/isMobile'

const collapsed = ref(false)
const click = () => {
  collapsed.value = !collapsed.value
}
const autoWidth = computed(() => {
  if (collapsed.value && isMobile()) {
    return '0px'
  } else if (collapsed.value) {
    return '64px'
  } else {
    return '200px'
  }
})
</script>

<style lang="scss">
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  .el-header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
    text-align: center;
    //line-height: 60px;
  }

  .el-footer {
    line-height: 60px;
  }

  .el-aside {
    background-color: $menuBg;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 200px;
    width: 200px;
    height: 100%;
    overflow: hidden;
  }

  /* .el-main {
    background-color: #e9eef3;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 160px;
  } */
}
</style>
