import { serviceUrl } from '@/config/app'
import { fetchUtils } from '@/utils/index'

export const productService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
}

const baseUrl = `${serviceUrl}/products`

function getAll() {
  return fetchUtils.get(baseUrl)
}

function getById(id) {
  return fetchUtils.get(`${baseUrl}/${id}`)
}

function create(params) {
  return fetchUtils.post(baseUrl, params)
}

function update(id, params) {
  return fetchUtils.put(`${baseUrl}/${id}`, params)
}

function _delete(id) {
  return fetchUtils.delete(`${baseUrl}/${id}`)
}
