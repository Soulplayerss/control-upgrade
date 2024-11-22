<script setup lang="ts">
import { ref } from 'vue'
import VChart from 'vue-echarts'
import 'echarts-liquidfill'
import { VueDraggable } from 'vue-draggable-plus'

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
  }
])
const list2 = ref([
  {
    name: '电能月度消耗量',
    id: 0
  },
  {
    name: '天然气月度消耗量',
    id: 1
  },
  {
    name: '燃油月度消耗量',
    id: 2
  },
  {
    name: '油库日库存量',
    id: 3
  }
])

const draggableOptionList1 = ref([
  {
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
      data: ['2001', '2002', '2003'],
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
        data: [1584, 5248, 1622]
      },
      {
        name: '',
        data: [1584, 5248, 1622],
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
  },
  {
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
      data: ['2001', '2002', '2003'],
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
          color: 'rgba(18,204,180,0.9)'
        },
        data: [1584, 5248, 1622]
      },
      {
        name: '',
        data: [1584, 5248, 1622],
        type: 'bar',
        barWidth: 30,
        barGap: '50%', //柱状图间距，此处为14*50%=7
        itemStyle: {
          // 图形样式
          color: new graphic.LinearGradient(0, 0, 0, 1, [
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
])

const draggableOptionList2 = ref([
  {
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
      ]
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
        data: [54, 43.98, 31.03, 43.23, 87.19, 47.52, 35.9, 15.68, 89.51, 72.39, 76.73, 91.71], // 系列1的数据
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
  },
  {
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
        data: [54, 43.98, 31.03, 43.23, 87.19, 47.52, 35.9, 15.68, 89.51, 72.39, 76.73, 91.71]
      }
    ]
  },
  {
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
  },
  {
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
      ]
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
        data: [54, 43.98, 31.03, 43.23, 87.19, 47.52, 35.9, 15.68, 89.51, 72.39, 76.73, 91.71], // 系列1的数据
        itemStyle: {
          color: '#afd8f8' // 设置系列1的颜色
        },
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(198, 226, 255, 0.8)'
            },
            {
              offset: 1,
              color: 'rgba(5,114,233,0)'
            }
          ])
        }
      },
      {
        name: '',
        smooth: true, //平滑曲线
        type: 'line',
        stack: '总量',
        data: [84, 63.98, 21.03, 83.23, 47.19, 77.52, 15.9, 75.68, 99.51, 52.39, 26.73, 61.71], // 系列1的数据
        itemStyle: {
          color: '#afd8f8' // 设置系列1的颜色
        },
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255, 69, 0, 01)'
            },
            {
              offset: 1,
              color: 'rgba(5,114,233,0.1)'
            }
          ])
        }
      }
    ]
  }
])

const draggableConfig = ref({
  showValue: true,
  data: [
    {
      name: '2021年',
      value: 167
    },
    {
      name: '2022年',
      value: 67
    },
    {
      name: '2023年',
      value: 123
    }
  ]
})
</script>
<template>
  <div class="w-full h-full flex flex-col">
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
            <div class="w-full h-full box-border px-8 pt-12">
              <dv-capsule-chart
                :config="draggableConfig"
                style="width: 100%; height: 100%; padding-bottom: 20px; padding-top: 20px"
                v-if="item.name === '天然气年度消耗量'"
              />
              <v-chart autoresize :option="draggableOptionList1[item.id]" v-else />
            </div>
          </dv-border-box-11>
        </div>
      </VueDraggable>
    </div>
    <div class="_draggable2 w-full">
      <VueDraggable
        class="flex flex-wrap gap-5 w-full h-full"
        v-model="list2"
        :animation="150"
        ghostClass="ghost"
        group="people2"
      >
        <div v-for="item in list2" :key="item.id" class="cursor-pointer _draggableItem border-rd-2">
          <dv-border-box-11
            :color="['#6fbdc3', '#3a708a']"
            backgroundColor="rgba(40, 51, 52, 0.8)"
            :title="item.name"
            style="font-weight: 600"
          >
            <div class="w-full h-full box-border px-8 pt-12">
              <v-chart autoresize :option="draggableOptionList2[item.id]" />
            </div>
          </dv-border-box-11>
        </div>
      </VueDraggable>
    </div>
  </div>
</template>

<style lang="less">
._draggable1 {
  height: calc((100% - 20px) / 3);
  ._draggableItem {
    width: calc((100% - 40px) / 3);
    overflow: hidden;
  }
}
._draggable2 {
  height: calc(((100% - 20px) / 3) * 2);
  ._draggableItem {
    width: calc((100% - 20px) / 2);
    height: calc((100% - 20px) / 2);
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
