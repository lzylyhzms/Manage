<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch, ref } from "vue";
import * as echarts from "echarts";

// 接收父组件传来的 option
const props = defineProps<{
  option: echarts.EChartsOption;
}>();

const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

const renderChart = (option: echarts.EChartsOption) => {
  if (chartRef.value) {
    if (!chartInstance) {
      chartInstance = echarts.init(chartRef.value);
    }
    chartInstance.setOption(option);
  }
};

// 监听 option 变化
watch(
    () => props.option,
    (newOption) => {
      if (newOption) renderChart(newOption);
    },
    { deep: true, immediate: true }
);

onMounted(() => {
  if (props.option) renderChart(props.option);

  window.addEventListener("resize", () => {
    chartInstance?.resize();
  });
});

onBeforeUnmount(() => {
  chartInstance?.dispose();
  chartInstance = null;
});
</script>

<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  height: 500px;
}
</style>
