<template>
  <div class="tutorial-detail">
    <div class="content-wrapper" v-loading="loading">
      <div class="detail-card" v-if="tutorial">
        <div class="tutorial-header">
          <h1>{{ tutorial.title }}</h1>
          <div class="meta">
            <span class="view-count">
              <el-icon><View /></el-icon>
              {{ tutorial.viewCount }} 次阅读
            </span>
            <span class="date">{{ formatDate(tutorial.createTime) }}</span>
          </div>
        </div>
        
        <div class="tutorial-cover" v-if="tutorial.coverImage">
          <img :src="tutorial.coverImage" :alt="tutorial.title">
        </div>
        
        <div class="tutorial-content">
          <div class="content-body" v-html="tutorial.content"></div>
        </div>
        
        <div class="action-bar">
          <el-button type="primary" @click="$router.push('/order')">
            需要相关服务？立即预约
          </el-button>
          <el-button @click="$router.push('/tutorials')">
            返回教程列表
          </el-button>
        </div>
      </div>
      
      <el-empty v-else description="教程不存在" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { View } from '@element-plus/icons-vue'
import { getTutorialDetail } from '../api/tutorial'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const tutorial = ref(null)

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

const fetchDetail = async () => {
  const id = route.params.id
  if (!id) return
  
  loading.value = true
  try {
    tutorial.value = await getTutorialDetail(id)
  } catch (error) {
    console.error('获取教程详情失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDetail()
})
</script>

<style scoped>
.tutorial-detail {
  min-height: calc(100vh - 70px);
  background: #f5f7fa;
  padding: 40px 20px;
}

.content-wrapper {
  max-width: 900px;
  margin: 0 auto;
}

.detail-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.tutorial-header {
  padding: 40px 40px 20px;
}

.tutorial-header h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 15px;
  line-height: 1.4;
}

.meta {
  display: flex;
  gap: 20px;
  color: #999;
  font-size: 14px;
}

.view-count {
  display: flex;
  align-items: center;
  gap: 5px;
}

.tutorial-cover {
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.tutorial-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tutorial-content {
  padding: 40px;
}

.content-body {
  color: #333;
  line-height: 1.8;
  font-size: 16px;
}

.content-body :deep(h2) {
  font-size: 24px;
  color: #333;
  margin: 30px 0 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #409EFF;
}

.content-body :deep(h3) {
  font-size: 20px;
  color: #333;
  margin: 25px 0 12px;
}

.content-body :deep(p) {
  margin-bottom: 15px;
}

.content-body :deep(ul),
.content-body :deep(ol) {
  margin-bottom: 15px;
  padding-left: 25px;
}

.content-body :deep(li) {
  margin-bottom: 8px;
}

.content-body :deep(code) {
  background: #f5f7fa;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #e83e8c;
}

.content-body :deep(pre) {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 15px;
}

.content-body :deep(pre code) {
  background: transparent;
  color: inherit;
  padding: 0;
}

.content-body :deep(blockquote) {
  border-left: 4px solid #409EFF;
  padding-left: 15px;
  margin: 15px 0;
  color: #666;
}

.content-body :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 15px 0;
}

.action-bar {
  padding: 30px 40px;
  background: #f5f7fa;
  display: flex;
  gap: 20px;
  justify-content: center;
}

@media (max-width: 768px) {
  .tutorial-header {
    padding: 20px;
  }
  
  .tutorial-header h1 {
    font-size: 24px;
  }
  
  .tutorial-cover {
    height: 200px;
  }
  
  .tutorial-content {
    padding: 20px;
  }
  
  .action-bar {
    flex-direction: column;
    padding: 20px;
  }
}
</style>
