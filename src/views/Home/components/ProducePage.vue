<script setup lang="ts">
import { onMounted, ref, nextTick, watch } from 'vue'
import 'echarts-liquidfill'
import { VueDraggable } from 'vue-draggable-plus'
import {
  getPlanMaintenance,
  getPlanTechnical,
  getPlanRepair,
  getPlanExperiment,
  getPlantEmporaryList
} from '@/api/index.ts'
import NoData from '../../components/NoData.vue'
import PlanMaintenance from '../../components/PlanMaintenance.vue'
import PlanExperiment from '../../components/PlanExperiment.vue'

// echarts按需引入
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PictorialBarChart, GaugeChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import * as echarts from 'echarts'

use([
  CanvasRenderer,
  BarChart,
  PictorialBarChart,
  GaugeChart,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

const props = defineProps({
  showMenu: {
    type: Boolean,
    default: () => false
  }
})

const emit = defineEmits(['to-table'])

const showTable = ref<Boolean>(false)
const showPlanExperiment = ref<Boolean>(false)
const showType = ref<string>('')
watch(props, (newValue) => {
  showType.value === '保养任务模块'
    ? (showTable.value = !newValue.showMenu)
    : (showPlanExperiment.value = !newValue.showMenu)
  if (newValue.showMenu) {
    GetPlanExperiment()
    GetPlanMaintenance()
    GetPlanTechnical()
    GetPlanRepair()
  }
})

const tableTitle = ref<string>('')
//打开保养
const toTable = (name) => {
  showType.value = '保养任务模块'
  showTable.value = true
  tableTitle.value = name
  emit('to-table', name)
}

//打开实验计划
const clickExperiment = (name) => {
  showType.value = '实验计划模块'
  showPlanExperiment.value = true
  tableTitle.value = name
  emit('to-table', name)
}

// 页面模块
const list1 = ref([
  {
    name: '实验计划模块',
    id: '1'
  },
  {
    name: '保养任务模块',
    id: '2'
  },
  {
    name: '技改任务模块',
    id: '3'
  },
  {
    name: '维修任务模块',
    id: '4'
  }
])

//--------------------------------------------------------------------------------------------保养任务板块
const planMaintenanceData = ref<any>({
  oneCompleteRate: 0,
  twoCompleteRate: 0,
  oneData: [],
  twoData: []
})
// ----获取数据
const GetPlanMaintenance = async () => {
  await getPlanMaintenance().then((res) => {
    if (res && res.data) {
      planMaintenanceData.value.oneData = []
      planMaintenanceData.value.twoData = []
      planMaintenanceData.value.oneCompleteRate = res.data.oneCompleteRate
      planMaintenanceData.value.twoCompleteRate = res.data.twoCompleteRate
      for (let key in res.data.one) {
        if (res.data.one.hasOwnProperty(key)) {
          planMaintenanceData.value.oneData.push(res.data.one[key] + 1)
        }
      }
      for (let key in res.data.two) {
        if (res.data.two.hasOwnProperty(key)) {
          planMaintenanceData.value.twoData.push(res.data.two[key] + 2)
        }
      }
    }
  })
  //初始化图表
  initBarChart(planMaintenanceData.value.oneData, planMaintenanceData.value.twoData)
}
//----初始化柱状图图表
const initBarChart = (data1, data2) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      textStyle: {
        color: '#ffffff'
      },
      icon: 'rect',
      itemWidth: 20,
      itemHeight: 3
    },
    xAxis: {
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
      // scale: true,
      splitLine: {
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
      bottom: '15%',
      containLabel: true
    },
    series: [
      {
        name: '一级保养',
        type: 'bar',
        data: data1,
        itemStyle: {
          // 图形样式
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0, // 0%处的颜色
              color: 'rgba(139, 139, 0,1)'
            },
            {
              offset: 1, // 100%处的颜色
              color: 'rgba(205, 205, 0,1)'
            }
          ])
        }
      },
      {
        name: '二级保养',
        type: 'bar',
        data: data2,
        itemStyle: {
          // 图形样式
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0, // 0%处的颜色
              color: 'rgba(21, 147, 197,1)'
            },
            {
              offset: 1, // 100%处的颜色
              color: 'rgba(12, 97, 162,1)'
            }
          ])
        }
      }
    ]
  }
  const chart = echarts.init(document.getElementById('maintenanceBarChartDom'))
  chart.setOption(option)
}

//--------------------------------------------------------------------------------------------技改任务模块
const planTechnicalData = ref<any>([])
// ----获取数据
const GetPlanTechnical = async () => {
  await getPlanTechnical().then((res) => {
    if (res && res.data) {
      planTechnicalData.value = []
      for (let key in res.data) {
        planTechnicalData.value.push({ name: key, value: res.data[key] })
      }
    }
  })
  //初始化图表
  initPlanTechnicalPieChart()
}
// ----扇形图
const initPlanTechnicalPieChart = () => {
  planTechnicalData.value.forEach((element, index) => {
    const chart = echarts.init(document.getElementById(`planTechnicalPieChartDom${index}`))
    chart.setOption({
      grid: {
        top: '15%',
        left: '2%',
        right: '2%',
        bottom: '15%',
        containLabel: true
      },
      tooltip: {
        trigger: 'item',
        show: false
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['65%', '85%'], // 设置环形图的内外半径，实现环形效果
          avoidLabelOverlap: false,
          label: {
            position: 'center',
            show: true,
            formatter: function () {
              let str = element.value
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
          data: [
            { value: 100, name: '' },
            { value: element.value, name: '' }
          ]
        }
      ]
    })
  })
}

//--------------------------------------------------------------------------------------------维修任务板块
const planRepaiData = ref<any>({})
// ----获取数据
const GetPlanRepair = async () => {
  await getPlanRepair().then((res) => {
    if (res && res.data) {
      planRepaiData.value = res.data
      //初始化水波球
    }
  })
  initPlanRepaiLiquidFillChart()
  initPlanRepaiPieChart(planRepaiData.value.yearTaskRate)
}
// ----水波球
const initPlanRepaiLiquidFillChart = () => {
  let option = {
    grid: {
      top: '15%',
      left: '2%',
      right: '2%',
      bottom: '15%',
      containLabel: true
    },
    series: [
      {
        type: 'liquidFill',
        data: [0.5],
        radius: '95%', // 半径
        shape: 'circle', // 改变水球图的形状，比如 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
        color: ['#16c0ac'], // 修改波浪的颜色，并会自动与 data 中的数据从大到小进行映射，如，red-0.68；blue-0.5；yellow-0.4
        itemStyle: {
          // 设置水球透明度
          opacity: 0.7
        },
        amplitude: 10, // 控制波浪的振幅，为 0，怎会变为直线的波纹并且波浪为静止，如果给 10，波纹明显幅度变小，50 则会很陡峭
        backgroundStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#FFF' }, // 渐变色起始点颜色，透明度为0.1
            { offset: 1, color: 'rgba(135,218,245, 1)' } // 渐变色结束点颜色，透明度为1
          ]), // 修改背景颜色
          borderWidth: 8, // 修改背景边框宽度
          borderColor: '#4b638e' // 修改背景边框的颜色
        },
        outline: {
          // 修改外层样式
          show: true,
          borderDistance: 4, // 设置和外层轮廓的间距
          itemStyle: {
            borderWidth: 8, // 设置外层边框宽度
            borderColor: '#224057', // 设置外层边框颜色
            shadowBlur: 'none' // 消除外层边框阴影
          }
        },
        label: {
          show: false
        }
      }
    ]
  }
  const plantemporaryNum = echarts.init(document.getElementById('plantemporaryNum'))
  const monthTaskNum = echarts.init(document.getElementById('monthTaskNum'))
  plantemporaryNum.setOption(option)
  monthTaskNum.setOption(option)
}
// ----仪表盘
// 定义用于图表的颜色数组，colorLine 用于扇区渐变的起始颜色，colorLegend 用于渐变的结束颜色
const colorLine = ['#3D9DFB', '#3EFDB0', '#FFC41C', '#FC7242']
const colorLegend = ['#000A1B', '#061C2C', '#192120', '#0E1728']
const initPlanRepaiPieChart = (value) => {
  let option = {
    // 返回环形图的配置对象
    // 定义图表使用的颜色数组
    color: colorLine,
    // 网格配置，用于控制图表元素的位置和间距
    grid: {
      left: 20, // 左侧边距
      right: 20, // 右侧边距
      top: 20, // 上边距
      bottom: 20 // 下边距
    },
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
        radius: ['70%', '92%'], // 饼图的内外半径百分比
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
              return value ? `${value}%` : `0%`
            },
            fontSize: 26 // 字号
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
            show: false // 不显示标签的连线
          }
        },
        data: [50, 50, 50, 50] // 传入的数据项
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
      },
      // 用于绘制外边框圆，增强视觉效果
      {
        name: '外边框', // 系列名称
        type: 'pie', // 图表类型为 'pie'，即饼图
        clockWise: true, // 顺时针显示
        silent: true, // 关闭鼠标悬浮提示
        animation: true, // 开启动画效果
        radius: ['98%', '100%'], // 边框半径百分比
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
              // 样式配置
              normal: {
                // 普通状态下的样式
                borderWidth: 1, // 边框宽度
                borderColor: '#DFE1E6' // 边框颜色
              }
            }
          }
        ]
      }
    ]
  }
  const yearTaskRate = echarts.init(document.getElementById('yearTaskRate'))
  yearTaskRate.setOption(option)
}

//--------------------------------------------------------------------------------------------实验计划模块
const planExperimentData = ref<any>({
  todayCount: 0,
  weekCount: 0,
  xDate: [],
  xData: []
})
const GetPlanExperiment = async () => {
  await getPlanExperiment().then((res) => {
    planExperimentData.value.xDate = []
    planExperimentData.value.xData = []
    planExperimentData.value.todayCount = res.data.todayCount
    planExperimentData.value.weekCount = res.data.weekCount
    for (let key in res.data.dayOfWeekCountMap) {
      planExperimentData.value.xDate.push(key)
      planExperimentData.value.xData.push(res.data.dayOfWeekCountMap[key])
    }
  })
  initPlanExperimentBarChart()
}

const initPlanExperimentBarChart = () => {
  let option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      textStyle: {
        color: '#ffffff'
      },
      icon: 'rect',
      itemWidth: 24,
      itemHeight: 3
    },
    xAxis: {
      data: planExperimentData.value.xDate,
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
      bottom: '15%',
      containLabel: true
    },
    series: [
      // 第一个圆柱顶部的椭圆形
      {
        type: 'pictorialBar', //pictorialBar(象形柱图)
        symbolSize: [24, 8], //椭圆的大小[宽，高]
        symbolOffset: [0, -4], //图形偏移[x轴，y轴]，不确定的话，可以微调，本实例x轴叠加了柱状之间的间距[-7+(间距7/2),y轴]
        z: 12, //图形的层级，控制图形的前后顺序，z值小的图形会被z值大的图形覆盖
        symbolPosition: 'end', //椭圆位置，默认'start'，在最底下，end是最上面
        itemStyle: {
          color: '#9AC8EC'
        },
        data: planExperimentData.value.xData
      },
      {
        name: '',
        data: planExperimentData.value.xData,
        type: 'bar',
        barWidth: 24,
        barGap: '50%', //柱状图间距，此处为24*50%=7
        itemStyle: {
          // 图形样式
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0, // 0%处的颜色
              color: 'rgba(21, 247, 197,1)'
            },
            {
              offset: 1, // 100%处的颜色
              color: 'rgba(12, 97, 162,1)'
            }
          ])
        }
      },
      // 第一个圆柱底部的椭圆形
      {
        type: 'pictorialBar',
        symbolSize: [24, 8],
        symbolOffset: [0, 4],
        z: 12,
        itemStyle: {
          color: '#0E6EB8'
        },
        data: planExperimentData.value.xData
      }
    ]
  }
  const experimentBarChartDom = echarts.init(document.getElementById('experimentBarChartDom'))
  experimentBarChartDom.setOption(option)
}

//本周临时维修
const showPlantEmporary = ref<boolean>(false)
const openPlantEmporary = () => {
  showPlantEmporary.value = true
  GetPlantEmporaryList()
}

const plantEmporaryList = ref<any>([])
const GetPlantEmporaryList = async () => {
  getPlantEmporaryList().then((res) => {
    plantEmporaryList.value = res.rows
  })
}

onMounted(() => {
  nextTick(() => {
    GetPlanExperiment()
    GetPlanMaintenance()
    GetPlanTechnical()
    GetPlanRepair()
  })
})
</script>

<template>
  <div class="w-full h-full _producePage">
    <PlanMaintenance :tableTitle="tableTitle" v-if="showTable" />
    <PlanExperiment :tableTitle="tableTitle" v-if="showPlanExperiment" />
    <VueDraggable
      v-if="!showTable && !showPlanExperiment"
      class="flex flex-wrap gap-5 w-full h-full"
      v-model="list1"
      :animation="150"
      ghostClass="ghost"
      group="people"
    >
      <div v-for="item in list1" :key="item.id" class="cursor-pointer _draggableItem border-rd-2">
        <dv-border-box-1>
          <div class="w-full h-full box-border p-4 flex flex-col">
            <div class="xl:flex justify-between mt-6">
              <dv-decoration-11 style="width: 200px; height: 60px">{{
                item.name
              }}</dv-decoration-11>
              <div class="relative flex flex-justify-end pr-20" v-if="item.name === '实验计划模块'">
                <div class="absolute bottom-0 right-4 w-[420px] h-[20px]">
                  <dv-decoration-8 :reverse="true" style="width: 420px; height: 30px" />
                </div>
                <div class="_chengeBtn mr-4" @click="clickExperiment('实验日生产计划')">
                  <dv-border-box-6 backgroundColor="#26495c">日计划</dv-border-box-6>
                </div>
                <div class="_chengeBtn mr-4" @click="clickExperiment('周实验计划排产表')">
                  <dv-border-box-6 backgroundColor="#26495c">周计划</dv-border-box-6>
                </div>
                <div class="_chengeBtn" @click="clickExperiment('年度生产计划')">
                  <dv-border-box-6 backgroundColor="#26495c">年计划</dv-border-box-6>
                </div>
              </div>
              <div class="relative flex flex-justify-end pr-20" v-if="item.name === '保养任务模块'">
                <div class="absolute bottom-0 right-4 w-[300px] h-[20px]">
                  <dv-decoration-8 :reverse="true" style="width: 300px; height: 30px" />
                </div>
                <div class="_chengeBtn mr-4">
                  <dv-border-box-6 @click="toTable('一级保养')" backgroundColor="#26495c"
                    >一级保养</dv-border-box-6
                  >
                </div>
                <div class="_chengeBtn">
                  <dv-border-box-6 @click="toTable('二级保养')" backgroundColor="#26495c"
                    >二级保养</dv-border-box-6
                  >
                </div>
              </div>
            </div>
            <div v-if="item.name === '实验计划模块'" class="flex-1 flex box-border">
              <div class="flex-1 h-full">
                <div class="w-full h-full" id="experimentBarChartDom"></div>
              </div>
              <div
                class="w-[200px] h-full ml-4 _experimentRight flex flex-col pt-8 box-border text-5"
              >
                <div class="h-1/2 flex flex-col items-center border-rd-2 box-border">
                  <dv-decoration-9 style="height: 10.5vh; width: 10.5vh">{{
                    planExperimentData.todayCount
                  }}</dv-decoration-9>
                  <span class="block pt-2">日实验总量</span>
                </div>
                <div class="h-1/2 flex flex-col items-center border-rd-2 box-border">
                  <dv-decoration-9 style="width: 10.5vh; height: 10.5vh">{{
                    planExperimentData.weekCount
                  }}</dv-decoration-9>
                  <span class="block pt-2">周实验总量</span>
                </div>
              </div>
            </div>
            <div v-if="item.name === '保养任务模块'" class="flex-1 flex box-border">
              <div class="flex-1 h-full">
                <div class="w-full h-full" id="maintenanceBarChartDom"></div>
              </div>
              <div class="w-[200px] h-full ml-4 box-border pt-10 relative flex flex-col">
                <div class="h-1/2 flex flex-col items-center border-rd-2 box-border">
                  <dv-decoration-9 style="width: 10.5vh; height: 10.5vh"
                    >{{ planMaintenanceData.oneCompleteRate }}%</dv-decoration-9
                  >
                  <span class="text-5 pt-2">一保完成率</span>
                </div>
                <div class="h-1/2 flex flex-col items-center border-rd-2 box-border">
                  <dv-decoration-9 style="width: 10.5vh; height: 10.5vh"
                    >{{ planMaintenanceData.twoCompleteRate }}%</dv-decoration-9
                  >
                  <span class="text-5 pt-2">二保完成率</span>
                </div>
              </div>
            </div>
            <div v-if="item.name === '技改任务模块'" class="flex-1 box-border text-5.5">
              <NoData class="w-50 ma" v-if="!planTechnicalData.length" />
              <div class="w-full h-full flex" v-else @click="toTable('技改任务')">
                <div
                  class="w-[25%] h-full box-border relative flex flex-col"
                  v-show="planTechnicalData.length"
                  v-for="(items, index) in planTechnicalData"
                  :key="items.name"
                >
                  <div class="flex-1">
                    <div class="w-full h-full" :id="`planTechnicalPieChartDom${index}`"></div>
                  </div>
                  <div class="w-full box-border text-center h-20 leading-20">{{ items.name }}</div>
                </div>
              </div>
            </div>
            <div
              v-if="item.name === '维修任务模块'"
              class="flex-1 gap-5 py-7.5 px-4 flex box-border text-5.5"
            >
              <div
                class="_repairItem h-full border-rd-2 box-border p-4 flex flex-col justify-center items-center"
                @click="openPlantEmporary"
              >
                <div class="flex-1 w-full box-border relative">
                  <div class="w-full h-full" id="plantemporaryNum"></div>
                  <span
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-10 font-bold color-[#FFF] z-2"
                  >
                    {{ planRepaiData.plantemporaryNum }}
                  </span>
                </div>
                <span class="block mt-5">本周临时维修数</span>
              </div>
              <div
                class="_repairItem h-full border-rd-2 box-border p-4 flex flex-col justify-center items-center"
              >
                <div class="flex-1 w-full box-border relative">
                  <div class="w-full h-full" id="monthTaskNum"></div>
                  <span
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-10 font-bold color-[#FFF] z-2"
                  >
                    {{ planRepaiData.monthTaskNum }}
                  </span>
                </div>
                <span class="block mt-5">本月大设任务数</span>
              </div>
              <div
                class="_repairItem h-full border-rd-2 box-border p-4 flex flex-col justify-center items-center"
              >
                <div class="flex-1 w-full box-border">
                  <div class="w-full h-full" id="yearTaskRate"></div>
                </div>
                <span class="block mt-5">年度大设任务完成率</span>
              </div>
            </div>
          </div>
        </dv-border-box-1>
      </div>
    </VueDraggable>
    <el-dialog v-model="showPlantEmporary" title="" width="1000">
      <el-table :data="plantEmporaryList">
        <el-table-column property="name" label="任务名称" />
        <el-table-column property="system" label="所属系统" />
        <el-table-column property="content" label="简要内容" />
        <el-table-column property="user" label="负责人" />
        <el-table-column property="company" label="施工单位" />
        <el-table-column property="startDate" label="开始时间" />
        <el-table-column property="endDate" label="结束时间" />
      </el-table>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
._producePage {
  height: calc(100vh - 176px);
  ._draggableItem {
    width: calc((100% - 20px) / 2);
    height: calc((100% - 20px) / 2);
    background-color: rgba(40, 51, 52, 0.8);
    overflow: hidden;
  }

  ._chengeBtn {
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    margin-top: 12px;
  }

  ._repairItem {
    width: calc((100% - 40px) / 3);
    background-color: rgba(19, 29, 67, 0.4);
  }

  .dv-water-pond-level canvas {
    margin-left: 0 !important;
  }
}
</style>
