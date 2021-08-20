import { serviceUrl } from '@/config/app'
import { fetchUtils } from '@/utils/index'

export const categoryService = {
  getAll,
}

const baseUrl = `${serviceUrl}/categories`

function getAll() {
  return fetchUtils.get(baseUrl)
}
