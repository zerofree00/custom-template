export interface LoginData{
  loginName:string
  password: string
  rootId: string
}

export interface Page{
  keyName: string
  keywords: string
  order: boolean
  pageNum: number
  pageSize: number
  sort: string
}

export interface SelectMemberType{
  faction?: string
  ignores?: string
  internalOrganization?: string
  keyword?: string
  sector?: string
  sessionId?: string
}

export interface CollectiveLeftType{
  type?: string
  ignores?: string
}

export interface CollectiveRightType{
  userType?: number
  ignores?: string
  keyword?: string
}

export interface OfficeRight{
  ignores?: string
  keywords?: string
  unitId?: string
}
