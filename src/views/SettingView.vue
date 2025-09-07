<script setup lang="ts">
import { ref,onMounted } from 'vue'
const username = ref('')
const theme = ref('light')
// 当前登录用户
const currentUser = ref<string>("未登录")

onMounted(() => {
  const user = localStorage.getItem("currentUser")
  if (user) {
    currentUser.value = user
    username.value = user   // 设置页的输入框也同步显示
  }
})
</script>

<template>
  <div class="set">
    <h2>设置</h2>
    <el-form label-width="100px">
      <el-form-item label="用户名">
        <el-input v-model="username" />
      </el-form-item>
      <el-form-item label="主题">
        <el-select v-model="theme">
          <el-option label="亮色" value="light" />
          <el-option label="暗色" value="dark" />
        </el-select>
      </el-form-item>

    </el-form>
  </div>
</template>

<style scoped>
.set{
  width: 90%;
  height: 100vh;
}
</style>