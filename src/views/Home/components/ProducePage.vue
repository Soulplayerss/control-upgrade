<script setup lang="ts">
import { ref } from 'vue'
import VChart from 'vue-echarts'
import 'echarts-liquidfill'
import { VueDraggable } from 'vue-draggable-plus'

// echarts按需引入
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PictorialBarChart, GaugeChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
use([
  CanvasRenderer,
  BarChart,
  PictorialBarChart,
  GaugeChart,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

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

const experimentActive = ref('day')
const maintainActive = ref('levelOne')

const clickExperiment = (value) => {
  experimentActive.value = value
}

const clickMaintain = (value) => {
  maintainActive.value = value
}
// echarts
const experimentOption = ref({
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
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周末'],
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
        color: '#9AC8EC'
      },
      data: [54, 43.98, 31.03, 43.23, 87.19, 47.52, 35.9, 15.68, 89.51, 72.39, 76.73, 91.71]
    },
    {
      name: '',
      data: [54, 43.98, 31.03, 43.23, 87.19, 47.52, 35.9, 15.68, 89.51, 72.39, 76.73, 91.71],
      type: 'bar',
      barWidth: 14,
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
    },
    // 第一个圆柱底部的椭圆形
    {
      type: 'pictorialBar',
      symbolSize: [14, 8],
      symbolOffset: [0, 4],
      z: 12,
      itemStyle: {
        color: '#0E6EB8'
      },
      data: [54, 43.98, 31.03, 43.23, 87.19, 47.52, 35.9, 15.68, 89.51, 72.39, 76.73, 91.71]
    }
  ]
})

const maintainOption = ref({
  color: ['#00B09C', '#93cc79', '#f9c761', '#ec6468', '#18a3a0'],
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
    data: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
    ],
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
      name: '总量',
      data: [54, 43.98, 31.03, 43.23, 87.19, 47.52, 35.9, 15.68, 89.51, 72.39, 76.73, 91.71],
      type: 'bar',
      barWidth: 14,
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
    },
    {
      name: '完成量',
      data: [31.09, 12.82, 52.43, 4.5, 19.18, 54.36, 17.92, 5.26, 30.49, 1.05, 17.54, 16.55],
      type: 'bar',
      barWidth: 14,
      itemStyle: {
        // 图形样式
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0, // 0%处的颜色
            color: 'rgba(42, 181, 222,1)'
          },
          {
            offset: 1, // 100%处的颜色
            color: 'rgba(23, 167, 205,1)'
          }
        ])
      }
    }
  ]
})

const technicalPieOption = ref({
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
          let str = '28%'
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
        { value: 335, name: '直接访问' },
        { value: 70, name: '邮件营销' }
      ]
    }
  ]
})

// 定义用于图表的颜色数组，colorLine 用于扇区渐变的起始颜色，colorLegend 用于渐变的结束颜色
const maintainPieLine = ['#FFC41C', 'rgba(0,0,0,0)']
const maintainPieLegend = ['#FFC41C', 'rgba(0,0,0,0)']
const maintainPieOption = ref({
  tooltip: {
    trigger: 'item',
    show: false
  },
  series: [
    {
      name: '内边框', // 系列名称
      type: 'pie', // 图表类型为 'pie'，即饼图
      clockWise: true, // 顺时针显示
      silent: true, // 关闭鼠标悬浮提示
      animation: true, // 开启动画效果
      radius: ['60%'], // 边框半径百分比
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
            color: 'rgba(19, 29, 67, 0.5)'
            // // 样式配置
            // normal: {
            //   // 普通状态下的样式
            //   borderWidth: 10, // 边框宽度
            //   borderColor: '#2F4F4F' // 边框颜色
            // }
          }
        }
      ]
    },
    {
      name: '',
      type: 'pie',
      radius: ['60%', '75%'], // 设置环形图的内外半径，实现环形效果
      avoidLabelOverlap: false,
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
                  color: maintainPieLine[params.dataIndex % maintainPieLine.length] // 开始颜色
                },
                {
                  offset: 1, // 结束位置
                  color: maintainPieLegend[params.dataIndex % maintainPieLegend.length] // 结束颜色
                }
              ],
              globalCoord: false // 是否使用全局坐标
            }
          }
        }
      },
      label: {
        position: 'center',
        show: true,
        formatter: function () {
          let str = '28%'
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
      data: [20, 100]
    }
  ]
})

const repairOption = ref({
  series: [
    {
      type: 'liquidFill',
      data: [0.3],
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
      }
      // outline: { // 隐藏外层
      //     show: false
      // }
    }
  ]
})

// 定义用于图表的颜色数组，colorLine 用于扇区渐变的起始颜色，colorLegend 用于渐变的结束颜色
const colorLine = ['#3D9DFB', '#3EFDB0', '#FFC41C', '#FC7242']
const colorLegend = ['#000A1B', '#061C2C', '#192120', '#0E1728']
// 初始化数值变量 num，用于累加 legendList 中的所有数值
const repairPieOption = ref({
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
          show: false // 不显示标签的连线
        }
      },
      data: [50, 80, 60, 90] // 传入的数据项
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
})
</script>

<template>
  <div class="w-full h-full">
    <VueDraggable
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
                <div class="_chengeBtn mr-4" @click="clickExperiment('day')">
                  <dv-border-box-7
                    :backgroundColor="experimentActive === 'day' ? '#00327D' : '#284a7d'"
                    >日计划</dv-border-box-7
                  >
                </div>
                <div class="_chengeBtn mr-4" @click="clickExperiment('week')">
                  <dv-border-box-7
                    :backgroundColor="experimentActive === 'week' ? '#00327D' : '#284a7d'"
                    >周计划</dv-border-box-7
                  >
                </div>
                <div class="_chengeBtn" @click="clickExperiment('year')">
                  <dv-border-box-7
                    :backgroundColor="experimentActive === 'year' ? '#00327D' : '#284a7d'"
                    >年计划</dv-border-box-7
                  >
                </div>
              </div>
              <div class="relative flex flex-justify-end pr-20" v-if="item.name === '保养任务模块'">
                <div class="absolute bottom-0 right-4 w-[300px] h-[20px]">
                  <dv-decoration-8 :reverse="true" style="width: 300px; height: 30px" />
                </div>
                <div class="_chengeBtn mr-4">
                  <dv-border-box-7
                    @click="clickMaintain('levelOne')"
                    :backgroundColor="maintainActive === 'levelOne' ? '#00327D' : '#284a7d'"
                    >一级保养</dv-border-box-7
                  >
                </div>
                <div class="_chengeBtn">
                  <dv-border-box-7
                    @click="clickMaintain('levelTwo')"
                    :backgroundColor="maintainActive === 'levelTwo' ? '#00327D' : '#284a7d'"
                    >二级保养</dv-border-box-7
                  >
                </div>
              </div>
            </div>
            <div v-if="item.name === '实验计划模块'" class="flex-1 flex box-border">
              <div class="flex-1 h-full">
                <v-chart autoresize :option="experimentOption" />
              </div>
              <div
                class="w-[30%] h-full ml-4 _experimentRight flex flex-col gap-5 py-8 px-4 box-border"
              >
                <div
                  class="flex-1 flex flex-col justify-center items-start border-rd-2 box-border px-6 text-6"
                >
                  <span class="text-5 block mb-4">日实验总量</span>
                  <div class="flex items-centar">
                    <img src="@/assets/image/day-total.svg" alt="" class="mr-4 w-12 h-12" />
                    <span class="text-8 color-[#12CCB4]">20</span>
                  </div>
                </div>
                <div
                  class="flex-1 flex flex-col justify-center items-start border-rd-2 box-border px-6"
                >
                  <span class="text-5 block mb-4">周实验总量</span>
                  <div class="flex items-centar">
                    <img src="@/assets/image/week-total.svg" alt="" class="mr-4 w-12 h-12" />
                    <span class="text-8 color-[#12CCB4]">20</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="item.name === '保养任务模块'" class="flex-1 flex box-border">
              <div class="flex-1 h-full">
                <v-chart autoresize :option="maintainOption" />
              </div>
              <div class="w-[30%] h-full ml-4 box-border relative flex flex-col">
                <div class="flex-1">
                  <v-chart autoresize :option="maintainPieOption" />
                </div>
                <div class="w-full box-border text-center text-5.5 mb-10">{{
                  maintainActive === 'levelOne' ? '一级完成率' : '二级完成率'
                }}</div>
              </div>
            </div>
            <div v-if="item.name === '技改任务模块'" class="flex-1 flex box-border text-5.5">
              <div class="w-[25%] h-full box-border relative flex flex-col">
                <div class="flex-1">
                  <v-chart autoresize :option="technicalPieOption" />
                </div>
                <div class="w-full box-border text-center h-20 leading-20">第一季度任务数600</div>
              </div>
              <div class="w-[25%] h-full box-border relative flex flex-col">
                <div class="flex-1">
                  <v-chart autoresize :option="technicalPieOption" />
                </div>
                <div class="w-full box-border text-center h-20 leading-20">第二季度任务数600</div>
              </div>
              <div class="w-[25%] h-full box-border relative flex flex-col">
                <div class="flex-1">
                  <v-chart autoresize :option="technicalPieOption" />
                </div>
                <div class="w-full box-border text-center h-20 leading-20">第三季度任务数600</div>
              </div>
              <div class="w-[25%] h-full box-border relative flex flex-col">
                <div class="flex-1">
                  <v-chart autoresize :option="technicalPieOption" />
                </div>
                <div class="w-full box-border text-center h-20 leading-20">第四季度任务数600</div>
              </div>
            </div>
            <div
              v-if="item.name === '维修任务模块'"
              class="flex-1 gap-5 py-7.5 px-4 flex box-border text-5.5"
            >
              <div
                class="_repairItem h-full border-rd-2 box-border p-4 flex flex-col justify-center items-center"
              >
                <div class="flex-1 w-full box-border"
                  ><v-chart autoresize :option="repairOption"
                /></div>
                <span class="block mt-5">本周临时维修数</span>
              </div>
              <div
                class="_repairItem h-full border-rd-2 box-border p-4 flex flex-col justify-center items-center"
              >
                <div class="flex-1 w-full box-border"
                  ><v-chart autoresize :option="repairOption"
                /></div>
                <span class="block mt-5">本月大设任务数</span>
              </div>
              <div
                class="_repairItem h-full border-rd-2 box-border p-4 flex flex-col justify-center items-center"
              >
                <div class="flex-1 w-full box-border"
                  ><v-chart autoresize :option="repairPieOption"
                /></div>
                <span class="block mt-5">年度大设任务完成率</span>
              </div>
            </div>
          </div>
        </dv-border-box-1>
      </div>
    </VueDraggable>
  </div>
</template>

<style lang="less" scoped>
._draggableItem {
  width: calc((100% - 20px) / 2);
  height: calc((100% - 20px) / 2);
  background-color: rgba(40, 51, 52, 0.8);
  overflow: hidden;
}
._chengeBtn {
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  margin-top: 12px;
}
._experimentRight {
  > div {
    background-color: rgba(19, 29, 67, 0.4);
  }
}
._repairItem {
  width: calc((100% - 40px) / 3);
  background-color: rgba(19, 29, 67, 0.4);
}
.dv-water-pond-level canvas {
  margin-left: 0 !important;
}
</style>
