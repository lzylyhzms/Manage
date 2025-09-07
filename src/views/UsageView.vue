<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Echart from "@/chart/Echart.vue";


// 定义 API 名称类型
type ApiName = "openai" | "gemini" | "deepseek";

// 模拟不同 API 的调用次数数据
const apiCalls = ref([
  { date: "2025-08-28", openai: 10, gemini: 8, deepseek: 5 },
  { date: "2025-08-29", openai: 20, gemini: 15, deepseek: 10 },
  { date: "2025-08-30", openai: 15, gemini: 18, deepseek: 12 },
  { date: "2025-08-31", openai: 30, gemini: 25, deepseek: 20 },
  { date: "2025-09-01", openai: 50, gemini: 35, deepseek: 28 },
  { date: "2025-08-28", openai: 10, gemini: 8, deepseek: 5 },
  { date: "2025-09-29", openai: 20, gemini: 15, deepseek: 10 },
  { date: "2025-09-30", openai: 15, gemini: 18, deepseek: 12 },
  { date: "2025-09-31", openai: 30, gemini: 25, deepseek: 20 },
  { date: "2025-10-01", openai: 50, gemini: 35, deepseek: 28 },
]);

// 可选择的 API
const apiOptions = [
  { label: "OpenAI", value: "openai" },
  { label: "Gemini", value: "gemini" },
  { label: "DeepSeek", value: "deepseek" },
];

// 默认选中 OpenAI
const selectedApi = ref<ApiName>("openai");

// chart 配置项
const apiChartOption = ref({});
const errorChartOption = ref({});

// 错误数据（目前为空）
//const errorData = ref<{ date: string; count: number }[]>([]);
const errorData = ref([
  { date: "2025-08-28", count: 5 },
  { date: "2025-08-29", count: 8 },
  { date: "2025-08-30", count: 3 },
  { date: "2025-08-31", count: 7 },
  { date: "2025-09-01", count: 4 },
]);

const updateApiOption = () => {
  apiChartOption.value = {
    grid: { left: "3%", right: "3%", bottom: "10%", containLabel: true },
    title: { text: `${selectedApi.value} 调用次数` },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: apiCalls.value.map((item) => item.date),
    },
    yAxis: { type: "value" },
    series: [
      {
        name: selectedApi.value,
        type: "line",
        smooth: true,
        lineStyle: { width: 3 },
        data: apiCalls.value.map((item) => item[selectedApi.value]),
      },
    ],
  };
};

const updateErrorOption = () => {
  errorChartOption.value = {
    grid: { left: "5%", right: "5%", bottom: "10%", containLabel: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: errorData.value.map((d) => d.date),
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "API Errors",
        type: "line",
        data: errorData.value.map((d) => d.count),
        smooth: true,
        lineStyle: { color: "#ea4335", width: 2 },
        symbol: "circle",
        symbolSize: 6,
      },
    ],
  };
};

// 初始化
watch(selectedApi, updateApiOption, { immediate: true });
watch(errorData, updateErrorOption, { immediate: true });
</script>

<template>
  <div class="p-4">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover" class="w-full chart-card">
          <div class="flex items-center mb-4">
            <span class="mr-2">选择 API：</span>
            <el-select v-model="selectedApi" placeholder="选择 API" style="width: 200px">
              <el-option
                  v-for="item in apiOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </div>
          <Echart :option="apiChartOption" />
        </el-card>
      </el-col>

      <!-- 右侧：API 错误次数 -->
      <el-col :span="12">
        <el-card shadow="hover" class="chart-card">
          <div class="card-title">Total API Errors per Day</div>
          <div v-if="errorData.length">
            <Echart :option="errorChartOption" />
          </div>
          <div v-else class="no-data">No Data Available</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.p-4{
  width: 1000px;
}
.chart-card {
  padding: 0;
}
.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: rgb(45, 58, 75);
}
</style>

