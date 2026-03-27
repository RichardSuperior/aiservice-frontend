<template>
  <div class="home">
    <!-- Banner区域 -->
    <section class="banner">
      <div class="banner-content">
        <h1>专业AI服务，助力您的数字化转型</h1>
        <p>提供AI工具安装、使用教学、私人定制等一站式服务</p>
        <div class="banner-btns">
          <el-button type="primary" size="large" @click="$router.push('/services')">
            浏览服务
          </el-button>
          <el-button size="large" @click="$router.push('/order')">
            立即预约
          </el-button>
        </div>
      </div>
    </section>

    <!-- 服务类型 -->
    <section class="service-types">
      <div class="section-title">
        <h2>我们的服务</h2>
        <p>专业、高效、贴心的AI服务体验</p>
      </div>
      <div class="types-grid">
        <div class="type-card" v-for="type in serviceTypes" :key="type.id">
          <div class="type-icon">
            <el-icon size="48" :color="type.color">
              <component :is="type.icon" />
            </el-icon>
          </div>
          <h3>{{ type.name }}</h3>
          <p>{{ type.desc }}</p>
          <el-button type="primary" text @click="goToServices(type.id)">
            了解更多 <el-icon><ArrowRight /></el-icon>
          </el-button>
        </div>
      </div>
    </section>

    <!-- 热门服务 -->
    <section class="hot-services">
      <div class="section-title">
        <h2>热门服务</h2>
        <p>最受欢迎的AI服务推荐</p>
      </div>
      <div class="services-grid">
        <div class="service-card" v-for="service in hotServices" :key="service.id" @click="goToDetail(service.id)">
          <div class="service-image">
            <img :src="service.imageUrl" :alt="service.name">
          </div>
          <div class="service-info">
            <h3>{{ service.name }}</h3>
            <p class="desc">{{ service.description }}</p>
            <div class="service-footer">
              <span class="price">¥{{ service.price }}</span>
              <el-button type="primary" size="small">查看详情</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="more-btn">
        <el-button type="primary" plain @click="$router.push('/services')">
          查看全部服务
        </el-button>
      </div>
    </section>

    <!-- 最新教程 -->
    <section class="latest-tutorials">
      <div class="section-title">
        <h2>最新教程</h2>
        <p>AI工具使用技巧与指南</p>
      </div>
      <div class="tutorials-list">
        <div class="tutorial-item" v-for="tutorial in latestTutorials" :key="tutorial.id" @click="goToTutorial(tutorial.id)">
          <div class="tutorial-image">
            <img :src="tutorial.coverImage" :alt="tutorial.title">
          </div>
          <div class="tutorial-info">
            <h3>{{ tutorial.title }}</h3>
            <p class="view-count">
              <el-icon><View /></el-icon>
              {{ tutorial.viewCount }} 次阅读
            </p>
          </div>
        </div>
      </div>
      <div class="more-btn">
        <el-button type="primary" plain @click="$router.push('/tutorials')">
          查看全部教程
        </el-button>
      </div>
    </section>

    <!-- 为什么选择我们 -->
    <section class="why-us">
      <div class="section-title">
        <h2>为什么选择我们</h2>
        <p>专业团队，优质服务，值得信赖</p>
      </div>
      <div class="features-grid">
        <div class="feature-item" v-for="feature in features" :key="feature.id">
          <el-icon size="40" color="#409EFF">
            <component :is="feature.icon" />
          </el-icon>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.desc }}</p>
        </div>
      </div>
    </section>

    <!-- CTA区域 -->
    <section class="cta-section">
      <div class="cta-content">
        <h2>准备好开始使用AI了吗？</h2>
        <p>立即预约，享受专业的AI服务</p>
        <el-button type="primary" size="large" @click="$router.push('/order')">
          立即预约
        </el-button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Download, Reading, SetUp, ArrowRight, View, Check, Timer, User } from '@element-plus/icons-vue'
import { getProductList } from '../api/product'
import { getTutorialList } from '../api/tutorial'

const router = useRouter()

const serviceTypes = [
  { id: 1, name: '安装服务', desc: '帮您安装配置各种AI工具', icon: 'Download', color: '#67C23A' },
  { id: 2, name: '教学服务', desc: '一对一教授AI工具使用', icon: 'Reading', color: '#E6A23C' },
  { id: 3, name: '定制服务', desc: '根据需求定制AI解决方案', icon: 'SetUp', color: '#F56C6C' }
]

const features = [
  { id: 1, title: '专业团队', desc: '拥有丰富的AI工具使用经验', icon: 'User' },
  { id: 2, title: '高效服务', desc: '快速响应，及时解决问题', icon: 'Timer' },
  { id: 3, title: '质量保证', desc: '服务不满意可申请退款', icon: 'Check' }
]

const hotServices = ref([])
const latestTutorials = ref([])

const fetchData = async () => {
  try {
    const products = await getProductList()
    hotServices.value = products.slice(0, 4)
    
    const tutorials = await getTutorialList()
    latestTutorials.value = tutorials.slice(0, 3)
  } catch (error) {
    console.error('获取数据失败:', error)
  }
}

const goToServices = (type) => {
  router.push({ path: '/services', query: { type } })
}

const goToDetail = (id) => {
  router.push(`/service/${id}`)
}

const goToTutorial = (id) => {
  router.push(`/tutorial/${id}`)
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.home {
  padding-bottom: 0;
}

/* Banner */
.banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  padding: 100px 20px;
  text-align: center;
}

.banner-content h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.banner-content p {
  font-size: 20px;
  margin-bottom: 30px;
  opacity: 0.9;
}

.banner-btns {
  display: flex;
  gap: 20px;
  justify-content: center;
}

/* 通用标题样式 */
.section-title {
  text-align: center;
  margin-bottom: 50px;
}

.section-title h2 {
  font-size: 36px;
  color: #333;
  margin-bottom: 10px;
}

.section-title p {
  font-size: 16px;
  color: #666;
}

/* 服务类型 */
.service-types {
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.types-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.type-card {
  background: #fff;
  border-radius: 12px;
  padding: 40px 30px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.type-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
}

.type-icon {
  margin-bottom: 20px;
}

.type-card h3 {
  font-size: 22px;
  margin-bottom: 10px;
  color: #333;
}

.type-card p {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

/* 热门服务 */
.hot-services {
  padding: 80px 20px;
  background: #fff;
}

.hot-services > *:not(.services-grid) {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.services-grid {
  max-width: 1200px;
  margin: 0 auto 30px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.service-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: transform 0.3s;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-image {
  height: 160px;
  overflow: hidden;
}

.service-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

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
  font-size: 20px;
  color: #f56c6c;
  font-weight: bold;
}

.more-btn {
  text-align: center;
}

/* 最新教程 */
.latest-tutorials {
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.tutorials-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.tutorial-item {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: transform 0.3s;
}

.tutorial-item:hover {
  transform: translateY(-5px);
}

.tutorial-image {
  height: 180px;
  overflow: hidden;
}

.tutorial-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tutorial-info {
  padding: 20px;
}

.tutorial-info h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
  line-height: 1.4;
  height: 44px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.view-count {
  color: #999;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* 为什么选择我们 */
.why-us {
  padding: 80px 20px;
  background: #fff;
}

.why-us > * {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.features-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.feature-item {
  text-align: center;
  padding: 30px;
}

.feature-item .el-icon {
  margin-bottom: 20px;
}

.feature-item h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.feature-item p {
  color: #666;
}

/* CTA */
.cta-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 80px 20px;
  text-align: center;
  color: #fff;
}

.cta-content h2 {
  font-size: 36px;
  margin-bottom: 15px;
}

.cta-content p {
  font-size: 18px;
  margin-bottom: 30px;
  opacity: 0.9;
}

/* 响应式 */
@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .banner-content h1 {
    font-size: 32px;
  }
  
  .types-grid,
  .services-grid,
  .tutorials-list,
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .banner-btns {
    flex-direction: column;
    align-items: center;
  }
}
</style>
