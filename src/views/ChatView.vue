<template>
  <div class="ai-studio">
    <!-- Logo 部分 -->
    <div class="logo">
      <span class="google">Test</span>
      <span class="ai">AI Studio</span>
    </div>

    <!-- 输入框部分 -->
    <div class="input-container">
      <el-input
          v-model="input"
          placeholder="Plot sin(x) from 0 to 2*pi. Generate the resulting graph image."
          size="large"
          clearable
          class="search-box"
      >
        <template #suffix>
          <el-button class="run-btn" @click="handleRun">
            Run <span class="key-tip">Ctrl ↵</span>
          </el-button>
        </template>
      </el-input>
    </div>

    <!-- 底部提示 -->
    <div class="footer">
      <a href="#">What's new</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input = ref("")

const handleRun = () => {
  console.log("运行内容：", input.value)
}
</script>

<style scoped>
.ai-studio {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  font-family: Arial, sans-serif;
}

.logo {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 30px;
}

.logo .google {
  color: black;
  margin-right: 5px;
}

.logo .ai {
  color: black;
}

.input-container {
  width: 600px;
  margin-bottom: 20px;
}

.search-box :deep(.el-input__wrapper) {
  border-radius: 30px;
  padding-left: 20px;
  font-size: 16px;
}

.run-btn {
  background-color: #fef7e0;
  color: black;
  border: none;
  border-radius: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.run-btn:hover {
  background-color: #fde68a;
}

.key-tip {
  font-size: 12px;
  opacity: 0.7;
}

.footer {
  margin-top: 20px;
}

.footer a {
  color: #5f6368;
  font-size: 14px;
  text-decoration: none;
}
</style>
