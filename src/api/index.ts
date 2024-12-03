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
