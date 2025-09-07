<script setup lang="ts">
import { ref } from 'vue'

import type { TabsPaneContext } from 'element-plus'
import tabsConfig from '../../public/mock/tabs.json'
import ApiTabPane from "@/components/ApiTabPane.vue";

const activeName = ref('first')

// 统一维护 API tab 配置
const tabs = tabsConfig;

// 提取 info 数据
const tabsData = tabsConfig.map(tab => tab.info);  // 提取 info 部分
console.log(tabsData);



</script>

<template>
  <div>
    <h2>API 密钥 </h2>
    <el-tabs v-model="activeName">
      <ApiTabPane
          v-for="tab in tabs"
          :key="tab.name"
          :label="tab.label"
          :name="tab.name"
          :docUrl="tab.docUrl"
          :code="tab.code"
          :apicontent="tab.info"
      />
    </el-tabs>
  </div>
</template>

<style scoped>

</style>