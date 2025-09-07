<template>
  <el-container style="height: 100vh;background: #2d3a4b;display: flex;">
    <!-- 左侧侧边栏 -->
    <!--
    <transition name="sidebar">
      <Sidebar v-if="!collapsed" />
    </transition>
    -->
    <el-aside :width="collapsed ? '0px' : '200px'" style="transition: width 0.3s;overflow: hidden" v-if="!isLoginPage">
      <Sidebar :collapse="collapsed" />
    </el-aside>

    <!-- 右侧内容区 -->
    <el-container style="flex: 1; flex-direction: column;">

      <el-main style="background: #f5f6f7; padding: 0px; overflow: auto">
        <HeaderBar v-if="!isLoginPage">
          <!-- 在 HeaderBar 内部放折叠按钮 -->
          <template #actions>
            <el-button circle @click="collapsed = !collapsed">
              <el-icon>
                <DArrowLeft v-if="!collapsed" />
                <DArrowRight v-else />
              </el-icon>
            </el-button>
          </template>
        </HeaderBar>
        <el-container style="display:flex; justify-content:center;align-items:center;">
          <!--margin-left:40px;padding: 20px;-->
          <!-- 子路由页面在这里渲染 -->
          <router-view />
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue"
import HeaderBar from "@/components/HeaderBar.vue"
import { ref,computed,onMounted,onBeforeUnmount } from "vue"
import {useRoute} from "vue-router";

// 控制侧边栏折叠
const collapsed = ref(false);

// 获取当前路由信息
const route = useRoute();
// 判断当前页面是否是 login 页面
const isLoginPage = computed(() => route.meta.layout === 'none');

// 监听窗口大小变化
const checkScreen = () => {
  if (window.innerWidth < 780) {
    collapsed.value = true;
  }
};

onMounted(() => {
  checkScreen();
  window.addEventListener("resize", checkScreen);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreen);
});
</script>

<style scoped>
/* 进入和离开过渡效果 */
.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.3s ease;
}
.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.sidebar-enter-to,
.sidebar-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>