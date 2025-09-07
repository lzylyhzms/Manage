<script setup lang="ts">
import { ref } from 'vue';
import { ElButton, ElCard } from 'element-plus';

// AI 文档列表
const aiDocs = ref([
  { name: 'OpenAI Docs', url: 'https://platform.openai.com/docs', color: '#10a37f' },
  { name: 'Anthropic Docs', url: 'https://www.anthropic.com/docs', color: '#ff6b6b' },
  { name: 'Cohere Docs', url: 'https://docs.cohere.ai/', color: '#4d79ff' },
  { name: 'Hugging Face Docs', url: 'https://huggingface.co/docs', color: '#f58220' },
  { name: 'Google AI Docs', url: 'https://ai.google/docs/', color: '#4285f4' }
]);
</script>

<template>
  <div class="ai-docs-container">
    <el-card
        v-for="doc in aiDocs"
        :key="doc.url"
        class="ai-card"
        shadow="hover"
    >
      <h3>{{ doc.name }}</h3>
      <el-button
          :style="{ backgroundColor: doc.color, color: '#fff' }"
          type="primary"
          size="default"
          :href="doc.url"
          target="_blank"
      >
        访问文档
      </el-button>
    </el-card>
  </div>
</template>

<style scoped>
.ai-docs-container {
  position: relative;
  display: flex;
  top:200px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.ai-card {
  width: 200px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.ai-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.ai-card h3 {
  font-size: 16px;
  margin-bottom: 15px;
}
</style>
