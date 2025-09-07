<template>
  <el-aside width="200px" style="background: #2d3a4b; color: white;">
    <div style="padding: 30px; font-weight: bold; font-size: 18px;">Test AI Studio</div>
    <el-menu
        router
        :default-active="$route.path"
        background-color="#2d3a4b"
        text-color="#fff"
        active-text-color="#409EFF"
    >
      <el-sub-menu index="studio">
        <template #title>
          <span>Studio</span>
        </template>
        <el-menu-item index="/chat" @click="openChat">
          <span>Chat</span>
          <el-icon><ChatDotRound /></el-icon>
        </el-menu-item>
        <el-menu-item index="/stream">
          <span>Stream</span>
          <el-icon><Operation /></el-icon>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="dashboard">
        <template #title>
          <span>Dashboard</span>
        </template>
        <el-menu-item index="/apikeys">
          <span>API Keys</span>
          <el-icon><Key /></el-icon>
        </el-menu-item>
        <el-menu-item index="/dashboard">
          <span>Usage&Billing</span>
          <el-icon><ShoppingCartFull /></el-icon>
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item index="/docs">
        <span>Documentation</span>
        <el-icon><Link /></el-icon>
      </el-menu-item>

      <el-sub-menu index="/settings">
        <template #title>
          <span>Setting</span>
        </template>
        <el-menu-item>
          <el-popover
              placement="right-start"
              trigger="click"
          >
            <!-- popup 内容 -->
            <div class="theme-popup">
              <div class="theme-popup">
                <el-menu-item @click="setTheme('light')">Light</el-menu-item>
                <el-menu-item @click="setTheme('dark')">Dark</el-menu-item>
                <el-menu-item @click="setTheme('system')">System</el-menu-item>
              </div>
            </div>

            <!-- reference 插槽：让文字和图标保持对齐 -->
            <template #reference>
              <div style="display: flex; align-items: center; width: 100%;">
                <span>Theme</span>
                <el-icon><View /></el-icon>
              </div>
            </template>
          </el-popover>
        </el-menu-item>

        <el-menu-item index="users">
          <span>User</span>
          <el-icon><User /></el-icon>
        </el-menu-item>
        <el-menu-item index="/settings">
          <span>Setting</span>
          <el-icon><User /></el-icon>
        </el-menu-item>
      </el-sub-menu>

    </el-menu>
  </el-aside>
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";

const $route = useRoute();

function openChat():void{
  //window.open('http://192.168.31.18:5173/main');
}

function setTheme(mode: string) {
  console.log("切换主题:", mode);
  if (mode === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem("theme", mode);
}
</script>

<style scoped>
.theme-popup {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 120px; /* 固定宽度，或者 100% */
}
.theme-popup .el-menu-item {
  width: 100%;
  justify-content: center;   /* 按钮里的 flex 居中 */
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>
