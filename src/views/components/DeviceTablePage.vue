<template>
  <div class="w-full h-full flex flex-col _titlePage">
    <div class="_draggable1 mb-5 w-full">
      <VueDraggable
        class="flex flex-wrap gap-5 w-full h-full"
        v-model="list1"
        :animation="150"
        ghostClass="ghost"
        group="people1"
      >
        <div
          v-for="item in list1"
          :key="item.id"
          class="cursor-pointer _draggableItem border-rd-2 h-full"
        >
          <dv-border-box-11
            :color="['#6fbdc3', '#3a708a']"
            backgroundColor="rgba(40, 51, 52, 0.8)"
            :title="item.name"
            style="font-weight: 600"
          >
            <div class="w-full h-full box-border px-8 pt-12 relative">
              <div class="w-full h-full" id="technologyStatusChartDom" v-if="item.id === 0"></div>
              <div v-show="item.id === 1" class="flex absolute top-16 right-8 z-3">
                <el-date-picker
                  v-model="yearsValue"
                  @change="changeYear"
                  type="year"
                  placeholder="Pick a year"
                />
              </div>
              <div class="w-full h-full" id="runTimeChartDom" v-if="item.id === 1"></div>
              <div class="w-full h-full" id="useStatusChartDom" v-if="item.id === 2"></div>
              <NoData v-if="item.id === 1 && isRunTimeNoData" />
            </div>
          </dv-border-box-11>
        </div>
      </VueDraggable>
    </div>

    <div class="flex-1 w-full">
      <dv-border-box-11
        :color="['#6fbdc3', '#3a708a']"
        backgroundColor="rgba(40, 51, 52, 0.8)"
        :title="props.tableTitle"
        style="font-weight: 600"
      >
        <div class="w-full h-full box-border px-8 pt-15 overflow-auto">
          <!-- <el-table :data="deviceDetailData" stripe>
            <el-table-column prop="name" label="设备状态要素">
              <template #default="scope">
                <span>{{ scope.row.name }} h</span>
              </template>
            </el-table-column>
            <el-table-column prop="technologyType" label="当前技术状态">
              <template #default="scope">
                <span>{{ scope.row.technologyType }} h</span>
              </template>
            </el-table-column>
            <el-table-column prop="useType" label="当前使用状态">
              <template #default="scope">
                <span>{{ scope.row.useType }} h</span>
              </template>
            </el-table-column>
            <el-table-column prop="todayRunTime" label="当日运行时长数">
              <template #default="scope">
                <span>{{ scope.row.todayRunTime }} h</span>
              </template>
            </el-table-column>
            <el-table-column prop="weekRunTime" label="本周运行时长数">
              <template #default="scope">
                <span>{{ scope.row.weekRunTime }} h</span>
              </template>
            </el-table-column>
            <el-table-column prop="monthRunTime" label="本月运行时长数">
              <template #default="scope">
                <span>{{ scope.row.monthRunTime }} h</span>
              </template>
            </el-table-column>
            <el-table-column prop="quarterRunTime" label="本季度运行时长数">
              <template #default="scope">
                <span>{{ scope.row.quarterRunTime }} h</span>
              </template>
            </el-table-column>
            <el-table-column prop="yearRunTime" label="本年运行时长数">
              <template #default="scope">
                <span>{{ scope.row.yearRunTime }} h</span>
              </template>
            </el-table-column>
            <el-table-column prop="totalRunTime" label="累计运行时长数">
              <template #default="scope">
                <span>{{ scope.row.totalRunTime }} h</span>
              </template>
            </el-table-column>
          </el-table> -->
          <!-- <div class="w-full h-[98%]"> </div> -->
          <el-table :data="getValues()">
            <el-table-column
              v-for="(item, index) in getHeaders()"
              :key="index"
              :prop="item"
              align="center"
            />
          </el-table>
        </div>
      </dv-border-box-11>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import 'echarts-liquidfill'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import NoData from './NoData.vue'
import { VueDraggable } from 'vue-draggable-plus'

import { getTechnologyStatus, getUseStatus, getRunTime, getSystem } from '@/api/index.ts'

// echarts按需引入
import { use } from 'echarts/core'
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
import * as echarts from 'echarts'

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
  tableTitle: {
    type: String,
    default: () => ''
  },
  deviceId: {
    type: Number,
    required: true
  }
})

const systems = [
  { id: 0, name: '2001大供气系统' },
  { id: 1, name: '2001小供气系统' },
  { id: 2, name: '2001辅助气源系统' },
  { id: 3, name: '2002抽气系统' },
  { id: 4, name: '2002a抽气系统' },
  { id: 5, name: '2003空气降温系统-主气路空气预处理系统' },
  { id: 6, name: '2003空气降温系统-冷源气路空气预处理系统' },
  { id: 7, name: '2003空气降温系统-冷源气路空气预处理系统膨胀涡轮' },
  { id: 8, name: '2003b空气预处理系统-压力干燥系统-干燥单元' },
  { id: 9, name: '2003b空气预处理系统-压力干燥系统-汽波机' },
  { id: 10, name: '2003b空气预处理系统-大气进气系统' },
  { id: 11, name: '2004空气加温系统-低压加温炉' },
  { id: 12, name: '2004空气加温系统-中压加温炉' },
  { id: 13, name: '2004空气加温系统-燃气蒸汽锅炉' },
  { id: 14, name: '2004空气降温系统-28kg/s空气预处理系统' },
  { id: 15, name: '2004空气降温系统-56kg/s空气预处理设备' },
  { id: 16, name: '2004空气降温系统-气波机' },
  { id: 17, name: '自然循环冷却水系统-6021取水泵房' },
  { id: 18, name: '自然循环冷却水系统-6023提升泵房' },
  { id: 19, name: '自然循环冷却水系统-6001泵房' },
  { id: 20, name: '自然循环冷却水系统-6005泵房' },
  { id: 21, name: '自然循环冷却水系统-6007泵房' },
  { id: 22, name: '自然循环冷却水系统-6001a冷却塔' },
  { id: 23, name: '燃油系统 -6201油库-供油罐' },
  { id: 24, name: '燃油系统 -6201油库-回油罐' },
  { id: 25, name: '燃油系统 -6202油库-供油罐' },
  { id: 26, name: '燃油系统 -6202油库-回油罐' },
  { id: 27, name: '软化循环冷却水系统a--6002b泵房' },
  { id: 28, name: '软化循环冷却水系统a--6003a泵房' },
  { id: 29, name: '软化循环冷却水系统a--6002c冷却塔' },
  { id: 30, name: '软化循环冷却水系统a--6002d冷却塔' },
  { id: 31, name: '软化循环冷却水系统a--6012泵房' },
  { id: 32, name: '软化循环冷却水系统--6002泵房' },
  { id: 33, name: '软化循环冷却水系统--6003a泵房' },
  { id: 34, name: '软化循环冷却水系统--6006泵房' },
  { id: 35, name: '软化循环冷却水系统--6007泵房' },
  { id: 36, name: '软化循环冷却水系统--6002a冷却塔' },
  { id: 37, name: '自然循环冷却水系统a - 6001b泵房' },
  { id: 38, name: '自然循环冷却水系统a - 6001cl冷却塔' },
  { id: 39, name: '2003空气降温系统 - 主气路空气预处理系统' },
  { id: 40, name: '2003空气降温系统 - 冷源气路空气预处理系统' },
  { id: 41, name: '2003空气降温系统 -膨胀涡轮' },
  { id: 100, name: '2001小供气系统2' }
]

const yearsValue = ref<string>(dayjs().locale('zh-cn').format('YYYY'))
const list1 = ref([
  {
    name: '当前技术状态',
    id: 0
  },
  {
    name: '运行时长数',
    id: 1
  },
  {
    name: '当前使用状态',
    id: 2
  }
])

// 当前技术状态
const GetTechnologyStatus = async () => {
  const chartData = ref<any>([]) // 如果不需要响应式，可直接使用普通数组
  try {
    const res = await getTechnologyStatus(props.deviceId)

    if (res && res.data) {
      // 遍历对象的键值对，并转换为所需格式
      Object.entries(res.data).forEach(([key, value]) => {
        chartData.value.push({
          name: key,
          value: value
        })
      })
    }

    // 初始化图表
    initTechnologyStatusChart(chartData.value)
  } catch (error) {
    console.error('Error caught:', error)
  }
}

const initTechnologyStatusChart = (data) => {
  let option = {
    tooltip: {
      trigger: 'item',
      show: true
    },
    legend: {
      show: true,
      orient: 'vertical',
      top: 'center',
      left: 'right',
      itemGap: 20,
      textStyle: {
        //图例文字的样式
        color: '#B0E2FF',
        fontSize: 14
      }
    },
    series: [
      {
        name: '内边框', // 系列名称
        type: 'pie', // 图表类型为 'pie'，即饼图
        clockWise: true, // 顺时针显示
        silent: true, // 关闭鼠标悬浮提示
        animation: true, // 开启动画效果
        radius: ['15%'], // 边框半径百分比
        labelLine: {
          normal: {
            show: false // 不显示标签的连线
          }
        },
        data: [
          // 数据项
          {
            value: 1, // 数据值
            itemStyle: {
              color: '#FFF'
            }
          }
        ]
      },
      {
        name: '',
        type: 'pie',
        radius: ['15%', '65%'],
        roseType: 'area', // 设置环形图的内外半径，实现环形效果
        // avoidLabelOverlap: false,
        label: {
          show: false
        },
        labelLine: {
          normal: {
            show: false // 不显示标签的连线
          }
        },
        data: data
        // [
        //   { value: 25, name: '完好状态' },
        //   { value: 35, name: '调试状态' },
        //   { value: 45, name: '检修状态' },
        //   { value: 55, name: '在建状态' }
        // ]
      }
    ]
  }
  const technologyStatusChartDom = echarts.init(document.getElementById('technologyStatusChartDom'))
  technologyStatusChartDom.setOption(option)
}

//当前使用状态
const GetUseStatus = async () => {
  const chartData = ref<any>([]) // 如果不需要响应式，可直接使用普通数组
  try {
    const res = await getUseStatus(props.deviceId)

    if (res && res.data) {
      // 遍历对象的键值对，并转换为所需格式
      Object.entries(res.data).forEach(([key, value]) => {
        chartData.value.push({
          name: key,
          value: value
        })
      })
    }

    // 初始化图表
    initUseStatusChart(chartData.value)
  } catch (error) {
    console.error('Error caught:', error)
  }
}

const initUseStatusChart = (data) => {
  let option = {
    tooltip: {
      trigger: 'item',
      show: true
    },
    legend: {
      show: true,
      orient: 'vertical',
      top: 'center',
      left: 'right',
      itemGap: 20,
      textStyle: {
        //图例文字的样式
        color: '#B0E2FF',
        fontSize: 14
      }
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['55%', '75%'], // 设置环形图的内外半径，实现环形效果
        avoidLabelOverlap: false,
        label: {
          position: 'center',
          show: false,
          formatter: function () {
            let str = '30%'
            return str
          },
          color: '#fff', // 标签的颜色
          fontSize: 30, // 标签的字体大小
          fontWeight: 600
        },
        labelLine: {
          normal: {
            show: false // 不显示标签的连线
          }
        },
        data: data
      }
    ]
  }
  const useStatusChartDom = echarts.init(document.getElementById('useStatusChartDom'))
  useStatusChartDom.setOption(option)
}

//当前运行时长数
const isRunTimeNoData = ref<boolean>(false)
const GetRunTime = async () => {
  const chartDate = ref<any>([])
  const chartData = ref<any>([])
  try {
    const res = await getRunTime({
      id: props.deviceId,
      year: dayjs(yearsValue.value).locale('zh-cn').format('YYYY')
    })
    if (res && res.data) {
      // 遍历对象的键值对，并转换为所需格式
      Object.entries(res.data).forEach(([key, value]) => {
        chartDate.value.push(key)
        chartData.value.push(value)
      })
      chartDate.value.length === 0
        ? (isRunTimeNoData.value = true)
        : (isRunTimeNoData.value = false)
    }
    // 初始化图表
    initRunTimeChart(chartDate.value, chartData.value)
  } catch (error) {
    console.error('Error caught:', error)
  }
}

const initRunTimeChart = (date, data) => {
  let option = {
    color: ['#00B09C', '#93cc79', '#f9c761'],
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      textStyle: {
        color: '#ffffff'
      },
      icon: 'rect',
      itemWidth: 14,
      itemHeight: 3
    },
    xAxis: {
      data: date,
      type: 'category',
      nameLocation: 'middle',
      //刻度线
      axisLine: {
        lineStyle: {
          color: '#cbcbcb'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#cbcbcb'
        },
        alignWithLabel: true
      },
      axisLabel: {
        color: '#999999'
      },
      // 鼠标悬浮阴影
      axisPointer: {
        type: 'shadow'
      }
    },
    yAxis: {
      scale: true,
      splitLine: {
        show: false,
        lineStyle: {
          color: 'rgba(30,163,255,0.3)'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#cbcbcb'
        }
      },
      axisLabel: {
        color: '#999999'
      }
    },
    grid: {
      top: '15%',
      left: '2%',
      right: '2%',
      bottom: '25%',
      containLabel: true
    },
    series: [
      // 第一个圆柱顶部的椭圆形
      {
        type: 'pictorialBar', //pictorialBar(象形柱图)
        symbolSize: [14, 8], //椭圆的大小[宽，高]
        symbolOffset: [0, -4], //图形偏移[x轴，y轴]，不确定的话，可以微调，本实例x轴叠加了柱状之间的间距[-7+(间距7/2),y轴]
        z: 12, //图形的层级，控制图形的前后顺序，z值小的图形会被z值大的图形覆盖
        symbolPosition: 'end', //椭圆位置，默认'start'，在最底下，end是最上面
        itemStyle: {
          color: 'rgba(18,204,180,0.9)'
        },
        data: data
      },
      {
        name: '',
        data: data,
        type: 'bar',
        barWidth: 14,
        barGap: '50%', //柱状图间距，此处为14*50%=7
        itemStyle: {
          // 图形样式
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0, // 0%处的颜色
              color: 'rgba(18,204,180,0.9)'
            },
            {
              offset: 1, // 100%处的颜色
              color: 'rgba(18,204,180,0.5)'
            }
          ])
        }
      }
    ]
  }

  const runTimeChartDom = echarts.init(document.getElementById('runTimeChartDom'))
  runTimeChartDom.setOption(option)
}

const changeYear = () => {
  GetRunTime()
}

//获取每台设备运行详情
const deviceDetailData = ref<any>([
  {
    id: 90,
    monthRunTime: 0,
    name: '测试1',
    quarterRunTime: 0,
    technologyType: '1',
    todayRunTime: 0,
    totalRunTime: 2561,
    type: 100,
    useType: '2',
    weekRunTime: 0,
    yearRunTime: 2561
  },
  {
    id: 91,
    monthRunTime: 0,
    name: '测试1',
    quarterRunTime: 0,
    technologyType: '1',
    todayRunTime: 0,
    totalRunTime: 2561,
    type: 100,
    useType: '2',
    weekRunTime: 0,
    yearRunTime: 2561
  },
  {
    id: 92,
    monthRunTime: 0,
    name: '测试1',
    quarterRunTime: 0,
    technologyType: '1',
    todayRunTime: 0,
    totalRunTime: 2561,
    type: 100,
    useType: '2',
    weekRunTime: 0,
    yearRunTime: 2561
  }
])

const headers = [
  { label: '设备状态要素', value: 'name' },
  { label: '当前技术状态', value: 'technologyType' },
  { label: '当前使用状态', value: 'useType' },
  { label: '当日运行时长数', value: 'todayRunTime' },
  { label: '本周运行时长数', value: 'weekRunTime' },
  { label: '本月运行时长数', value: 'monthRunTime' },
  { label: '本季度运行时长数', value: 'quarterRunTime' },
  { label: '本年运行时长数', value: 'yearRunTime' },
  { label: '累计运行时长数', value: 'totalRunTime' }
]

const getHeaders = () => {
  return deviceDetailData.value.reduce((pre, _cur, index) => pre.concat(`value${index}`), ['title'])
}
const getValues = () => {
  return headers.map((item) => {
    return deviceDetailData.value.reduce(
      (pre, cur, index) => Object.assign(pre, { ['value' + index]: cur[item.value] }),
      { title: item.label }
    )
  })
}

const GetSystem = async () => {
  await getSystem(props.deviceId).then((res) => {
    console.log(res.data)
    // deviceDetailData.value = res.data.systemDetailVoList
  })
}

onMounted(() => {
  GetTechnologyStatus()
  GetUseStatus()
  GetRunTime()
  GetSystem()
})
</script>

<style lang="less">
._titlePage {
  ._draggable1 {
    height: calc((100% - 20px) / 3);
    ._draggableItem {
      width: calc((100% - 40px) / 3);
      overflow: hidden;
    }
  }
  .el-select__wrapper {
    background-color: rgba(23, 36, 41, 0.6) !important;
  }
}
</style>
