import request from '../utils/request'

// 创建订单
export function createOrder(data) {
  return request.post('/order/create', data)
}
