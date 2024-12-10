<template>
  <div class="w-full h-full" v-if="showTable">
    <DeviceTablePage :deviceId="deviceId" :tableTitle="tableTitle" />
  </div>
  <div class="w-full h-full flex gap-5" v-else>
    <div class="w-12.5% h-full flex flex-col gap-5 min-w-45">
      <div
        v-for="item in leftBtns"
        :key="item.id"
        class="w-full h-full _btnItem flex-1"
        @click="toTable(item)"
      >
        <dv-border-box-2
          ><span
            class="block w-full h-full flex items-center justify-center text-center box-border p-4"
            >{{ item.name }}</span
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
                <div class="flex-1 flex" v-if="item.name === '关重设备数量及完好率'">
                  <div class="w-[30%] h-full flex flex-col justify-center items-center">
                    <img src="@/assets/image/device.svg" alt="" />
                    <span class="block text-8 font-bold color-[#e29c44] py-3">{{
                      availabilityData.equipmentCount
                    }}</span>
                    <span class="block text-4 text-center">设备数量</span>
                  </div>
                  <div class="flex-1">
                    <div class="w-full h-full" id="availabilityChartDom"></div>
                  </div>
                </div>
                <div class="flex-1 flex" v-if="item.name === '关重设备投运数量及投运率'">
                  <div class="w-[30%] h-full flex flex-col justify-center items-center">
                    <img src="@/assets/image/device.svg" alt="" />
                    <span class="block text-8 font-bold color-[#e29c44] py-3">{{
                      workingData.equipmentCount
                    }}</span>
                    <span class="block text-4 text-center">设备数量</span>
                  </div>
                  <div class="flex-1">
                    <div class="w-full h-full" id="workingChartDom"></div>
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
                  :value="item.rate || 0"
                  :color="['#6fbdc3', '#3a708a', '#FFC41C']"
                  :titlecolor="'#FFC41C'"
                />
              </div>
              <span class="text-center block h-[20%]">{{ item.name }}</span>
            </div>
          </div>
        </dv-border-box-11>
      </div>
    </div>
    <div class="w-12.5% h-full flex flex-col gap-5 min-w-45">
      <div
        v-for="item in rightBtns"
        :key="item.id"
        class="w-full h-full _btnItem flex-1"
        @click="toTable(item)"
      >
        <dv-border-box-2
          ><span
            class="block w-full h-full flex items-center justify-center text-center box-border p-4"
            >{{ item.name }}</span
          ></dv-border-box-2
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import 'echarts-liquidfill'
import { VueDraggable } from 'vue-draggable-plus'
import PieOptionPage from '../../components/PieOptionPage.vue'
import DeviceTablePage from '../../components/DeviceTablePage.vue'
import { getSystemTypeList, getAvailability, getWorking, getRunTimeForYear } from '@/api/index.ts'

const emit = defineEmits(['to-table'])

// echarts按需引入
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PictorialBarChart, GaugeChart, LineChart } from 'echarts/charts'
import * as echarts from 'echarts'
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

const props = defineProps({
  showMenu: {
    type: Boolean,
    default: () => false
  }
})

const showTable = ref<Boolean>(false)

watch(props, (newValue) => {
  showTable.value = !newValue.showMenu
  if (!showTable.value) {
    GetAvailability()
    GetWorking()
  }
})

const tableTitle = ref<string>('')
const deviceId = ref<any>()

const toTable = (item) => {
  deviceId.value = item.id
  showTable.value = true
  tableTitle.value = item.name
  emit('to-table', item.name)
}

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

// ----------------------------------------------------------------获取设备系统
const leftBtns = ref<any>([])
const rightBtns = ref<any>([])
const subsystemList = ref<any>([])

const GetSystemTypeList = async () => {
  await getSystemTypeList().then((res) => {
    let length = res.data.length
    let halfLength = Math.ceil(length / 2)
    leftBtns.value = res.data.slice(0, halfLength)
    rightBtns.value = res.data.slice(halfLength)
    subsystemList.value = res.data
  })
}

// ----------------------------------------------------------------关重设备数量及完好率
const availabilityData = ref<any>({})
const GetAvailability = () => {
  getAvailability().then((res) => {
    availabilityData.value = res.data
    initGaugeChart('availability', availabilityData.value.rate)
  })
}

// -----------------------------------------------------------------关重设备投运数量及投运率
const workingData = ref<any>({})
const GetWorking = () => {
  getWorking().then((res) => {
    workingData.value = res.data
    initGaugeChart('working', workingData.value.rate)
  })
}

// 定义用于图表的颜色数组，colorLine 用于扇区渐变的起始颜色，colorLegend 用于渐变的结束颜色
const colorLine = ['#3D9DFB', '#3EFDB0', '#FFC41C', '#FC7242']
const colorLegend = ['#000A1B', '#061C2C', '#192120', '#0E1728']
const initGaugeChart = (type, data) => {
  let option = {
    // 返回环形图的配置对象
    // 定义图表使用的颜色数组
    color: colorLine,
    // 提示框配置，用于设置鼠标悬浮时显示的信息
    tooltip: {
      show: false,
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
              return `${data}%`
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
          { value: 35, name: '' },
          { value: 45, name: '' },
          { value: 55, name: '' },
          { value: 65, name: '' }
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
  }
  const availabilityChartDom = echarts.init(document.getElementById('availabilityChartDom'))
  const workingChartDom = echarts.init(document.getElementById('workingChartDom'))
  type === 'availability'
    ? availabilityChartDom.setOption(option)
    : workingChartDom.setOption(option)
}

// -----------------------------------------------------------------设备运行台时数
const GetRunTimeForYear = async () => {
  getRunTimeForYear().then((res) => {
    for (let key in res.data) {
      draggableConfig.value.data.push({ name: key, value: res.data[key] })
    }
  })
}
const draggableConfig = ref<any>({
  showValue: true,
  data: []
})

onMounted(() => {
  GetSystemTypeList()
  GetAvailability()
  GetWorking()
  GetRunTimeForYear()
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
