import request from '@/axios'

// 实验计划板块
export const getPlanExperiment = (params) => {
  return request.get({ url: '/tplay/screen/plan/experiment', params })
}

// 保养任务板块
export const getPlanMaintenance = () => {
  return request.get({ url: '/tplay/screen/plan/maintenance' })
}

// 技改任务板块
export const getPlanTechnical = () => {
  return request.get({ url: '/tplay/screen/plan/technical' })
}

// 维修任务板块
export const getPlanRepair = () => {
  return request.get({ url: '/tplay/screen/plan/repair' })
}

// 维修任务板块
export const getSystemTypeList = () => {
  return request.get({ url: '/tplay/screen/equipment/systemTypeList' })
}

// 维修任务板块
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
