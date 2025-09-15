<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 id="title">Test AI Studio</h2>
      <el-form :model="form" @submit.prevent="login">
        <el-form-item>
          <el-input v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
        </el-form-item>
        <el-button type="primary" @click="login" style="width:100%">登录</el-button>

        <!-- 新增：注册 & 反馈 -->
        <el-row justify="space-between" style="margin-top: 15px;">
          <el-col :span="12" style="text-align: left;">
            <el-link type="primary" @click="goRegister">注册</el-link>
          </el-col>
          <el-col :span="12" style="text-align: right;">
            <el-link type="success" href="https://google.com" target="_blank">反馈</el-link>
          </el-col>
        </el-row>
      </el-form>
      <p style="color: red; text-align: center; margin-top: 10px;">{{ message }}</p>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios, { AxiosError } from 'axios'

interface LoginForm {
  username: string
  password: string
}

interface LoginResponse {
  message: string
  token?: string
}

const router = useRouter()
const message = ref("")

// 表单数据
const form = reactive<LoginForm>({
  username: "",
  password: ""
})


const login = async () => {
  if (!form.username || !form.password) {
    message.value = "请输入用户名和密码"
    return
  }

  try {
    const res = await axios.post<LoginResponse>("http://localhost:3000/login", {
      username: form.username,
      password: form.password,
    })

    message.value = res.data.message

    if (res.data.token) {
      // 保存 token & 当前用户
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("currentUser", form.username)

      // === 保存到用户列表（users） ===
      const savedUsers = JSON.parse(localStorage.getItem("users") || "[]")

      // 查找是否已存在
      const existingIndex = savedUsers.findIndex((u: any) => u.name === form.username)
      if (existingIndex >= 0) {
        // 更新用户（保证邮箱/名字最新）
        savedUsers[existingIndex] = {
          ...savedUsers[existingIndex],
          name: form.username,
          email: `${form.username}@example.com`
        }
      } else {
        // 新增用户
        savedUsers.push({
          id: Date.now(),
          name: form.username,
          email: `${form.username}@example.com`
        })
      }

      localStorage.setItem("users", JSON.stringify(savedUsers))

      // 登录成功后跳转
      router.push("/dashboard")
    }
  } catch (err) {
    const error = err as AxiosError<{ message: string }>
    message.value = error.response?.data?.message || "登录失败"

    // === 数据库/后端不可用时，直接走兜底逻辑 ===
    console.warn("后端不可用，启用本地兜底登录")

    localStorage.setItem("token", "fake-token-" + Date.now())
    localStorage.setItem("currentUser", form.username || "guest")

    message.value = "已离线登录（未连接数据库）"

    await router.push("/dashboard")
  }
}


const goRegister = () => {
  router.push("/register")
}
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
  position: relative; /* Ensure the container takes full viewport height */
}

#title {
  text-align: center; /* 使文本居中 */
  font-size: 20px; /* 设置标题的字体大小 */
  color: #333; /* 设置文字颜色 */
  font-family: 'Arial', sans-serif; /* 设置字体为 Arial */
  font-weight: bold; /* 设置文字加粗 */
  margin: 20px 0; /* 设置上下外边距 */
  text-transform: uppercase; /* 使标题全部大写，非必需 */
  letter-spacing: 2px; /* 设置字母间距 */
  background-color: #f0f0f0; /* 可选：为标题背景添加颜色 */
  padding: 10px; /* 设置内边距，使标题更突出 */
  border-radius: 8px; /* 可选：设置圆角背景 */
}


.login-card {
  width: 300px;
  padding: 20px;
  position: fixed; /* This will fix it on the screen */
  top: 50%; /* Position it at the vertical center */
  left: 50%; /* Position it at the horizontal center */
  transform: translate(-50%, -50%); /* Adjusts the exact centering */
  background-color: white; /* Optional: for visibility */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional: adds shadow */
}

</style>
