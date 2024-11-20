export type QueryWorkOrderType = {
  listType: number
  page?: number
  size?: number
  isDetails?: number
  workOrderId?: string
  workOrderLevelList?: string[]
  workOrderStatusList?: string[]
  workOrderTypeList?: string[]
  backstageTypeList?: string[]
  handlers?: string
  createUser?: string
  createTimeStart?: string
  createTimeEnd?: string
}

export type QueryWorkOrderTypeListType = {
  backstageType?: number | string
  workOrderType?: number | string
}

export type QueryWorkOrderUserListType = {
  backstageType: number | string
}

export type AddWorkOrderType = {
  backstageType: number | string
  workOrderType: number | string
  workOrderLevel: number | string
  handlers?: string
  sharedPersonnel?: any
  workOrderDesc?: string
  workOrderParam?: string
}

export type ChangeWorkOrderStatusType = {
  workOrderId: string
  workOrderStatus: number | string
  workOrderDesc?: string
}

export type ChangeWorkOrderLevelType = {
  workOrderId: string
  workOrderLevel: number | string
}

export type DesignatedReviewerType = {
  workOrderId: string
  handlers: string
  workOrderDesc?: string
}

export type CheckWorkOrderType = {
  workOrderId: string
  workOrderStatus: number | string
  workOrderDesc?: string
}
