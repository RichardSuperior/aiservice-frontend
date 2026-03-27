import request from '../utils/request'

// 获取服务列表
export function getProductList() {
  return request.get('/product/list')
}

// 根据类型获取服务
export function getProductsByType(type) {
  return request.get(`/product/listByType/${type}`)
}

// 获取服务详情
export function getProductDetail(id) {
  return request.get(`/product/detail/${id}`)
}
