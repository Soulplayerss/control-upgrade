import request from '@/axios'
import type {
  QueryWorkOrderType,
  QueryWorkOrderTypeListType,
  QueryWorkOrderUserListType,
  AddWorkOrderType,
  ChangeWorkOrderStatusType,
  ChangeWorkOrderLevelType,
  DesignatedReviewerType,
  CheckWorkOrderType
} from './types'

export const getWorkOrderList = (params: QueryWorkOrderType) => {
  return request.get({ url: '/query/getList', params })
}

export const getWorkOrderTypeList = (params?: QueryWorkOrderTypeListType) => {
  return request.get({ url: '/query/orderTypeList', params })
}

export const getWorkOrderUserList = (params?: QueryWorkOrderUserListType) => {
  return request.get({ url: '/query/getUserList', params })
}

export const getSharedPersonnelList = (params?: QueryWorkOrderUserListType) => {
  return request.get({ url: '/submit/getSharedPersonnelList', params })
}

export const addWorkOrder = (data: AddWorkOrderType) => {
  return request.post({ url: '/submit/create', data })
}

export const changeWorkOrderStatus = (data: ChangeWorkOrderStatusType) => {
  return request.post({ url: '/submit/changeStatus', data })
}

export const changeWorkOrderLevel = (data: ChangeWorkOrderLevelType) => {
  return request.post({ url: '/submit/changeLevel', data })
}

export const designatedReviewer = (data: DesignatedReviewerType) => {
  return request.post({ url: '/audit/designatedReviewer', data })
}

export const checkWorkOrder = (data: CheckWorkOrderType) => {
  return request.post({ url: '/audit/reviewTickets', data })
}

export const setSharedPersonnel = (data) => {
  return request.post({ url: '/submit/setSharedPersonnel', data })
}
