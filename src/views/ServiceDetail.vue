<template>
  <div class="service-detail">
    <div class="content-wrapper" v-loading="loading">
      <div class="detail-card" v-if="service">
        <div class="service-header">
          <div class="service-image">
            <img :src="service.imageUrl" :alt="service.name">
          </div>
          <div class="service-basic">
            <span class="type-tag" :class="'type-' + service.type">{{ getTypeName(service.type) }}</span>
            <h1>{{ service.name }}</h1>
            <p class="price">¥{{ service.price }}</p>
            <el-button type="primary" size="large" @click="goToOrder">
              立即预约
            </el-button>
          </div>
        </div>
        
        <div class="service-content">
          <h2>服务详情</h2>
          <div class="description" v-html="service.description"></div>
        </div>
        
        <div class="action-bar">
          <el-button type="primary" size="large" @click="goToOrder">
            立即预约此服务
          </el-button>
          <el-button size="large" @click="$router.push('/services')">
            返回列表
          </el-button>
        </div>
      </div>
      
      <el-empty v-else description="服务不存在" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getProductDetail } from '../api/product'

const router = useRouter()
const route = useRoute()

const loading = ref(false)
const service = ref(null)

const typeNames = {
  1: '安装服务',
  2: '教学服务',
  3: '定制服务'
}

const getTypeName = (type) => typeNames[type] || '其他'

const fetchDetail = async () => {
  const id = route.params.id
  if (!id) return
  
  loading.value = true
  try {
    service.value = await getProductDetail(id)
  } catch (error) {
    console.error('获取服务详情失败:', error)
  } finally {
    loading.value = false
  }
}

const goToOrder = () => {
  router.push({
    path: '/order',
    query: { serviceId: service.value.id }
  })
}

onMounted(() => {
  fetchDetail()
})
</script>

<style scoped>
.service-detail {
  min-height: calc(100vh - 70px);
  background: #f5f7fa;
  padding: 40px 20px;
}

.content-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}

.detail-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.service-header {
  display: flex;
  gap: 40px;
  padding: 40px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7ed 100%);
}

.service-image {
  width: 400px;
  height: 280px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}

.service-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.service-basic {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.type-tag {
  display: inline-block;
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 14px;
  color: #fff;
  margin-bottom: 15px;
  width: fit-content;
}

.type-1 { background: #67C23A; }
.type-2 { background: #E6A23C; }
.type-3 { background: #F56C6C; }

.service-basic h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
}

.price {
  font-size: 36px;
  color: #f56c6c;
  font-weight: bold;
  margin-bottom: 30px;
}

.service-content {
  padding: 40px;
}

.service-content h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ebeef5;
}

.description {
  color: #666;
  line-height: 1.8;
  font-size: 16px;
}

.description :deep(h2) {
  font-size: 20px;
  color: #333;
  margin: 25px 0 15px;
}

.description :deep(p) {
  margin-bottom: 15px;
}

.description :deep(ul) {
  margin-bottom: 15px;
  padding-left: 20px;
}

.description :deep(li) {
  margin-bottom: 8px;
}

.action-bar {
  padding: 30px 40px;
  background: #f5f7fa;
  display: flex;
  gap: 20px;
  justify-content: center;
}

@media (max-width: 768px) {
  .service-header {
    flex-direction: column;
    padding: 20px;
  }
  
  .service-image {
    width: 100%;
    height: 200px;
  }
  
  .service-basic h1 {
    font-size: 24px;
  }
  
  .price {
    font-size: 28px;
  }
  
  .service-content {
    padding: 20px;
  }
  
  .action-bar {
    flex-direction: column;
    padding: 20px;
  }
}
</style>
