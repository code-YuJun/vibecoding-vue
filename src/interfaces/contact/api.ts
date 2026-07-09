import type { Contact, Pagination } from './model'

/** GET /api/list 请求参数 */
export interface GetContactListParams {
  /** 当前页码 */
  page?: number
  /** 每页条数 */
  pageSize?: number
  /** 全局搜索关键词，模糊匹配：姓名 / 邮箱 / 公司 / 职位 */
  keyword?: string
}

/** GET /api/list 响应数据（拦截器已返回 data 本体） */
export interface GetContactListResponse {
  /** 分页信息 */
  pagination: Pagination
  /** 联系人列表 */
  list: Contact[]
}
