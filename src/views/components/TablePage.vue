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
              <v-chart autoresize :option="draggableOptionList1[item.id]" />
            </div>
          </dv-border-box-11>
        </div>
      </VueDraggable>
    </div>

    <div class="_draggable2 flex-1 w-full">
      <dv-border-box-11
        :color="['#6fbdc3', '#3a708a']"
        backgroundColor="rgba(40, 51, 52, 0.8)"
        :title="props.tableTitle"
        style="font-weight: 600"
      >
        <div class="w-full h-full box-border px-8 pt-12 overflow-auto">111 </div>
      </dv-border-box-11>
    </div>
  </div>
</template>

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

const props = defineProps({
  tableTitle: {
    type: String,
    default: () => ''
  }
})
const list1 = ref([
  {
    name: '当前技术状态',
    id: 0
  },
  {
    name: '运行时常数',
    id: 1
  },
  {
    name: '当前使用状态',
    id: 2
  }
])

const draggableOptionList1 = ref([
  {
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
        data: [
          { value: 25, name: '完好状态' },
          { value: 35, name: '调试状态' },
          { value: 45, name: '检修状态' },
          { value: 55, name: '在建状态' }
        ]
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
        symbolSize: [14, 8], //椭圆的大小[宽，高]
        symbolOffset: [0, -4], //图形偏移[x轴，y轴]，不确定的话，可以微调，本实例x轴叠加了柱状之间的间距[-7+(间距7/2),y轴]
        z: 12, //图形的层级，控制图形的前后顺序，z值小的图形会被z值大的图形覆盖
        symbolPosition: 'end', //椭圆位置，默认'start'，在最底下，end是最上面
        itemStyle: {
          color: 'rgba(18,204,180,0.9)'
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
  },
  {
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
          show: true,
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
        data: [
          { value: 335, name: '运行状态' },
          { value: 70, name: '完好状态' }
        ]
      }
    ]
  }
])
</script>

<style lang="less" scoped>
._draggable1 {
  height: calc((100% - 20px) / 3);
  ._draggableItem {
    width: calc((100% - 40px) / 3);
    overflow: hidden;
  }
}
._draggable2 {
  background-color: rgba(23, 36, 41, 0.6);
}
</style>
