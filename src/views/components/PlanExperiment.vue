<template>
  <div class="w-full h-full flex flex-col _planExperiment">
    <div class="_chartBox mb-5 w-full" v-if="props.tableTitle === '实验日生产计划'">
      <VueDraggable
        class="flex flex-wrap gap-5 w-full h-full"
        v-model="list1"
        :animation="150"
        ghostClass="ghost"
        group="people1"
      >
        <div v-for="item in list1" :key="item.id" class="cursor-pointer _draggableItem border-rd-2">
          <dv-border-box-11
            :color="['#6fbdc3', '#3a708a']"
            backgroundColor="rgba(40, 51, 52, 0.8)"
            :title="item.name"
            style="font-weight: 600"
          >
            <div class="w-full h-full box-border px-8 pt-12 reactive">
              <div
                class="absolute z-3 box-border top-16 right-8 w-full flex justify-end"
                v-if="item.id === 0"
              >
                <el-date-picker
                  v-model="statusTime"
                  @change="changeTime"
                  type="date"
                  placeholder="Pick a day"
                />
              </div>
              <div class="w-full h-full" id="technologyStatusChartDom" v-if="item.id === 0"></div>
              <div class="w-full h-full flex flex-wrap box-border pt-2" v-if="item.id === 1">
                <div
                  class="w-1/2 h-1/2 flex flex-col items-center text-[0.7vw]"
                  v-for="(items, index) in stationUserNum"
                  :key="index"
                >
                  <dv-decoration-9 class="mb-1" style="width: 7vh; height: 7vh">{{
                    items
                  }}</dv-decoration-9>
                  <span class="block text-center">{{ userNunList[index] }}</span>
                </div>
              </div>
              <div class="w-full h-full" id="useStatusChartDom" v-if="item.id === 2"></div>
              <NoData v-if="item.id === 0 && isStatusNoData" />
              <NoData v-if="item.id === 2 && isUseStatusNoData" />
            </div>
          </dv-border-box-11>
        </div>
      </VueDraggable>
    </div>

    <div class="flex-1" :class="props.tableTitle === '实验日生产计划' ? 'max-h-[66%]' : ''">
      <div class="w-full h-full">
        <dv-border-box-11
          :color="['#6fbdc3', '#3a708a']"
          backgroundColor="rgba(40, 51, 52, 0.8)"
          :title="props.tableTitle"
          style="font-weight: 600"
        >
          <div class="px-10 pt-18 box-border w-full h-full">
            <div class="_ tableBox w-[100%]">
              <el-scrollbar height="100%">
                <el-table :data="tableData" v-if="props.tableTitle === '实验日生产计划'">
                  <el-table-column type="index" label="序号" />
                  <el-table-column prop="date" label="日期" />
                  <el-table-column prop="equipment" label="实验设备" />
                  <el-table-column prop="phone" label="调度电话" />
                  <el-table-column prop="type" label="计划属性" />
                  <el-table-column label="计划时间">
                    <el-table-column prop="time" label="时分-时分" />
                  </el-table-column>
                  <el-table-column label="供气系统">
                    <el-table-column label="2001大供气">
                      <el-table-column prop="resources1" label="低压" width="120" />
                      <el-table-column prop="resources2" label="中压" width="120" />
                    </el-table-column>
                    <el-table-column label="2001小供气">
                      <el-table-column prop="resources3" label="低压" width="120" />
                      <el-table-column prop="resources4" label="中压" width="120" />
                      <el-table-column prop="resources5" label="高压" width="120" />
                    </el-table-column>
                    <el-table-column label="2001a辅助气源">
                      <el-table-column prop="resources6" label="低压" width="120" />
                      <el-table-column prop="resources7" label="中压" width="120" />
                      <el-table-column prop="resources8" label="高压" width="120" />
                    </el-table-column>
                  </el-table-column>
                  <el-table-column label="抽气系统">
                    <el-table-column label="2002抽气">
                      <el-table-column prop="resources9" label="一抽" width="120" />
                      <el-table-column prop="resources10" label="二抽" width="120" />
                    </el-table-column>
                    <el-table-column label="2002a抽气">
                      <el-table-column prop="resources11" label="一抽" width="120" />
                      <el-table-column prop="resources12" label="二抽" width="120" />
                    </el-table-column>
                  </el-table-column>
                  <el-table-column label="空中预处理系统">
                    <el-table-column label="2003制冷">
                      <el-table-column prop="resources13" label="干燥系统" width="120" />
                      <el-table-column prop="resources14" label="膨胀涡轮" width="120" />
                    </el-table-column>
                    <el-table-column label="2003b降温">
                      <el-table-column prop="resources15" label="干燥系统" width="120" />
                      <el-table-column prop="resources16" label="气波机" width="120" />
                      <el-table-column prop="resources17" label="大气进气" width="120" />
                    </el-table-column>
                    <el-table-column label="2004降温">
                      <el-table-column prop="resources18" label="干燥系统" width="120" />
                      <el-table-column prop="resources19" label="气波机" width="120" />
                    </el-table-column>
                    <el-table-column label="2004加温">
                      <el-table-column prop="resources20" label="加温炉" width="120" />
                      <el-table-column prop="resources21" label="锅炉" width="120" />
                    </el-table-column>
                  </el-table-column>
                  <el-table-column label="水油气系统">
                    <el-table-column prop="resources22" label="自然水" width="120" />
                    <el-table-column prop="resources23" label="软化水" width="120" />
                    <el-table-column prop="resources24" label="燃油" width="120" />
                    <el-table-column prop="resources25" label="燃气" width="120" />
                  </el-table-column>
                  <el-table-column prop="status" label="状态" />
                </el-table>
                <el-table :data="tableData" v-if="props.tableTitle === '周实验计划排产表'">
                  <el-table-column type="index" label="序号" />
                  <el-table-column prop="date" label="日期" />
                  <el-table-column prop="equipment" label="实验设备" />
                  <el-table-column label="计划时间">
                    <el-table-column prop="time" label="时分-时分" />
                  </el-table-column>
                  <el-table-column label="供气系统">
                    <el-table-column label="2001大供气">
                      <el-table-column label="低压" width="120">
                        <template #default="scope">
                          <div class="_tableSpan">{{ scope.row.resources1Num }}</div>
                          <div class="_tableSpan">{{ scope.row.resources1 }}</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="中压" width="120">
                        <template #default="scope">
                          <div class="_tableSpan">{{ scope.row.resources2Num }}</div>
                          <div class="_tableSpan">{{ scope.row.resources2 }}</div>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column label="2001小供气">
                      <el-table-column label="低压" width="120">
                        <template #default="scope">
                          <div class="_tableSpan">{{ scope.row.resources3Num }}</div>
                          <div class="_tableSpan">{{ scope.row.resources3 }}</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="中压" width="120">
                        <template #default="scope">
                          <div class="_tableSpan">{{ scope.row.resources4Num }}</div>
                          <div class="_tableSpan">{{ scope.row.resources4 }}</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="高压" width="120">
                        <template #default="scope">
                          <div class="_tableSpan">{{ scope.row.resources5Num }}</div>
                          <div class="_tableSpan">{{ scope.row.resources5 }}</div>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column label="2001a辅助气源">
                      <el-table-column label="低压" width="120">
                        <template #default="scope">
                          <div class="_tableSpan">{{ scope.row.resources6Num }}</div>
                          <div class="_tableSpan">{{ scope.row.resources6 }}</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="中压" width="120">
                        <template #default="scope">
                          <div class="_tableSpan">{{ scope.row.resources7Num }}</div>
                          <div class="_tableSpan">{{ scope.row.resources7 }}</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="高压" width="120">
                        <template #default="scope">
                          <div class="_tableSpan">{{ scope.row.resources8Num }}</div>
                          <div class="_tableSpan">{{ scope.row.resources8 }}</div>
                        </template>
                      </el-table-column>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column label="抽气系统">
                    <el-table-column label="2002抽气">
                      <el-table-column label="一抽" width="120">
                        <template #default="scope">
                          <div class="_tableSpan">{{ scope.row.resources9Num }}</div>
                          <div class="_tableSpan">{{ scope.row.resources9 }}</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="二抽" width="120">
                        <template #default="scope">
                          <div class="_tableSpan">{{ scope.row.resources10Num }}</div>
                          <div class="_tableSpan">{{ scope.row.resources10 }}</div>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column label="2002a抽气">
                      <el-table-column label="一抽" width="120">
                        <template #default="scope">
                          <div class="_tableSpan">{{ scope.row.resources11Num }}</div>
                          <div class="_tableSpan">{{ scope.row.resources11 }}</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="二抽" width="120">
                        <template #default="scope">
                          <div class="_tableSpan">{{ scope.row.resources12Num }}</div>
                          <div class="_tableSpan">{{ scope.row.resources12 }}</div>
                        </template>
                      </el-table-column>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column label="空中预处理系统">
                    <el-table-column label="2003制冷">
                      <el-table-column prop="" label="干燥系统" width="120">
                        <template #default="scope">
                          <div class="_tableSpan">{{ scope.row.resources13Num }}</div>
                          <div class="_tableSpan">{{ scope.row.resources13 }}</div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="" label="膨胀涡轮" width="120">
                        <template #default="scope">
                          <div class="_tableSpan">{{ scope.row.resources14Num }}</div>
                          <div class="_tableSpan">{{ scope.row.resources14 }}</div>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column label="2003b降温">
                      <el-table-column prop="" label="干燥系统" width="120">
                        <template #default="scope">
                          <div class="_tableSpan">{{ scope.row.resources15Num }}</div>
                          <div class="_tableSpan">{{ scope.row.resources15 }}</div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="" label="气波机" width="120">
                        <template #default="scope">
                          <div class="_tableSpan">{{ scope.row.resources16Num }}</div>
                          <div class="_tableSpan">{{ scope.row.resources16 }}</div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="" label="大气进气" width="120">
                        <template #default="scope">
                          <div class="_tableSpan">{{ scope.row.resources17Num }}</div>
                          <div class="_tableSpan">{{ scope.row.resources17 }}</div>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column label="2004降温">
                      <el-table-column prop="" label="干燥系统" width="120">
                        <template #default="scope">
                          <div class="_tableSpan">{{ scope.row.resources18Num }}</div>
                          <div class="_tableSpan">{{ scope.row.resources18 }}</div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="" label="气波机" width="120">
                        <template #default="scope">
                          <div class="_tableSpan">{{ scope.row.resources19Num }}</div>
                          <div class="_tableSpan">{{ scope.row.resources19 }}</div>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column label="2004加温">
                      <el-table-column prop="" label="加温炉" width="120">
                        <template #default="scope">
                          <div class="_tableSpan">{{ scope.row.resources20Num }}</div>
                          <div class="_tableSpan">{{ scope.row.resources20 }}</div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="" label="锅炉" width="120">
                        <template #default="scope">
                          <div class="_tableSpan">{{ scope.row.resources21Num }}</div>
                          <div class="_tableSpan">{{ scope.row.resources21 }}</div>
                        </template>
                      </el-table-column>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column label="水油气系统">
                    <el-table-column prop="" label="自然水" width="120">
                      <template #default="scope">
                        <div class="_tableSpan">{{ scope.row.resources22Num }}</div>
                        <div class="_tableSpan">{{ scope.row.resources22 }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="" label="软化水" width="120">
                      <template #default="scope">
                        <div class="_tableSpan">{{ scope.row.resources23Num }}</div>
                        <div class="_tableSpan">{{ scope.row.resources23 }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="" label="燃油" width="120">
                      <template #default="scope">
                        <div class="_tableSpan">{{ scope.row.resources24Num }}</div>
                        <div class="_tableSpan">{{ scope.row.resources24 }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="" label="燃气" width="120">
                      <template #default="scope">
                        <div class="_tableSpan">{{ scope.row.resources25Num }}</div>
                        <div class="_tableSpan">{{ scope.row.resources25 }}</div>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>
                <el-table :data="tableData" v-if="props.tableTitle === '年度生产计划'">
                  <el-table-column type="index" label="序号" />
                  <el-table-column prop="equipment" label="实验设备" />
                  <el-table-column prop="tester" label="试验器名称" />
                  <el-table-column label="1月">
                    <el-table-column prop="resources1" label="1" />
                    <el-table-column prop="resources2" label="2" />
                    <el-table-column prop="resources3" label="3" />
                    <el-table-column prop="resources4" label="4" />
                  </el-table-column>
                  <el-table-column label="2月">
                    <el-table-column prop="resources5" label="1" />
                    <el-table-column prop="resources6" label="2" />
                    <el-table-column prop="resources7" label="3" />
                    <el-table-column prop="resources8" label="4" />
                  </el-table-column>
                  <el-table-column label="3月">
                    <el-table-column prop="resources9" label="1" />
                    <el-table-column prop="resources10" label="2" />
                    <el-table-column prop="resources11" label="3" />
                    <el-table-column prop="resources12" label="4" />
                  </el-table-column>
                  <el-table-column label="4月">
                    <el-table-column prop="resources13" label="1" />
                    <el-table-column prop="resources14" label="2" />
                    <el-table-column prop="resources15" label="3" />
                    <el-table-column prop="resources16" label="4" />
                  </el-table-column>
                  <el-table-column label="5月">
                    <el-table-column prop="resources17" label="1" />
                    <el-table-column prop="resources18" label="2" />
                    <el-table-column prop="resources19" label="3" />
                    <el-table-column prop="resources20" label="4" />
                  </el-table-column>
                  <el-table-column label="6月">
                    <el-table-column prop="resources21" label="1" />
                    <el-table-column prop="resources22" label="2" />
                    <el-table-column prop="resources23" label="3" />
                    <el-table-column prop="resources24" label="4" />
                  </el-table-column>
                  <el-table-column label="7月">
                    <el-table-column prop="resources25" label="1" />
                    <el-table-column prop="resources26" label="2" />
                    <el-table-column prop="resources27" label="3" />
                    <el-table-column prop="resources28" label="4" />
                  </el-table-column>
                  <el-table-column label="8月">
                    <el-table-column prop="resources29" label="1" />
                    <el-table-column prop="resources30" label="2" />
                    <el-table-column prop="resources31" label="3" />
                    <el-table-column prop="resources32" label="4" />
                  </el-table-column>
                  <el-table-column label="9月">
                    <el-table-column prop="resources33" label="1" />
                    <el-table-column prop="resources34" label="2" />
                    <el-table-column prop="resources35" label="3" />
                    <el-table-column prop="resources36" label="4" />
                  </el-table-column>
                  <el-table-column label="10月">
                    <el-table-column prop="resources37" label="1" />
                    <el-table-column prop="resources38" label="2" />
                    <el-table-column prop="resources39" label="3" />
                    <el-table-column prop="resources40" label="4" />
                  </el-table-column>
                  <el-table-column label="11月">
                    <el-table-column prop="resources41" label="1" />
                    <el-table-column prop="resources42" label="2" />
                    <el-table-column prop="resources43" label="3" />
                    <el-table-column prop="resources44" label="4" />
                  </el-table-column>
                  <el-table-column label="12月">
                    <el-table-column prop="resources45" label="1" />
                    <el-table-column prop="resources46" label="2" />
                    <el-table-column prop="resources47" label="3" />
                    <el-table-column prop="resources48" label="4" />
                  </el-table-column>
                </el-table>
              </el-scrollbar>
            </div>
          </div>
        </dv-border-box-11>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  getListByPlanDay,
  getListByPlanweek,
  getListByPlanyear,
  queryPlanweekresources,
  getCompletionStatus,
  getPlanStationUserNum,
  getWorkloadForWeek
} from '@/api/index.ts'
import NoData from './NoData.vue'
import { VueDraggable } from 'vue-draggable-plus'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import * as echarts from 'echarts'

const props = defineProps({
  tableTitle: {
    type: String,
    default: () => '实验日生产计划'
  }
})

const list1 = ref([
  {
    name: '实验完成情况',
    id: 0
  },
  {
    name: '实验岗位人员',
    id: 1
  },
  {
    name: '本周工作量',
    id: 2
  }
])

const tableData = ref<any>([])

//获取日计划数据
const GetListByPlanDay = () => {
  getListByPlanDay().then((res) => {
    tableData.value = res.data
  })
}

const isStatusNoData = ref<boolean>(false)
const statusTime = ref<any>(dayjs().locale('zh-cn').format('YYYY-MM-DD'))
const changeTime = () => {
  GetCompletionStatus()
}
//试验完成情况
const GetCompletionStatus = async () => {
  const chartData = ref<any>([]) // 如果不需要响应式，可直接使用普通数组
  try {
    const res = await getCompletionStatus(
      dayjs(statusTime.value).locale('zh-cn').format('YYYY-MM-DD')
    )
    if (res && res.data) {
      // 遍历对象的键值对，并转换为所需格式
      Object.entries(res.data).forEach(([key, value]) => {
        chartData.value.push({
          name: key,
          value: value
        })
      })
      chartData.value.length === 0 ? (isStatusNoData.value = true) : (isStatusNoData.value = false)
    }
    // 初始化图表
    initCompletionStatusChart(chartData.value)
  } catch (error) {
    console.error('Error caught:', error)
  }
}

//试验完成情况图表
const initCompletionStatusChart = (data) => {
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
            show: true // 不显示标签的连线
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
          show: true
        },
        labelLine: {
          normal: {
            show: true // 不显示标签的连线
          }
        },
        data: data
      }
    ]
  }
  const technologyStatusChartDom = echarts.init(document.getElementById('technologyStatusChartDom'))
  technologyStatusChartDom.setOption(option)
}

//试验岗位人数
const userNunList = ['供气系统', '抽气系统', '空气预处理系统', '水油气系统']
const stationUserNum = ref<any>([])
const GetPlanStationUserNum = () => {
  getPlanStationUserNum().then((res) => {
    stationUserNum.value = Object.values(res.data)
  })
}

//本周工作量
const workloadForWeekDta = ref<any>({})
const isUseStatusNoData = ref(false)
const GetWorkloadForWeek = async () => {
  await getWorkloadForWeek().then((res) => {
    workloadForWeekDta.value.xDate = []
    workloadForWeekDta.value.xData = []
    for (let key in res.data) {
      workloadForWeekDta.value.xDate.push(key)
      workloadForWeekDta.value.xData.push(res.data[key])
    }
  })
  workloadForWeekDta.value.xDate.length === 0
    ? (isUseStatusNoData.value = true)
    : (isUseStatusNoData.value = false)
  initPlanExperimentBarChart()
}

//本周工作量柱状图
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
      data: workloadForWeekDta.value.xDate,
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
        data: workloadForWeekDta.value.xData
      },
      {
        name: '',
        data: workloadForWeekDta.value.xData,
        type: 'bar',
        barWidth: 24,
        barGap: '50%', //柱状图间距，此处为24*50%=7
        itemStyle: {
          // 图形样式
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
      }
    ]
  }
  const useStatusChartDom = echarts.init(document.getElementById('useStatusChartDom'))
  useStatusChartDom.setOption(option)
}

//获取周计划数据
const GetListByPlanweek = () => {
  getListByPlanweek().then((res) => {
    tableData.value = res.data
  })
}

//获取年计划数据
const GetListByPlanyear = () => {
  getListByPlanyear('2004').then((res) => {
    tableData.value = res.data
  })
}

const GetqueryPlanweekresources = () => {
  queryPlanweekresources().then((res) => {
    console.log(res)
  })
}

onMounted(() => {
  GetqueryPlanweekresources()
  if (props.tableTitle === '实验日生产计划') {
    GetListByPlanDay()
    GetCompletionStatus()
    GetPlanStationUserNum()
    GetWorkloadForWeek()
  } else if (props.tableTitle === '周实验计划排产表') {
    GetListByPlanweek()
  } else {
    GetListByPlanyear()
  }
})
</script>

<style lang="less" scoped>
._planExperiment {
  height: calc(100vh - 148px);
  // background-color: rgba(40, 51, 52, 0.8);
  ._chartBox {
    height: calc((100% - 20px) / 3);
    ._draggableItem {
      width: calc((100% - 40px) / 3);
      height: 100% !important;
    }
  }
  .tableBox {
    height: calc(100% - 40px);
  }
  ._tableSpan {
    margin: 2px 0px;
    width: 100%;
    text-align: center;
    border-radius: 4px;
    // border: solid 1px #f6e1c1;
  }
  .el-input__wrapper {
    width: 120px !important;
    background-color: rbga(0, 0, 0, 0.8) !important;
  }
}
</style>
