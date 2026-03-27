<template>
  <div class="about-page">
    <div class="page-header">
      <h1>关于我们</h1>
      <p>专业AI服务，让技术更简单</p>
    </div>
    
    <div class="content-wrapper">
      <div class="about-card">
        <section class="intro">
          <h2>平台简介</h2>
          <p>AI在线服务平台是一家专注于AI技术服务的个人工作室。我们致力于帮助个人和企业快速掌握和应用AI工具，提升工作效率，实现数字化转型。</p>
          <p>无论您是需要安装配置AI工具、学习使用技巧，还是定制专属的AI解决方案，我们都能为您提供专业、高效、贴心的服务。</p>
        </section>
        
        <section class="services">
          <h2>我们的服务</h2>
          <div class="service-grid">
            <div class="service-item">
              <el-icon size="40" color="#67C23A"><Download /></el-icon>
              <h3>安装服务</h3>
              <p>帮您安装配置各种AI工具，包括OpenClaw、ChatGPT、Midjourney、Stable Diffusion等</p>
            </div>
            <div class="service-item">
              <el-icon size="40" color="#E6A23C"><Reading /></el-icon>
              <h3>教学服务</h3>
              <p>一对一教授AI工具使用技巧，从入门到精通，让您快速掌握AI技能</p>
            </div>
            <div class="service-item">
              <el-icon size="40" color="#F56C6C"><SetUp /></el-icon>
              <h3>定制服务</h3>
              <p>根据您的具体需求，提供个性化的AI解决方案和咨询服务</p>
            </div>
          </div>
        </section>
        
        <section class="advantages">
          <h2>我们的优势</h2>
          <div class="advantage-list">
            <div class="advantage-item">
              <el-icon size="30" color="#409EFF"><Check /></el-icon>
              <div>
                <h4>专业经验</h4>
                <p>丰富的AI工具使用经验，熟悉各类AI产品的安装配置和使用技巧</p>
              </div>
            </div>
            <div class="advantage-item">
              <el-icon size="30" color="#409EFF"><Timer /></el-icon>
              <div>
                <h4>高效响应</h4>
                <p>快速响应客户需求，及时解决问题，节省您的宝贵时间</p>
              </div>
            </div>
            <div class="advantage-item">
              <el-icon size="30" color="#409EFF"><User /></el-icon>
              <div>
                <h4>贴心服务</h4>
                <p>一对一服务，耐心解答，确保您完全掌握所学内容</p>
              </div>
            </div>
            <div class="advantage-item">
              <el-icon size="30" color="#409EFF"><CircleCheck /></el-icon>
              <div>
                <h4>质量保证</h4>
                <p>服务不满意可申请退款，让您无后顾之忧</p>
              </div>
            </div>
          </div>
        </section>
        
        <section class="contact">
          <h2>联系我们</h2>
          <div class="contact-grid">
            <div class="contact-item">
              <el-icon size="30"><Message /></el-icon>
              <h4>微信</h4>
              <p>AI-Service</p>
            </div>
            <div class="contact-item">
              <el-icon size="30"><Phone /></el-icon>
              <h4>工作时间</h4>
              <p>9:00 - 21:00</p>
            </div>
            <div class="contact-item">
              <el-icon size="30"><Location /></el-icon>
              <h4>服务范围</h4>
              <p>全国线上服务</p>
            </div>
          </div>
        </section>
        
        <div class="cta">
          <el-button type="primary" size="large" @click="$router.push('/order')">
            立即预约服务
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Download, Reading, SetUp, Check, Timer, User, CircleCheck, Message, Phone, Location } from '@element-plus/icons-vue'
</script>

<style scoped>
.about-page {
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
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

.about-card {
  background: #fff;
  border-radius: 12px;
  padding: 50px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

section {
  margin-bottom: 50px;
}

section h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #409EFF;
  display: inline-block;
}

.intro p {
  color: #666;
  line-height: 1.8;
  margin-bottom: 15px;
  font-size: 16px;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 30px;
}

.service-item {
  text-align: center;
  padding: 30px;
  background: #f5f7fa;
  border-radius: 12px;
}

.service-item .el-icon {
  margin-bottom: 15px;
}

.service-item h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.service-item p {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

.advantage-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  margin-top: 30px;
}

.advantage-item {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.advantage-item h4 {
  font-size: 18px;
  color: #333;
  margin-bottom: 5px;
}

.advantage-item p {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 30px;
}

.contact-item {
  text-align: center;
  padding: 30px;
  background: #f5f7fa;
  border-radius: 12px;
}

.contact-item .el-icon {
  color: #409EFF;
  margin-bottom: 15px;
}

.contact-item h4 {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.contact-item p {
  color: #666;
}

.cta {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid #ebeef5;
}

@media (max-width: 768px) {
  .about-card {
    padding: 25px;
  }
  
  .service-grid,
  .advantage-list,
  .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .page-header h1 {
    font-size: 28px;
  }
}
</style>
