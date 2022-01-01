import { createApp } from "vue";
import ElementUI, { ElMessage } from "element-plus";

export default function loadComponent(app: ReturnType<typeof createApp>) {
  // 全局注册
  app.use(ElementUI);
  app.config.globalProperties.$message = ElMessage;
}
