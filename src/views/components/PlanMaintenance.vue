<template>
  <div class="box-border w-full h-full _planMaintenance border-rd-2 box-border p-8 flex flex-col">
    <div class="flex justify-center items-center gap-5 py-4">
      <el-button
        :type="activeIndex === item.id ? 'success' : 'primary'"
        @click="clickPlan(item.id)"
        v-for="item in levelMaintenanceNameList"
        :key="item.id"
        class="min-w-30 min-h-10"
        :class="activeIndex === item.id ? 'bg-[]' : ''"
        >{{ item.name }}</el-button
      >
    </div>
    <div class="flex-1 box-border overflow-hidden">
      <dv-border-box-10 :color="['#223bfa', '#223bfa']">
        <div class="p-4">
          <el-table :data="tableData" stripe v-if="props.tableTitle === '一级保养'">
            <el-table-column prop="name" label="设备名称" />
            <el-table-column prop="maintain" label="一级保养" />
            <el-table-column prop="user" label="责任人" />
            <el-table-column prop="month1" label="1月" />
            <el-table-column prop="month2" label="2月" />
            <el-table-column prop="month3" label="3月" />
            <el-table-column prop="month4" label="4月" />
            <el-table-column prop="month5" label="5月" />
            <el-table-column prop="month6" label="6月" />
            <el-table-column prop="month7" label="7月" />
            <el-table-column prop="month8" label="8月" />
            <el-table-column prop="month9" label="9月" />
            <el-table-column prop="month10" label="10月" />
            <el-table-column prop="month11" label="11月" />
            <el-table-column prop="month12" label="12月" />
          </el-table>
          <el-table :data="tableData" stripe v-if="props.tableTitle === '二级保养'">
            <el-table-column prop="name" label="设备名称" />
            <el-table-column prop="maintain" label="一级保养" />
            <el-table-column prop="user" label="责任人" />
            <el-table-column prop="month1" label="一季度" />
            <el-table-column prop="month2" label="二季度" />
            <el-table-column prop="month3" label="三季度" />
            <el-table-column prop="month4" label="四季度" />
          </el-table>
          <el-table :data="tableData" stripe v-if="props.tableTitle === '技改任务'">
            <el-table-column prop="plan" label="计划名称" />
            <el-table-column prop="project" label="项目名称" />
            <el-table-column prop="target" label="计划目标" />
            <el-table-column prop="date" label="完成日期" />
            <el-table-column prop="layout" label="完成形式" />
            <el-table-column prop="user1" label="技术负责人" />
            <el-table-column prop="user2" label="分管领导" />
            <el-table-column prop="user3" label="业务主管" />
            <el-table-column prop="month1" label="1月" />
            <el-table-column prop="month2" label="2月" />
            <el-table-column prop="month3" label="3月" />
            <el-table-column prop="month4" label="4月" />
            <el-table-column prop="month5" label="5月" />
            <el-table-column prop="month6" label="6月" />
            <el-table-column prop="month7" label="7月" />
            <el-table-column prop="month8" label="8月" />
            <el-table-column prop="month9" label="9月" />
            <el-table-column prop="month10" label="10月" />
            <el-table-column prop="month11" label="11月" />
            <el-table-column prop="month12" label="12月" />
          </el-table>
        </div>
      </dv-border-box-10>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  getPlanmaintainoneinfoList,
  getOneLevelMaintenanceName,
  getPlanmaintaintwoinfoList,
  getTwoLevelMaintenanceName,
  getPlantechnicalinfoBytaskId,
  getTechnicalYear
} from '@/api/index.ts'

const props = defineProps({
  tableTitle: {
    type: String,
    default: () => '一级保养'
  }
})

const activeIndex = ref<any>(0)
const tableData = ref<any>([])

//获取一级保养类型
const levelMaintenanceNameList = ref<any>([])
const GetOneLevelMaintenanceName = async () => {
  getOneLevelMaintenanceName().then((res) => {
    levelMaintenanceNameList.value = res.data
    activeIndex.value = levelMaintenanceNameList.value[0].id
    GetPlanmaintainoneinfoList(levelMaintenanceNameList.value[0].id)
  })
}

//获取一级保养详情
const GetPlanmaintainoneinfoList = async (id) => {
  getPlanmaintainoneinfoList({ taskId: id }).then((res) => {
    tableData.value = res.data
  })
}

//获取二级保养类型
const GetTwoLevelMaintenanceName = async () => {
  getTwoLevelMaintenanceName().then((res) => {
    levelMaintenanceNameList.value = res.data
    activeIndex.value = levelMaintenanceNameList.value[0].id
    GetPlanmaintaintwoinfoList(levelMaintenanceNameList.value[0].id)
  })
}

//获取二级保养详情
const GetPlanmaintaintwoinfoList = async (id) => {
  getPlanmaintaintwoinfoList({ taskId: id }).then((res) => {
    tableData.value = res.data
  })
}

//技改任务年度查询
const GetTechnicalYear = async () => {
  getTechnicalYear().then((res) => {
    levelMaintenanceNameList.value = res.data
    activeIndex.value = levelMaintenanceNameList.value[0].id
    GetPlantechnicalinfoBytaskId(levelMaintenanceNameList.value[0].id)
  })
}

//技改任务详情查询
const GetPlantechnicalinfoBytaskId = async (id) => {
  getPlantechnicalinfoBytaskId({ taskId: id }).then((res) => {
    tableData.value = res.data
  })
}

const clickPlan = (id) => {
  activeIndex.value = id
  props.tableTitle === '一级保养'
    ? GetPlanmaintainoneinfoList(id)
    : props.tableTitle === '二级保养'
      ? GetPlanmaintaintwoinfoList(id)
      : GetPlantechnicalinfoBytaskId(id)
}

onMounted(() => {
  props.tableTitle === '一级保养'
    ? GetOneLevelMaintenanceName()
    : props.tableTitle === '二级保养'
      ? GetTwoLevelMaintenanceName()
      : GetTechnicalYear()
})
</script>

<style scoped lang="less">
._planMaintenance {
  background-color: rgba(40, 51, 52, 0.8);
}
</style>
