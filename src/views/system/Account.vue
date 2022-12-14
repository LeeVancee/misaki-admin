<template>
  <div>
    <div class="add-btn" style="text-align:left margin:5px 10px">
      <el-button type="primary" @click="toAddUser">新增用户</el-button>
    </div>
    <!-- 新增用户form表单 -->
    <el-dialog :title="state.formTitle" v-model="state.userFormDialogVisible">
      <el-form
        ref="userForm"
        :model="state.userFormData"
        :rules="state.rules"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="state.userFormData.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="" @click="resetForm">重置</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 角色表单 -->
    <el-dialog title="设置角色" v-model="state.showAuthorizeDialog">
      <el-select placeholder="选择角色" @change="upRole">
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-dialog>
    <!-- 系统用户表格 -->
    <div style="margin: 0 10px; text-align: left">
      <el-table
        :data="
          state.users.slice(
            (state.currentPage - 1) * state.pageSize,
            state.currentPage * state.pageSize
          )
        "
        style="width: 100%"
      >
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="roleName" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="green"
              inactive-color="red"
              @change="(value:boolean)=>commitStatusChange(value,scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template #default="scope">
            <div class="btn">
              <el-button size="small" @click="authorize(scope.row.id)"
                >授权</el-button
              >
              <el-button size="small" @click="resetPwd(scope.row.id)"
                >重置密码</el-button
              >
              <el-button size="small" @click="toEditUser(scope.row)"
                >编辑</el-button
              >
              <el-button size="small" @click="deleteUser(scope.row.id)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row style="float: right">
        <el-pagination
          layout="total,sizes,prev,pager,next,jumper"
          :total="50"
          :current-page="state.currentPage"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 20, 30]"
          @size-change="handleSizeChange"
        />
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  addSysUser,
  deleteSysUsers,
  getAllSysUsers,
  updateStatus,
  updateSysUser,
  resetPassword,
  setRole
} from '@/api/system/user'
import { getAllRoles } from '@/api/system/role'
import { onMounted, reactive, Ref } from 'vue'
import { ComponentInternalInstance, getCurrentInstance, ref } from 'vue'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/notification/style/css'
// 添加断言
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const state = reactive({
  users: [],
  currentPage: 1,
  pageSize: 10, //每页显示10条
  userFormDialogVisible: false,
  userFormData: {
    username: ''
  },
  rules: {
    username: [
      {
        required: true,
        message: '请输入用户名',
        trigger: blur
      }
    ]
  },
  formTitle: '',
  showAuthorizeDialog: false,
  currentId: 0
})
const value1 = ref(true)
//获取系统用户
const getUsers = () => {
  getAllSysUsers().then((result) => {
    console.log(result)
    state.users = result.data
    console.log(state.users)
  })
}
//新增用户
const toAddUser = () => {
  state.formTitle = '添加用户'
  state.userFormDialogVisible = true
}
// 确认或修改用户
const handleConfirm = () => {
  if (state.formTitle.startsWith('添加用户')) {
    addSysUser(state.userFormData).then((res) => {
      console.log(res)
      if (res.data == 1) {
        proxy?.$Alert('添加成功')
      }
      getUsers()
      state.userFormDialogVisible = false
    })
  } else if (state.formTitle.startsWith('修改')) {
    updateSysUser(state.userFormData).then((result) => {
      proxy?.$Alert('更新成功')
      getUsers()
      state.userFormDialogVisible = false
    })
  }
}
// 重置用户信息
const resetForm = () => {
  state.userFormData = {
    username: ''
  }
}
//修改用户
const toEditUser = (selectUser: object) => {
  state.userFormData = JSON.parse(JSON.stringify(selectUser))
  state.userFormDialogVisible = true
  state.formTitle = '修改用户'
}
// 删除用户
const deleteUser = (id: number) => {
  proxy?.$confirm('确认删除当前用户？').then(() => {
    deleteSysUsers(id).then(() => {
      proxy?.$Notify.success({
        title: '删除成功',
        duration: 500
      })
    })
  })
}

// 更新用户状态
interface User {
  id: number
  status: boolean
}
const commitStatusChange = (value: boolean, user: User) => {
  proxy?.$confirm(value === false ? '冻结用户' : '激活用户').then(() => {
    updateStatus(user.id, user.status).then(() => {
      proxy.$Notify.success(value === false ? '冻结用户' : '激活用户')
    })
  })
}
// 重置密码
const resetPwd = (userId: number) => {
  proxy?.$confirm('确认重置该用户密码').then(() => {
    resetPassword(userId).then(() => {
      proxy?.$Notify.success('密码重置成功')
    })
  })
}
//设置角色
interface Role {
  id: number
  name: string
}
const roles: Ref<Array<Role> | null> = ref(null)
const authorize = (userId: number) => {
  getAllRoles().then((result) => {
    roles.value = result.data
    state.currentId = userId
    state.showAuthorizeDialog = true
  })
}
// 确认设置角色
const upRole = (roleId: number) => {
  setRole(state.currentId, roleId).then((result) => {
    if (result.data == 1) {
      proxy?.$Notify.success('设置成功')
      getUsers()
      state.showAuthorizeDialog = false
    }
  })
}

// 改变页
const handleCurrentChange = (value: number) => {
  state.currentPage = value
}
const handleSizeChange = (value: number) => {
  state.pageSize = value
}

onMounted(() => {
  getUsers()
})
</script>
<style lang="scss" scoped></style>
