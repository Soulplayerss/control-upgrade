<script setup lang="ts">
import { ref, onMounted } from 'vue'
import 'echarts-liquidfill'
import { VueDraggable } from 'vue-draggable-plus'
import * as echarts from 'echarts'
// echarts按需引入
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PictorialBarChart, GaugeChart, LineChart } from 'echarts/charts'
import { getElectricityForYear, getElectricityForMonth } from '@/api/index.ts'
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

const list1 = ref([
  {
    name: '电能年度消耗量',
    id: 0
  },
  {
    name: '燃油年度消耗量',
    id: 1
  },
  {
    name: '天然气年度消耗量',
    id: 2
  },
  {
    name: '电能月度消耗量',
    id: 3
  },
  {
    name: '天然气月度消耗量',
    id: 4
  },
  {
    name: '燃油月度消耗量',
    id: 5
  }
])

// ----------------------------------------------------------------------------- 获取年度数据
const electricityForYear = ref<any>({})
const GetElectricityForYear = async () => {
  try {
    // 等待获取数据
    const res = await getElectricityForYear()

    // 初始化数据结构
    electricityForYear.value = {
      yearPlandepotDate: [],
      yearPlandepotData: [],
      yearPlannaturalDate: [],
      yearPlannaturalData: [],
      yearPlanpowerDate: [],
      yearPlanpowerData: []
    }

    // 处理 yearPlandepot 电能数据
    res.data.yearPlandepot.forEach((item) => {
      electricityForYear.value.yearPlandepotDate.push(item.date)
      electricityForYear.value.yearPlandepotData.push(item.num)
    })

    // 处理 yearPlannatural 燃油数据
    res.data.yearPlannatural.forEach((item) => {
      electricityForYear.value.yearPlannaturalDate.push(item.date)
      electricityForYear.value.yearPlannaturalData.push(item.num)
    })

    // 处理 yearPlanpower 天然气数据
    res.data.yearPlanpower.forEach((item) => {
      item.name = item.date
      item.value = item.num
    })

    electricityForYear.value.yearPlanpowerData = res.data.yearPlanpower
    draggableConfig.value.data = electricityForYear.value.yearPlanpowerData

    // 调用初始化图表的函数
    initElectricityForYearChart(
      'yearPlandepot',
      electricityForYear.value.yearPlandepotDate,
      electricityForYear.value.yearPlandepotData
    ) // 电能
    initElectricityForYearChart(
      'yearPlannatural',
      electricityForYear.value.yearPlannaturalDate,
      electricityForYear.value.yearPlannaturalData
    ) // 燃油
  } catch (error) {
    console.error('Error fetching electricity data:', error)
  }
}

//---- 柱状图
const initElectricityForYearChart = (type, date, data) => {
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
      bottom: '15%',
      containLabel: true
    },
    series: [
      // 第一个圆柱顶部的椭圆形
      {
        type: 'pictorialBar', //pictorialBar(象形柱图)
        symbolSize: [30, 8], //椭圆的大小[宽，高]
        symbolOffset: [0, -4], //图形偏移[x轴，y轴]，不确定的话，可以微调，本实例x轴叠加了柱状之间的间距[-7+(间距7/2),y轴]
        z: 12, //图形的层级，控制图形的前后顺序，z值小的图形会被z值大的图形覆盖
        symbolPosition: 'end', //椭圆位置，默认'start'，在最底下，end是最上面
        itemStyle: {
          color: '#9AC8EC'
        },
        data: data
      },
      {
        name: '',
        data: data,
        type: 'bar',
        barWidth: 30,
        barGap: '50%', //柱状图间距，此处为14*50%=7
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
  const yearPlandepotChartDom = echarts.init(document.getElementById('yearPlandepotChartDom'))
  const yearPlannaturalChartDom = echarts.init(document.getElementById('yearPlannaturalChartDom'))
  type === 'yearPlandepot'
    ? yearPlandepotChartDom.setOption(option)
    : yearPlannaturalChartDom.setOption(option)
}

//---- 胶囊柱
const draggableConfig = ref<any>({
  showValue: true,
  data: []
})

//------------------------------------------------------------------------------月度数据
const electricityForMonth = ref<any>({})
const GetElectricityForMonth = async () => {
  try {
    // 等待获取数据
    const res = await getElectricityForMonth()

    // 初始化数据结构
    electricityForMonth.value = {
      monthPlandepotDate: [],
      monthPlandepotData: [],
      monthPlannaturalDate: [],
      monthPlannaturalData: [],
      monthPlanpowerDate: [],
      monthPlanpowerData: []
    }

    // 处理 monthPlandepot 电能数据
    res.data.monthPlandepot.forEach((item) => {
      electricityForMonth.value.monthPlandepotDate.push(item.date)
      electricityForMonth.value.monthPlandepotData.push(item.num)
    })

    // 处理 monthPlannatural 燃油数据
    res.data.monthPlannatural.forEach((item) => {
      electricityForMonth.value.monthPlannaturalDate.push(item.date)
      electricityForMonth.value.monthPlannaturalData.push(item.num)
    })

    // 处理 monthPlanpower 天然气数据
    res.data.monthPlanpower.forEach((item) => {
      electricityForMonth.value.monthPlanpowerDate.push(item.date)
      electricityForMonth.value.monthPlanpowerData.push(item.num)
    })

    // 调用初始化图表的函数
    initMonthPlandepotChart()
    initMonthPlannaturalChart()
    initMonthPlanpowerChart()
  } catch (error) {
    console.error('Error fetching electricity data:', error)
  }
}
// ----月度电能
const initMonthPlandepotChart = () => {
  let option = {
    title: {
      text: 'kw.h',
      left: 10,
      top: 20
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
        // 启用鼠标悬浮时的十字准线
      }
    },
    legend: {
      data: [],
      top: 450 //指定图例功能区域top值
    },
    // 图像的上下左右距离
    grid: {
      top: '15%',
      left: '2%',
      right: '2%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: electricityForMonth.value.monthPlandepotDate
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: 'rgba(30,163,255,0.3)'
        }
      }
    },
    series: [
      {
        name: '',
        smooth: true, //平滑曲线
        type: 'line',
        stack: '总量',
        data: electricityForMonth.value.monthPlandepotData, // 系列1的数据
        itemStyle: {
          color: '#afd8f8' // 设置系列1的颜色
        },
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(5, 115, 233, 0.3)'
            },
            {
              offset: 1,
              color: 'rgba(5,114,233,0)'
            }
          ])
        }
      }
    ]
  }
  const monthPlandepotChartDom = echarts.init(document.getElementById('monthPlandepotChartDom'))
  monthPlandepotChartDom.setOption(option)
}
// ----月度燃油
const initMonthPlannaturalChart = () => {
  let option = {
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
      data: electricityForMonth.value.monthPlannaturalDate,
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
        symbolSize: [14, 8], //椭圆的大小[宽，高]
        symbolOffset: [0, -4], //图形偏移[x轴，y轴]，不确定的话，可以微调，本实例x轴叠加了柱状之间的间距[-7+(间距7/2),y轴]
        z: 12, //图形的层级，控制图形的前后顺序，z值小的图形会被z值大的图形覆盖
        symbolPosition: 'end', //椭圆位置，默认'start'，在最底下，end是最上面
        itemStyle: {
          color: '#8B8B00'
        },
        data: electricityForMonth.value.monthPlannaturalData
      },
      {
        name: '',
        data: electricityForMonth.value.monthPlannaturalData,
        type: 'bar',
        barWidth: 14,
        barGap: '50%', //柱状图间距，此处为14*50%=7
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
      // 第一个圆柱底部的椭圆形
      {
        type: 'pictorialBar',
        symbolSize: [14, 8],
        symbolOffset: [0, 4],
        z: 12,
        itemStyle: {
          color: '#CDCD00'
        },
        data: electricityForMonth.value.monthPlannaturalData
      }
    ]
  }
  const monthPlannaturalChartDom = echarts.init(document.getElementById('monthPlannaturalChartDom'))
  monthPlannaturalChartDom.setOption(option)
}
// ----月度天然气
const initMonthPlanpowerChart = () => {
  let option = {
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
      data: electricityForMonth.value.monthPlanpowerDate,
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
      {
        name: '',
        data: electricityForMonth.value.monthPlanpowerData,
        type: 'bar',
        barWidth: 14,
        barGap: '50%', //柱状图间距，此处为14*50%=7
        itemStyle: {
          // 图形样式
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0, // 0%处的颜色
              color: 'rgba(0, 191, 255,1)'
            },
            {
              offset: 1, // 100%处的颜色
              color: 'rgba(155, 48, 255,1)'
            }
          ])
        }
      }
    ]
  }
  const monthPlanpowerChartDom = echarts.init(document.getElementById('monthPlanpowerChartDom'))
  monthPlanpowerChartDom.setOption(option)
}

// const draggableOptionList2 = ref([
//   {
//     title: {
//       text: 'kw.h',
//       left: 10,
//       top: 20
//     },
//     tooltip: {
//       trigger: 'axis',
//       axisPointer: {
//         type: 'cross'
//         // 启用鼠标悬浮时的十字准线
//       }
//     },
//     legend: {
//       data: [],
//       top: 450 //指定图例功能区域top值
//     },
//     // 图像的上下左右距离
//     grid: {
//       top: '15%',
//       left: '2%',
//       right: '2%',
//       bottom: '15%',
//       containLabel: true
//     },
//     xAxis: {
//       type: 'category',
//       data: [
//         '一月',
//         '二月',
//         '三月',
//         '四月',
//         '五月',
//         '六月',
//         '七月',
//         '八月',
//         '九月',
//         '十月',
//         '十一月',
//         '十二月'
//       ]
//     },
//     yAxis: {
//       type: 'value',
//       splitLine: {
//         lineStyle: {
//           color: 'rgba(30,163,255,0.3)'
//         }
//       }
//     },
//     series: [
//       {
//         name: '',
//         smooth: true, //平滑曲线
//         type: 'line',
//         stack: '总量',
//         data: [54, 43.98, 31.03, 43.23, 87.19, 47.52, 35.9, 15.68, 89.51, 72.39, 76.73, 91.71], // 系列1的数据
//         itemStyle: {
//           color: '#afd8f8' // 设置系列1的颜色
//         },
//         areaStyle: {
//           color: new graphic.LinearGradient(0, 0, 0, 1, [
//             {
//               offset: 0,
//               color: 'rgba(198, 226, 255, 0.8)'
//             },
//             {
//               offset: 1,
//               color: 'rgba(5,114,233,0)'
//             }
//           ])
//         }
//       },
//       {
//         name: '',
//         smooth: true, //平滑曲线
//         type: 'line',
//         stack: '总量',
//         data: [84, 63.98, 21.03, 83.23, 47.19, 77.52, 15.9, 75.68, 99.51, 52.39, 26.73, 61.71], // 系列1的数据
//         itemStyle: {
//           color: '#afd8f8' // 设置系列1的颜色
//         },
//         areaStyle: {
//           color: new graphic.LinearGradient(0, 0, 0, 1, [
//             {
//               offset: 0,
//               color: 'rgba(255, 69, 0, 01)'
//             },
//             {
//               offset: 1,
//               color: 'rgba(5,114,233,0.1)'
//             }
//           ])
//         }
//       }
//     ]
//   }
// ])

onMounted(() => {
  GetElectricityForYear()
  GetElectricityForMonth()
})
</script>
<template>
  <div class="w-full h-full _energyPage">
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
          <div class="w-full h-full box-border px-8 pt-12">
            <dv-capsule-chart
              :config="draggableConfig"
              style="width: 100%; height: 100%; padding-bottom: 20px; padding-top: 20px"
              v-if="item.name === '天然气年度消耗量'"
            />
            <div
              class="w-full h-full"
              id="yearPlandepotChartDom"
              v-if="item.name === '电能年度消耗量'"
            ></div>
            <div
              class="w-full h-full"
              id="yearPlannaturalChartDom"
              v-if="item.name === '燃油年度消耗量'"
            ></div>
            <div
              class="w-full h-full"
              id="monthPlandepotChartDom"
              v-if="item.name === '电能月度消耗量'"
            ></div>
            <div
              class="w-full h-full"
              id="monthPlanpowerChartDom"
              v-if="item.name === '天然气月度消耗量'"
            ></div>
            <div
              class="w-full h-full"
              id="monthPlannaturalChartDom"
              v-if="item.name === '燃油月度消耗量'"
            ></div>
            <div
              class="w-full h-full"
              id="dayPlannaturalChartDom"
              v-if="item.name === '油库日库存量'"
            ></div>
          </div>
        </dv-border-box-11>
      </div>
    </VueDraggable>
  </div>
</template>

<style lang="less">
._energyPage {
  ._draggableItem {
    width: calc((100% - 20px) / 2);
    height: calc((100% - 40px) / 3);
    overflow: hidden;
  }
}
.dv-capsule-chart {
  box-sizing: border-box;
  padding: 30px !important;
  .capsule-item {
    height: 20px !important;
    border-radius: 10px !important;
    .capsule-item-column {
      height: 18px !important;
      border-radius: 9px !important;
      .capsule-item-value {
        padding-left: 4px !important;
      }
    }
  }
}
.dv-capsule-chart .label-column {
  color: #76eec6 !important;
  padding: 4px 0px;
  > div:last-child {
    display: none !important;
  }
}
.dv-capsule-chart .unit-label {
  display: none !important;
}
</style>
