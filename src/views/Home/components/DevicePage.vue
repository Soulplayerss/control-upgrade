<template>
  <div class="w-full h-full flex gap-5">
    <div class="w-12.5% h-full flex flex-col gap-5 min-w-45">
      <div v-for="item in leftBtns" :key="item" class="w-full h-full _btnItem flex-1">
        <dv-border-box-2
          ><span
            class="block w-full h-full flex items-center justify-center text-center box-border p-4"
            >{{ item }}</span
          ></dv-border-box-2
        >
      </div>
    </div>
    <div class="flex-1 h-full flex flex-col gap-5">
      <div class="h-[33%] w-full">
        <VueDraggable
          class="flex flex-wrap gap-5 w-full h-full"
          v-model="draggablelist"
          :animation="150"
          ghostClass="ghost"
          group="people1"
        >
          <div
            v-for="item in draggablelist"
            :key="item.id"
            class="cursor-pointer _draggableItem border-rd-2 h-full"
          >
            <dv-border-box-10 :color="['#6fbdc3', '#E0FFFF']">
              <div class="w-full h-full box-border p-4 flex flex-col gap-5">
                <span class="block text-4.5 font-bold text-center">{{ item.name }}</span>
                <dv-capsule-chart
                  :config="draggableConfig"
                  v-if="item.name === '设备运行台时数'"
                  class="flex-1"
                  style="width: 100%; height: 100%; padding-bottom: 20px; padding-top: 20px"
                />
                <div class="flex-1 flex" v-else>
                  <div class="w-[30%] h-full flex flex-col justify-center items-center">
                    <img src="@/assets/image/device.svg" alt="" />
                    <span class="block text-8 font-bold color-[#e29c44] py-3">123</span>
                    <span class="block text-4 text-center">设备数量</span>
                  </div>
                  <div class="flex-1">
                    <v-chart autoresize :option="draggableOptionList" />
                  </div>
                </div>
              </div>
            </dv-border-box-10>
          </div>
        </VueDraggable>
      </div>
      <div class="flex-1 w-full">
        <dv-border-box-11
          :color="['#6fbdc3', '#3a708a']"
          backgroundColor="rgba(40, 51, 52, 0.8)"
          title="每个子系统设备完好率"
          style="font-weight: 600"
        >
          <div class="w-full h-full box-border px-8 pt-16 pb-6 flex flex-wrap gap-5">
            <div
              class="_subsystem flex flex-col items-center gap-5"
              v-for="(item, index) in subsystemList"
              :key="index"
            >
              <div class="flex-1 w-full">
                <PieOptionPage
                  :value="50"
                  :color="['#6fbdc3', '#3a708a', '#FFC41C']"
                  :titlecolor="'#FFC41C'"
                />
              </div>
              <span class="leading-6">{{ item }}</span>
            </div>
          </div>
        </dv-border-box-11>
      </div>
    </div>
    <div class="w-12.5% h-full flex flex-col gap-5 min-w-45">
      <div v-for="item in rightBtns" :key="item" class="w-full h-full _btnItem flex-1">
        <dv-border-box-2
          ><span
            class="block w-full h-full flex items-center justify-center text-center box-border p-4"
            >{{ item }}</span
          ></dv-border-box-2
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VChart from 'vue-echarts'
import 'echarts-liquidfill'
import { VueDraggable } from 'vue-draggable-plus'
import PieOptionPage from './PieOptionPage.vue'

// echarts按需引入
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PictorialBarChart, GaugeChart, LineChart } from 'echarts/charts'
import {
  TooltipComponent,
  LegendComponent,
  GridComponent,
  TitleComponent
} from 'echarts/components'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
use([
  CanvasRenderer,
  BarChart,
  PictorialBarChart,
  GaugeChart,
  LineChart,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  GridComponent
])

const leftBtns = ref([
  '2001大供气系统',
  '2001小供气系统',
  '2001辅助气源系统',
  '2002抽气系统',
  '2002a抽气系统在建',
  '2003空气降温系统',
  '2003b空气预处理系统'
])

const rightBtns = ref([
  '2004空气加温系统',
  '2004空气降温系统',
  '自然循环冷却水系统',
  '自然循环冷却水系统a',
  '软化循环冷却水系统',
  '软化循环冷却水系统a',
  '燃油系统'
])

const subsystemList = ref([...leftBtns.value, ...rightBtns.value])

const draggablelist = ref([
  {
    name: '关重设备数量及完好率',
    id: 0
  },
  {
    name: '关重设备投运数量及投运率',
    id: 1
  },
  {
    name: '设备运行台时数',
    id: 2
  }
])

// 定义用于图表的颜色数组，colorLine 用于扇区渐变的起始颜色，colorLegend 用于渐变的结束颜色
const colorLine = ['#3D9DFB', '#3EFDB0', '#FFC41C', '#FC7242']
const colorLegend = ['#000A1B', '#061C2C', '#192120', '#0E1728']
const draggableOptionList = ref({
  // 返回环形图的配置对象
  // 定义图表使用的颜色数组
  color: colorLine,
  // 提示框配置，用于设置鼠标悬浮时显示的信息
  tooltip: {
    trigger: 'item', // 触发类型为 'item'，即每个扇区
    formatter: '{b}: {c} ({d}%)' // 格式化字符串，显示名称、数值和百分比
  },
  // 用于定义图表的数据和样式
  series: [
    // 表示环形图的主要扇区
    {
      name: '', // 系列名称
      type: 'pie', // 图表类型为 'pie'，即饼图
      radius: ['70%', '90%'], // 饼图的内外半径百分比
      // center: ['25%', '50%'], // 饼图的中心位置（这里被注释掉了）
      avoidLabelOverlap: false, // 设置为 false 以允许标签重叠
      itemStyle: {
        // 图表项的样式
        // borderRadius: 10,     // 扇区圆角（这里被注释掉了）
        borderColor: '#fff', // 扇区边框颜色
        borderWidth: 2, // 扇区边框宽度
        normal: {
          // 普通状态下的样式
          // 为扇区设置渐变色
          color: function (params) {
            // 使用回调函数根据数据项的索引设置渐变色
            return {
              type: 'linear', // 渐变类型
              x: 0, // 渐变起点 x 坐标
              y: 0, // 渐变起点 y 坐标
              x2: 1, // 渐变终点 x 坐标
              y2: 1, // 渐变终点 y 坐标
              colorStops: [
                // 颜色停止点数组
                {
                  offset: 0, // 开始位置
                  color: colorLine[params.dataIndex % colorLine.length] // 开始颜色
                },
                {
                  offset: 1, // 结束位置
                  color: colorLegend[params.dataIndex % colorLegend.length] // 结束颜色
                }
              ],
              globalCoord: false // 是否使用全局坐标
            }
          }
        }
      },
      label: {
        normal: {
          // 普通状态下的标签
          show: true, // 显示标签
          position: 'center', // 标签位置为 'center'，即图表中心
          color: '#9A9EBA', // 标签字体颜色
          formatter: function () {
            return '43%'
          },
          fontSize: 28 // 字号
        },
        emphasis: {
          // 鼠标悬浮时的标签样式
          show: true // 显示标签
        },
        position: 'center' // 标签位置为 'center'
      },
      emphasis: {
        // 鼠标悬浮时的样式
        label: {
          // 标签样式
          show: true, // 显示标签
          fontSize: 40, // 字号
          fontWeight: 'bold' // 字重
        }
      },
      labelLine: {
        normal: {
          show: true // 不显示标签的连线
        }
      },
      data: [
        { value: 35, name: '完好率' },
        { value: 45, name: '损失率' },
        { value: 55, name: '总量' },
        { value: 65, name: '总数' }
      ] // 传入的数据项
    },
    // 用于绘制内边框圆，增强视觉效果
    {
      type: 'gauge', // 图表类型为 'gauge'，即仪表盘
      radius: '70%', // 仪表盘半径
      clockwise: true, // 顺时针显示
      startAngle: '90', // 开始角度
      endAngle: '-269.9999', // 结束角度
      splitNumber: 90, // 分割段数
      pointer: {
        // 指针配置
        show: false // 不显示指针
      },
      axisLine: {
        // 坐标轴线配置
        show: false // 不显示坐标轴线
      },
      axisTick: {
        // 坐标轴刻度配置
        show: false // 不显示坐标轴刻度
      },
      tooltip: {
        // 提示框配置
        show: false // 不显示提示框
      },
      splitLine: {
        // 分隔线配置
        show: true, // 显示分隔线
        length: 10, // 分隔线长度
        lineStyle: {
          // 分隔线样式
          color: 'rgba(52, 185, 232, .5)', // 分隔线颜色
          width: 1 // 分隔线宽度
        }
      },
      axisLabel: {
        // 坐标轴标签配置
        show: false // 不显示坐标轴标签
      }
    }
  ]
})

const draggableConfig = ref({
  showValue: true,
  data: [
    {
      name: '2020年',
      value: 167
    },
    {
      name: '2021年',
      value: 67
    },
    {
      name: '2022年',
      value: 123
    }
  ]
})
</script>

<style lang="less" scoped>
._btnItem {
  background-color: rgba(23, 36, 41, 0.6);
  font-size: 18px;
  cursor: pointer;
}
._draggableItem {
  width: calc((100% - 40px) / 3);
  background-color: rgba(23, 36, 41, 0.6);
  overflow: hidden;
}
._subsystem {
  width: calc((100% - 120px) / 7);
  height: calc((100% - 20px) / 2);
}
</style>
