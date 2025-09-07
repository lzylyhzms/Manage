<template>
  <div class="user-manage">
    <h2>用户管理</h2>
    <p style="margin-bottom: 15px;">当前登录用户：<strong>{{ currentUser }}</strong></p>

    <el-table :data="users" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-space>
            <el-button size="small" @click="editUser(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteUser(scope.row.id)">删除</el-button>
          </el-space>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑对话框 -->
    <el-dialog v-model="dialogVisible" title="编辑用户" width="400px">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="editForm.name" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveUser">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

/**
 * 定义用户类型
 */
interface User {
  id: number
  name: string
  email: string
}

const users = ref<User[]>([])
const currentUser = ref<string>("未登录")

// 默认用户
const defaultUsers: User[] = [
  { id: 1, name: '张三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' },
  { id: 3, name: '王五', email: 'wangwu@example.com' }
]

// 编辑弹窗
const dialogVisible = ref(false)
const editForm = ref<User>({ id: 0, name: '', email: '' })

onMounted(() => {
  // 当前登录用户
  const user = localStorage.getItem("currentUser")
  if (user) {
    currentUser.value = user
  }

  // 已保存的用户列表
  const saved = localStorage.getItem("users")
  let loadedUsers: User[] = saved ? JSON.parse(saved) : []

  // 合并默认用户（避免重复 id）
  const merged = [...defaultUsers]
  loadedUsers.forEach(u => {
    if (!merged.find(m => m.id === u.id)) {
      merged.push(u)
    }
  })

  users.value = merged
  localStorage.setItem("users", JSON.stringify(users.value)) // 确保保存
})

/**
 * 编辑用户
 */
function editUser(user: User) {
  editForm.value = { ...user }
  dialogVisible.value = true
}

/**
 * 保存编辑
 */
function saveUser() {
  users.value = users.value.map(u => u.id === editForm.value.id ? { ...editForm.value } : u)
  localStorage.setItem("users", JSON.stringify(users.value))
  dialogVisible.value = false
}

/**
 * 删除用户
 */
function deleteUser(id: number) {
  users.value = users.value.filter(u => u.id !== id)
  localStorage.setItem("users", JSON.stringify(users.value))
}
</script>

<style scoped>
.user-manage{
  width: 90%;
  height: 100vh;
}
</style>
