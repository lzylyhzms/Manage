<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import {ArrowUp, DocumentCopy, Download} from "@element-plus/icons-vue";

defineProps<{
  label: string   // Tab 标签
  name: string    // Tab name
  docUrl: string  // 快速入门链接
  code: string    // 要展示/复制的代码
  apicontent: {         // 接收整个 tab 数据作为 info
  id: number;
  api: number;
  date: string;
  name: string;
}
}>()

const copyCode = (code: string) => {
  navigator.clipboard.writeText(code)
  ElMessage.success('复制成功！')
}

const showCode = ref(true)
const toggleCode = () => {
  showCode.value = !showCode.value
}

// const apicontent = [
//   {
//     id:1,api:1205,date:"2025-08-30",name:"apitest",
//   },
// ];

const infoText:string = '您的 API 密钥列在下面。您还可以在XXX中查看和管理项目和 API 密钥。';
</script>

<template>
  <el-tab-pane :label="label" :name="name">
    <!-- 快速入门链接 -->
    <a :href="docUrl" target="_blank">快速入门</a>

    <!-- 代码卡片 -->
    <el-card class="code-card" v-if="code">
      <!-- 顶部工具栏 -->
      <div class="toolbar">
        <div class="left">代码示例</div>
        <div class="right">
          <el-button link :icon="DocumentCopy" @click="copyCode">复制</el-button>
          <el-button link :icon="Download">下载</el-button>
          <el-button link :icon="ArrowUp" @click="toggleCode">
            {{ showCode ? '收起' : '展开' }}
          </el-button>
        </div>
      </div>

      <el-scrollbar height="300px" style="width: 600px;" v-if="showCode">
        <pre><code>{{ code }}</code></pre>
      </el-scrollbar>
    </el-card>

    <div class="hover-container">
      <el-text class="mx-1" type="primary">{{infoText}}</el-text>
      <div class="hover-content">???</div>
    </div>
    <el-table :data="[apicontent]" style="width: 100%">
      <el-table-column prop="id" label="OID" width="180" />
      <el-table-column prop="api" label="API" width="180" />
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
    </el-table>
  </el-tab-pane>
</template>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  border-bottom: 1px solid #eaeaea;
  font-weight: 500;
}
.toolbar .right {
  display: flex;
  gap: 6px;
}

.code-card {
  width: 600px;         /* 固定宽度 */
  min-width: 600px;     /* 或者至少 600px，防止收起时变小 */
}

.hover-container {
  z-index: 100;
  position: relative;
  display: inline-flex; /* 保证内容和 hover 区域一致 */
  align-items: center;
  cursor: pointer;
}

.hover-content {
  visibility: hidden;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  z-index: 1;
}

.hover-container:hover .hover-content {
  visibility: visible;
}
</style>