<template>
  <div class="layout">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="header-content">
        <div class="logo" @click="$router.push('/')">
          <el-icon size="32" color="#409EFF"><Service /></el-icon>
          <span>AI服务平台</span>
        </div>
        <nav class="nav">
          <router-link to="/" :class="{ active: $route.path === '/' }">首页</router-link>
          <router-link to="/services" :class="{ active: $route.path.includes('/service') }">服务</router-link>
          <router-link to="/tutorials" :class="{ active: $route.path.includes('/tutorial') }">教程</router-link>
          <router-link to="/about" :class="{ active: $route.path === '/about' }">关于</router-link>
        </nav>
        <div class="contact-btn">
          <el-button type="primary" @click="$router.push('/order')">立即预约</el-button>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- 底部 -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>AI服务平台</h3>
          <p>专业的AI服务提供商</p>
          <p>让AI技术触手可及</p>
        </div>
        <div class="footer-section">
          <h3>快速链接</h3>
          <p><router-link to="/services">服务项目</router-link></p>
          <p><router-link to="/tutorials">使用教程</router-link></p>
          <p><router-link to="/about">关于我们</router-link></p>
        </div>
        <div class="footer-section">
          <h3>联系方式</h3>
          <p><el-icon><Phone /></el-icon> 微信：AISupportCenter</p>
          <p><el-icon><Message /></el-icon> 邮箱：918953140@qq.com</p>
          <p><el-icon><Clock /></el-icon> 工作时间：9:00-21:00</p>
        </div>
      </div>
      <div class="copyright">
        <p>© 2026 AI在线服务平台 版权所有</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { Service, Phone, Message, Clock } from '@element-plus/icons-vue'
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.logo span {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
}

.nav {
  display: flex;
  gap: 40px;
}

.nav a {
  text-decoration: none;
  color: #666;
  font-size: 16px;
  transition: color 0.3s;
  position: relative;
}

.nav a:hover,
.nav a.active {
  color: #409EFF;
}

.nav a.active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  height: 2px;
  background: #409EFF;
}

.main-content {
  flex: 1;
}

.footer {
  background: #2c3e50;
  color: #fff;
  padding: 40px 0 20px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.footer-section h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #409EFF;
}

.footer-section p {
  margin-bottom: 10px;
  color: #bdc3c7;
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-section a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section a:hover {
  color: #409EFF;
}

.copyright {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #34495e;
  color: #95a5a6;
}

@media (max-width: 768px) {
  .header-content {
    flex-wrap: wrap;
    height: auto;
    padding: 10px 20px;
  }
  
  .nav {
    gap: 20px;
    margin: 10px 0;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>
