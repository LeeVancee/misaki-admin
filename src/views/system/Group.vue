<!--  -->
<template>
  <div>
    <!-- 添加角色 -->
    <div style="margin: 5px 10px; text-align: left">
      <el-button type="primary" @click="toAdd">添加角色</el-button>
    </div>
    <!-- 添加和修改弹窗 -->
    <el-dialog :title="state.formTitle" v-model="state.dialogVisible">
      <el-form
        :model="state.formData"
        :rule="state.rules"
        ref="elForm"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="state.formData.name"
            placeholder="请输入角色名称"
            :maxlength="20"
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="state.formData.description"
            placeholder="请输入角色描述"
            :maxlength="20"
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="resetForm">重置</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 角色授权弹窗 -->
    <el-dialog
      title="角色授权"
      v-model="state.permissionVisible"
      destroy-on-close
    >
      <el-form>
        <el-form-item label="">
          <el-tree
            :data="state.permissionTree"
            show-checkbox
            :props="state.defaultProps"
            node-key="permission"
            :default-checked-keys="state.permissons"
            ref="permissionRef"
          ></el-tree>
        </el-form-item>
        <el-form-item label="">
          <el-button type="" @click="resetChecked">清空</el-button>
          <el-button type="primary" @click="setPermission">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 角色表 -->
    <div style="margin: 5px 10px; text-align: left">
      <el-table :data="state.roles">
        <el-table-column prop="name" label="角色"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="" label="操作">
          <template #default="scope">
            <el-button type="" @click="toPermissions(scope.row)"
              >授权</el-button
            >
            <el-button type="" @click="edit(scope.row)">编辑</el-button>
            <el-button type="" @click="delRoles(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  deleteRoles,
  getAllRoles,
  updateRole,
  updateRolePermission,
  addRole,
  getPermissionsOfRole
} from '@/api/system/role'
import { onMounted, reactive } from 'vue'
import { ComponentInternalInstance, getCurrentInstance, ref } from 'vue'
import type { ElTree } from 'element-plus'
import permissionTree from '@/router/permissionTree'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/notification/style/css'
// 添加断言
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const permissionRef = ref<InstanceType<typeof ElTree>>()
const state = reactive({
  roles: [],
  formTitle: '',
  dialogVisible: false,
  permissionVisible: false,
  permissionTree,
  permissons: [],
  defaultProps: {
    id: 'title',
    label: 'title',
    children: 'children'
  },
  formData: {
    id: 1,
    name: '',
    description: ''
  },
  rules: {
    name: {
      required: true,
      message: '请输入角色名称',
      trigger: blur
    }
  }
})
//获取所有角色数据
const _getAllRoles = () => {
  getAllRoles().then((result) => {
    state.roles = result.data
  })
}
// 点击添加按钮
const toAdd = () => {
  state.dialogVisible = true
  state.formTitle = '添加角色'
  resetForm()
}
// 重置
const resetForm = () => {
  state.formData = {
    id: 1,
    name: '',
    description: ''
  }
}
//确认或修改
const handleConfirm = () => {
  if (state.formTitle === '添加角色') {
    addRole(state.formData).then(() => {
      proxy?.$Notify.success('添加角色成功')
      _getAllRoles()
      state.dialogVisible = false
    })
  } else if ((state.formTitle = '更新角色')) {
    updateRole(state.formData).then(() => {
      proxy?.$Notify.success('更新角色成功')
      _getAllRoles()
      state.dialogVisible = false
    })
  }
}
//编辑
const edit = (selectRole: object) => {
  state.formData = JSON.parse(JSON.stringify(selectRole))
  state.dialogVisible = true
  state.formTitle = '更新角色'
}
// 删除角色
const delRoles = (id: number) => {
  proxy
    ?.$confirm('确定要删除角色吗')
    .then(() => {
      deleteRoles([id]).then(() => {
        proxy?.$Notify.success('删除成功')
        _getAllRoles()
      })
    })
    .catch(() => {})
}
// 授权
const toPermissions = (selectRole: any) => {
  state.permissons = []
  state.formData = JSON.parse(JSON.stringify(selectRole))
  state.permissionVisible = true
  getPermissionsOfRole(selectRole.id).then((result) => {
    state.permissons = result.data
  })
}
// 清空checkedbox
const resetChecked = () => {
  permissionRef.value!.setCheckedKeys([], false)
}
//确认权限树节点
const setPermission = () => {
  let nodes = permissionRef.value!.getCheckedNodes(false, false)
  let permissions: InstanceType<typeof ElTree>[] = []
  nodes.forEach((node) => {
    if (node.permision) {
      permissions.push(node.permision)
    }
  })
  let vo = {
    roleId: state.formData.id,
    permissions: permissions
  }
  updateRolePermission(vo).then(() => {
    state.permissionVisible = false
    proxy?.$Notify.success('修改成功')
  })
}
onMounted(() => {
  _getAllRoles()
})
</script>
<style lang="scss" scoped></style>
