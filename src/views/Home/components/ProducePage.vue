<script setup lang="ts">
import { ref, reactive, watch, h, nextTick, onMounted } from 'vue'
import VChart from 'vue-echarts'
import 'echarts-liquidfill'
import { VueDraggable } from 'vue-draggable-plus'

// echarts按需引入
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PictorialBarChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
use([CanvasRenderer, BarChart, PictorialBarChart, TooltipComponent, LegendComponent, GridComponent])

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
const repairConfig = ref({
  data: [55],
  shape: 'round'
})

const clickExperiment = (value) => {
  experimentActive.value = value
}

const clickMaintain = (value) => {
  maintainActive.value = value
}
// echarts
const experimentOption = ref({
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
      symbolOffset: [0.5, -4], //图形偏移[x轴，y轴]，不确定的话，可以微调，本实例x轴叠加了柱状之间的间距[-7+(间距7/2),y轴]
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
      symbolOffset: [0.5, 4],
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

const maintainPieOption = ref({
  tooltip: {
    trigger: 'item',
    show: false
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['50%', '70%'], // 设置环形图的内外半径，实现环形效果
      avoidLabelOverlap: false,
      label: {
        position: 'center',
        show: true,
        formatter: function () {
          let str = '28%'
          return str
        },
        color: '#fff', // 标签的颜色
        fontSize: 26, // 标签的字体大小
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

const repairOption = ref({
  series: [
    {
      type: 'liquidFill',
      data: [
        0.68,
        0.5,
        {
          // 如果只想给其中某一个波浪，比如最后一个波浪设置透明度以及鼠标移入的透明度
          value: 0.4,
          direction: 'left', // 让波浪往不同的方向浮动，比如这里设置往左，未设置的波浪会往右
          itemStyle: {
            opacity: 0.6
          },
          emphasis: {
            itemStyle: {
              opacity: 0.9
            }
          }
        }
      ],
      radius: '95%', // 半径
      shape: 'circle', // 改变水球图的形状，比如 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
      color: ['red', 'blue', 'yellow'], // 修改波浪的颜色，并会自动与 data 中的数据从大到小进行映射，如，red-0.68；blue-0.5；yellow-0.4
      // itemStyle: { // 设置水球透明度
      //     opacity: 0.6
      // },
      // emphasis: { // 设置鼠标移入波浪后的透明度，不设置该数值，默认跟 itemStyle 中设置的一样，为 0.6
      //     itemStyle: {
      //         opacity: 0.9
      //     }
      // },
      // waveAnimation: false, // 让波浪停止绘制，从动态变为静止，该属性最好和 AnimationDuration， AnimationDurationUpdate 一起设置
      // AnimationDuration: 0,
      // AnimationDurationUpdate: 0,
      amplitude: 10, // 控制波浪的振幅，为 0，怎会变为直线的波纹并且波浪为静止，如果给 10，波纹明显幅度变小，50 则会很陡峭
      backgroundStyle: {
        color: 'purple', // 修改背景颜色
        borderWidth: 4, // 修改背景边框宽度
        borderColor: 'green' // 修改背景边框的颜色
      },
      outline: {
        // 修改外层样式
        show: true,
        borderDistance: 10, // 设置和外层轮廓的间距
        itemStyle: {
          borderWidth: 2, // 设置外层边框宽度
          borderColor: 'red', // 设置外层边框颜色
          shadowBlur: 'none' // 消除外层边框阴影
        }
      }
      // outline: { // 隐藏外层
      //     show: false
      // }
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
            <div class="flex justify-between mt-6">
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
                <div class="absolute bottom-0 right-4 w-[330px] h-[20px]">
                  <dv-decoration-8 :reverse="true" style="width: 330px; height: 30px" />
                </div>
                <div class="_chengeBtn mr-4">
                  <dv-border-box-7
                    @click="clickMaintain('levelOne')"
                    :backgroundColor="maintainActive === 'levelOne' ? '#00327D' : '#284a7d'"
                    >一级保养</dv-border-box-7
                  >
                </div>
                <div class="_chengeBtn mr-4">
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
                  class="flex-1 flex flex-col justify-center items-start border-rd-2 box-border px-6"
                >
                  <span class="text-5 block mb-4 text-7">日实验总量</span>
                  <div class="flex items-centar">
                    <img src="@/assets/image/day-total.svg" alt="" class="mr-4 w-12 h-12" />
                    <span class="text-8 color-[#12CCB4]">20</span>
                  </div>
                </div>
                <div
                  class="flex-1 flex flex-col justify-center items-start border-rd-2 box-border px-6"
                >
                  <span class="text-5 block mb-4 text-7">周实验总量</span>
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
              <div class="w-[30%] h-full ml-4 box-border relative">
                <v-chart autoresize :option="maintainPieOption" />
                <div class="w-full box-border text-center absolute bottom-10 text-6">{{
                  maintainActive === 'levelOne' ? '一级完成率' : '二级完成率'
                }}</div>
              </div>
            </div>
            <div v-if="item.name === '技改任务模块'" class="flex-1 flex box-border">
              <div class="w-[25%] h-full box-border relative">
                <v-chart autoresize :option="maintainPieOption" />
                <div class="w-full box-border text-center absolute bottom-10 text-4.5"
                  >第一季度任务数600</div
                >
              </div>
              <div class="w-[25%] h-full box-border relative">
                <v-chart autoresize :option="maintainPieOption" />
                <div class="w-full box-border text-center absolute bottom-10 text-4.5"
                  >第二季度任务数600</div
                >
              </div>
              <div class="w-[25%] h-full box-border relative">
                <v-chart autoresize :option="maintainPieOption" />
                <div class="w-full box-border text-center absolute bottom-10 text-4.5"
                  >第三季度任务数600</div
                >
              </div>
              <div class="w-[25%] h-full box-border relative">
                <v-chart autoresize :option="maintainPieOption" />
                <div class="w-full box-border text-center absolute bottom-10 text-4.5"
                  >第四季度任务数600</div
                >
              </div>
            </div>
            <div
              v-if="item.name === '维修任务模块'"
              class="flex-1 gap-5 py-7.5 px-4 flex box-border"
            >
              <div
                class="_repairItem h-full border-rd-2 box-border p-4 flex flex-col justify-center items-center"
              >
                <div class="flex-1 w-full box-border"
                  ><v-chart autoresize :option="repairOption"
                /></div>
                <span class="text-5">本周临时维修数</span>
              </div>
              <div
                class="_repairItem h-full border-rd-2 box-border p-4 flex flex-col justify-center items-center"
              >
                <div class="flex-1 w-full box-border"
                  ><v-chart autoresize :option="repairOption"
                /></div>
                <span class="text-5">本月大设任务数</span>
              </div>
              <div
                class="_repairItem h-full border-rd-2 box-border p-4 flex flex-col justify-center items-center"
              >
                <div class="flex-1 w-full box-border"
                  ><v-chart autoresize :option="maintainPieOption"
                /></div>
                <span class="text-5">年度大设任务完成数</span>
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
  width: calc((100% - 84px) / 2);
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
