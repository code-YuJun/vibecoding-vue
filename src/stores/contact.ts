import { debounce } from 'lodash-es'
import { getContactList } from '@/http/contact'
import type { Contact, Pagination } from '@/interfaces/contact/model'
import type { ViewMode } from '@/views/Contacts/types'
import { DEFAULT_PAGE_SIZE, SEARCH_DEBOUNCE_DELAY } from '@/views/Contacts/constants'

export const useContactStore = defineStore('contact', () => {
  const list = ref<Contact[]>([])
  const pagination = ref<Pagination>({
    currentPage: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    total: 0,
    totalPages: 0,
  })
  const loading = ref(false)
  const page = ref(1)
  const pageSize = ref(DEFAULT_PAGE_SIZE)
  const keyword = ref('')
  const viewMode = ref<ViewMode>('grid')

  async function fetchList() {
    loading.value = true
    try {
      const res = await getContactList({
        page: page.value,
        pageSize: pageSize.value,
        keyword: keyword.value,
      })
      list.value = res.list
      pagination.value = res.pagination
    } finally {
      loading.value = false
    }
  }

  /** 搜索防抖：300ms 内重复输入只触发一次请求 */
  const debouncedFetchList = debounce(fetchList, SEARCH_DEBOUNCE_DELAY)

  function setPage(newPage: number) {
    page.value = newPage
    fetchList()
  }

  function setKeyword(newKeyword: string) {
    keyword.value = newKeyword
    page.value = 1
    debouncedFetchList()
  }

  function setViewMode(mode: ViewMode) {
    viewMode.value = mode
  }

  return {
    list,
    pagination,
    loading,
    page,
    pageSize,
    keyword,
    viewMode,
    fetchList,
    setPage,
    setKeyword,
    setViewMode,
  }
})
