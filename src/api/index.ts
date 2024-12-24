import request from '@/axios'

// 实验计划板块
export const getPlanExperiment = () => {
  return request.get({ url: '/tplay/screen/plan/experiment' })
}

// 日计划
export const getListByPlanDay = () => {
  return request.get({ url: '/tplay/screen/plan/getListByPlanDay' })
}

// 试验完成情况
export const getCompletionStatus = (time) => {
  return request.get({ url: `/tplay/screen/plan/completionStatus/${time}` })
}

// 试验岗位人数
export const getPlanStationUserNum = () => {
  return request.get({ url: '/tplay/screen/plan/planStationUserNum' })
}

// 试验岗位人数弹窗
export const getPlanStationUser = (id) => {
  return request.get({ url: `/tplay/screen/plan/planStationUser/${id}` })
}

// 本周工作量
export const getWorkloadForWeek = () => {
  return request.get({ url: '/tplay/screen/plan/workloadForWeek' })
}


// 周计划
export const getListByPlanweek = () => {
  return request.get({ url: '/tplay/screen/plan/getListByPlanweek' })
}

// 年计划
export const getListByPlanyear = (id) => {
  return request.get({ url: `/tplay/screen/plan/getListByPlanyear/${id}` })
}

export const queryPlanweekresources = () => {
  return request.get({ url: '/tplay/planweekresources/queryPlanweekresources' })
}

// 保养任务板块
export const getPlanMaintenance = () => {
  return request.get({ url: '/tplay/screen/plan/maintenance' })
}

// 一级保养详情
export const getPlanmaintainoneinfoList = (params) => {
  return request.get({ url: '/tplay/planmaintainoneinfo/planmaintainoneinfoList', params })
}

// 一级保养类别查询
export const getOneLevelMaintenanceName = () => {
  return request.get({ url: '/tplay/screen/plan/oneLevelMaintenanceName' })
}

// 二级保养详情
export const getPlanmaintaintwoinfoList = (params) => {
  return request.get({
    url: '/tplay/planmaintaintwoinfo/querytplayPlanmaintaintwoinfoList',
    params
  })
}

// 二级保养类别查询
export const getTwoLevelMaintenanceName = () => {
  return request.get({ url: '/tplay/screen/plan/twoLevelMaintenanceName' })
}

// 技改任务板块
export const getPlanTechnical = () => {
  return request.get({ url: '/tplay/screen/plan/technical' })
}

// 技改任务详情查询
export const getPlantechnicalinfoBytaskId = (params) => {
  return request.get({
    url: '/tplay/plantechnicalinfo/getPlantechnicalinfoBytaskId',
    params
  })
}

// 技改任务年度查询
export const getTechnicalYear = () => {
  return request.get({ url: '/tplay/screen/plan/technicalYear' })
}

// 维修任务板块
export const getPlanRepair = () => {
  return request.get({ url: '/tplay/screen/plan/repair' })
}

// 本周临时维修任务详情
export const getPlantEmporaryList = () => {
  return request.get({ url: '/tplay/plantemporary/list' })
}

// 设备系统
export const getSystemTypeList = () => {
  return request.get({ url: '/tplay/screen/equipment/systemTypeList' })
}

// 关重设备数量及完好率
export const getAvailability = () => {
  return request.get({ url: '/tplay/screen/equipment/availability' })
}

// 关重设备投运数量及投运率
export const getWorking = () => {
  return request.get({ url: '/tplay/screen/equipment/working' })
}

// 每个子系统设备数量及完好率
export const getAvailabilityList = () => {
  return request.get({ url: '/tplay/screen/equipment/availabilityList' })
}

// 设备运行台时数
export const getRunTimeForYear = () => {
  return request.get({ url: '/tplay/screen/equipment/runTimeForYear' })
}

// 年度数据
export const getElectricityForYear = () => {
  return request.get({ url: '/tplay/screen/energy/electricityForYear' })
}

// 月度数据
export const getElectricityForMonth = () => {
  return request.get({ url: '/tplay/screen/energy/electricityForMonth' })
}

// 当前技术状态
export const getTechnologyStatus = (id) => {
  return request.get({
    url: '/tplay/screen/equipment/technologyStatus/' + id
  })
}

// 当前使用状态
export const getUseStatus = (id) => {
  return request.get({
    url: '/tplay/screen/equipment/useStatus/' + id
  })
}

// 当前运行时长数
export const getRunTime = (data) => {
  return request.post({
    url: '/tplay/screen/equipment/runTime',
    data
  })
}

// 获取每台设备运行详情
export const getSystem = (id) => {
  return request.get({
    url: '/tplay/screen/equipment/getSystem/' + id
  })
}
