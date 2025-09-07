<template>
  <div class="register-container">
    <el-card class="register-card">
      <h2 id="title">Test AI Studio</h2>
      <el-form :model="form" :rules="rules" ref="formRef" @submit.prevent="register">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
        </el-form-item>
        <el-button
            type="primary"
            :loading="loading"
            @click="register"
            style="width:100%"
        >
          注册
        </el-button>
      </el-form>
      <p style="color: red; text-align: center; margin-top: 10px;">{{ message }}</p>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios, { AxiosError } from 'axios'

interface RegisterForm {
  username: string
  password: string
}

interface RegisterResponse {
  message: string
  token?: string
}

const router = useRouter()
const message = ref("")

const loading = ref(false)
const formRef = ref()

const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
}

// 表单数据
const form = reactive<RegisterForm>({
  username: "",
  password: ""
})

const register = async () => {
  try {
    await formRef.value?.validate()
    loading.value = true

    const res = await axios.post<RegisterResponse>("http://localhost:3000/register", {
      username: form.username,
      password: form.password,
    })

    message.value = res.data.message

    if (res.data.message === "注册成功") {
      // 延时 1 秒显示提示，然后跳转到登录页
      setTimeout(() => {
        router.push("/login")
      }, 1000)
    }
    // 注意：不要在“用户名已存在”时跳转，而是停留在注册页让用户重新填写
  } catch (err) {
    const error = err as AxiosError<{ message: string }>
    message.value = error.response?.data?.message || "注册失败"
  } finally {
    loading.value = false
  }
}

</script>

<style>
.register-container {
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


.register-card {
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
