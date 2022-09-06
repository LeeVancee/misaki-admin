<!--  -->
<template>
     <template v-for="menu in menus" :key="menu.path">
      <el-sub-menu v-if="menu.children && menu.children.length >1 " index="1">
        <template #title>
          <el-icon>
            <component :is="menu.meta.icon" />
          </el-icon>
          <span>{{menu.meta.title}}</span>
        </template>
        <menu-item :menus="menu.children"></menu-item>
      </el-sub-menu>
      <el-menu-item v-else index="2">
        <el-icon>
          <component :is="menu.meta.icon" />
        </el-icon>
         <span>{{menu.meta.title}}</span>
      </el-menu-item>
    </template>
</template>

<script setup lang='ts'>

    defineProps(['menus'])
</script>
<style lang='scss' scoped>
</style>