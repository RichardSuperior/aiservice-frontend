<template>
  <div class="order-page">
    <div class="page-header">
      <h1>服务预约</h1>
      <p>填写您的信息，我们将尽快与您联系</p>
    </div>
    
    <div class="content-wrapper">
      <div class="order-card">
        <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
          <el-form-item label="选择服务" prop="serviceId">
            <el-select v-model="form.serviceId" placeholder="请选择您需要的服务" style="width: 100%">
              <el-option
                v-for="service in services"
                :key="service.id"
                :label="service.name + ' - ¥' + service.price"
                :value="service.id"
              />
            </el-select>
          </el-form-item>
          
          <el-form-item label="您的姓名" prop="userName">
            <el-input v-model="form.userName" placeholder="请输入您的姓名" />
          </el-form-item>
          
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入您的联系电话" />
          </el-form-item>
          
          <el-form-item label="备注说明" prop="remark">
            <el-input
              v-model="form.remark"
              type="textarea"
              :rows="4"
              placeholder="请描述您的具体需求，如安装环境、学习时间等"
            />
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" size="large" @click="submitOrder" :loading="submitting" style="width: 100%">
              提交预约
            </el-button>
          </el-form-item>
        </el-form>
        
        <div class="contact-info">
          <h3>其他联系方式</h3>
          <p><el-icon><Message /></el-icon> 微信：AI-Service</p>
          <p><el-icon><Phone /></el-icon> 工作时间：9:00-21:00</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Message, Phone } from '@element-plus/icons-vue'
import { getProductList } from '../api/product'
import { createOrder } from '../api/order'

const route = useRoute()
const router = useRouter()

const formRef = ref(null)
const services = ref([])
const submitting = ref(false)

const form = ref({
  serviceId: null,
  userName: '',
  phone: '',
  remark: ''
})

const rules = {
  serviceId: [
    { required: true, message: '请选择服务', trigger: 'change' }
  ],
  userName: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '姓名长度在2-20个字符', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ]
}

const fetchServices = async () => {
  try {
    services.value = await getProductList()
    
    // 如果URL中有serviceId参数，自动选中
    const serviceId = route.query.serviceId
    if (serviceId) {
      form.value.serviceId = parseInt(serviceId)
    }
  } catch (error) {
    console.error('获取服务列表失败:', error)
  }
}

const submitOrder = async () => {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return
  
  submitting.value = true
  try {
    await createOrder(form.value)
    ElMessage.success('预约成功，我们将尽快与您联系！')
    form.value = {
      serviceId: null,
      userName: '',
      phone: '',
      remark: ''
    }
    router.push('/')
  } catch (error) {
    console.error('提交预约失败:', error)
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  fetchServices()
})
</script>

<style scoped>
.order-page {
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
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
}

.order-card {
  background: #fff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.contact-info {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #ebeef5;
  text-align: center;
}

.contact-info h3 {
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
}

.contact-info p {
  color: #666;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 28px;
  }
  
  .order-card {
    padding: 20px;
  }
}
</style>
