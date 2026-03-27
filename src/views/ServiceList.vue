<template>
  <div class="service-list">
    <div class="page-header">
      <h1>服务项目</h1>
      <p>专业的AI服务，满足您的各种需求</p>
    </div>
    
    <div class="content-wrapper">
      <!-- 筛选标签 -->
      <div class="filter-tabs">
        <el-radio-group v-model="currentType" @change="handleTypeChange">
          <el-radio-button :label="0">全部</el-radio-button>
          <el-radio-button :label="1">安装服务</el-radio-button>
          <el-radio-button :label="2">教学服务</el-radio-button>
          <el-radio-button :label="3">定制服务</el-radio-button>
        </el-radio-group>
      </div>
      
      <!-- 服务列表 -->
      <div class="services-grid" v-loading="loading">
        <div class="service-card" v-for="service in services" :key="service.id" @click="goToDetail(service.id)">
          <div class="service-image">
            <img :src="service.imageUrl" :alt="service.name">
            <span class="type-tag" :class="'type-' + service.type">{{ getTypeName(service.type) }}</span>
          </div>
          <div class="service-info">
            <h3>{{ service.name }}</h3>
            <p class="desc">{{ service.description }}</p>
            <div class="service-footer">
              <span class="price">¥{{ service.price }}</span>
              <el-button type="primary">立即预约</el-button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <el-empty v-if="!loading && services.length === 0" description="暂无服务" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getProductList, getProductsByType } from '../api/product'

const router = useRouter()
const route = useRoute()

const loading = ref(false)
const services = ref([])
const currentType = ref(0)

const typeNames = {
  1: '安装服务',
  2: '教学服务',
  3: '定制服务'
}

const getTypeName = (type) => typeNames[type] || '其他'

const fetchServices = async () => {
  loading.value = true
  try {
    if (currentType.value === 0) {
      services.value = await getProductList()
    } else {
      services.value = await getProductsByType(currentType.value)
    }
  } catch (error) {
    console.error('获取服务列表失败:', error)
  } finally {
    loading.value = false
  }
}

const handleTypeChange = () => {
  fetchServices()
}

const goToDetail = (id) => {
  router.push(`/service/${id}`)
}

onMounted(() => {
  const type = route.query.type
  if (type) {
    currentType.value = parseInt(type)
  }
  fetchServices()
})

watch(() => route.query.type, (newType) => {
  if (newType) {
    currentType.value = parseInt(newType)
    fetchServices()
  }
})
</script>

<style scoped>
.service-list {
  min-height: calc(100vh - 70px);
  background: #f5f7fa;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  padding: 60px 20px;
  text-align: center;
}

.page-header h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

.page-header p {
  font-size: 16px;
  opacity: 0.9;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.filter-tabs {
  margin-bottom: 30px;
  text-align: center;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.service-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
}

.service-image {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.service-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.type-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  color: #fff;
}

.type-1 { background: #67C23A; }
.type-2 { background: #E6A23C; }
.type-3 { background: #F56C6C; }

.service-info {
  padding: 20px;
}

.service-info h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.service-info .desc {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 15px;
  height: 42px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.service-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 24px;
  color: #f56c6c;
  font-weight: bold;
}

@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .page-header h1 {
    font-size: 28px;
  }
}
</style>
