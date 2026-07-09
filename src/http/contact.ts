import request from '@/utils/request'
import type { GetContactListParams, GetContactListResponse } from '@/interfaces/contact/api'

/** 获取联系人列表 */
export function getContactList(params: GetContactListParams) {
  return request.get<unknown, GetContactListResponse>('/list', { params })
}
