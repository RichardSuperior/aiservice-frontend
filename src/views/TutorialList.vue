<template>
  <div class="tutorial-list">
    <div class="page-header">
      <h1>教程中心</h1>
      <p>AI工具使用技巧与详细指南</p>
    </div>
    
    <div class="content-wrapper">
      <div class="tutorials-grid" v-loading="loading">
        <div class="tutorial-card" v-for="tutorial in tutorials" :key="tutorial.id" @click="goToDetail(tutorial.id)">
          <div class="tutorial-image">
            <img :src="tutorial.coverImage" :alt="tutorial.title">
          </div>
          <div class="tutorial-info">
            <h3>{{ tutorial.title }}</h3>
            <div class="meta">
              <span class="view-count">
                <el-icon><View /></el-icon>
                {{ tutorial.viewCount }} 次阅读
              </span>
              <span class="date">{{ formatDate(tutorial.createTime) }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <el-empty v-if="!loading && tutorials.length === 0" description="暂无教程" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { View } from '@element-plus/icons-vue'
import { getTutorialList } from '../api/tutorial'

const router = useRouter()

const loading = ref(false)
const tutorials = ref([])

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

const fetchTutorials = async () => {
  loading.value = true
  try {
    tutorials.value = await getTutorialList()
  } catch (error) {
    console.error('获取教程列表失败:', error)
  } finally {
    loading.value = false
  }
}

const goToDetail = (id) => {
  router.push(`/tutorial/${id}`)
}

onMounted(() => {
  fetchTutorials()
})
</script>

<style scoped>
.tutorial-list {
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

.tutorials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.tutorial-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.tutorial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
}

.tutorial-image {
  height: 200px;
  overflow: hidden;
}

.tutorial-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.tutorial-card:hover .tutorial-image img {
  transform: scale(1.05);
}

.tutorial-info {
  padding: 20px;
}

.tutorial-info h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
  line-height: 1.4;
  height: 50px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999;
  font-size: 14px;
}

.view-count {
  display: flex;
  align-items: center;
  gap: 5px;
}

@media (max-width: 1024px) {
  .tutorials-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .tutorials-grid {
    grid-template-columns: 1fr;
  }
  
  .page-header h1 {
    font-size: 28px;
  }
}
</style>
