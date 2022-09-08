<template>
  <div class="userInfo">
    <el-dropdown>
      <div>
        <img
          :src="userInfo.avatar"
          style="width: 35px; height: 35px; border-radius: 50%"
          alt=""
        />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- 用户名和role -->
    <el-row>
      <el-col>
        <span style="color: aliceblue; margin-left: 10px; font-size: 15px">
          {{ userInfo.username }}
        </span>
      </el-col>
      <el-col>
        <span style="color: #gray; margin-left: 10px; font-size: 8px">
          {{ userInfo.roleName }}
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/authStore'
import { computed } from 'vue'
const authStore = useAuthStore()
const userInfo = computed(() => {
  return authStore.userInfo
})

const handleLogout = () => {
  localStorage.removeItem('token')
  location.reload()
}
</script>

<style lang="scss" scoped>
.userInfo {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;

    border: solid 1px black;
  }
}
</style>
