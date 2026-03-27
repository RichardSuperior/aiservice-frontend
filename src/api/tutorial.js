import request from '../utils/request'

// 获取教程列表
export function getTutorialList() {
  return request.get('/tutorial/list')
}

// 获取教程详情
export function getTutorialDetail(id) {
  return request.get(`/tutorial/detail/${id}`)
}
