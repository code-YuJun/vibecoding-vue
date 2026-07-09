/** 联系人业务模型（来源：Apifox GET /api/list 响应 data.list.items） */
export interface Contact {
  /** 联系人唯一ID，编辑/删除主键 */
  id: number
  /** 头像图片地址，无头像返回空 */
  avatar: string
  /** 姓名 */
  fullName: string
  /** 职位 */
  position: string
  /** 公司 */
  company: string
  /** 联系电话 */
  phone: string
  /** 邮箱 */
  email: string
  /** 团队标识 Hs/Av/Cz，前端渲染彩色标签 */
  teamCode: string
  /** 可选：前端直接用色值（本期采用前端色表，忽略此字段） */
  teamColor?: string
}

/** 分页信息 */
export interface Pagination {
  /** 当前页码 */
  currentPage: number
  /** 每页条数 */
  pageSize: number
  /** 总数据量 */
  total: number
  /** 总页数 */
  totalPages: number
}
