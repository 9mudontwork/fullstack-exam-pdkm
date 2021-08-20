import { serviceUrl } from '@/config/app'
import { fetchUtils } from '@/utils/index'

export const storeService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  addProduct: addProduct,
  deleteProduct: deleteProduct,
}

const baseUrl = `${serviceUrl}/stores`

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

function addProduct(id, params) {
  return fetchUtils.post(`${baseUrl}/${id}/products`, params)
}

function deleteProduct(storeId, productId) {
  return fetchUtils.delete(`${baseUrl}/${storeId}/products/${productId}`)
}
