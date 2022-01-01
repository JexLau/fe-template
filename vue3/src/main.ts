import { createApp } from "vue";
import App from "./App";
import { loadAllPlugins } from "./plugins";
import store from "./store";
import router from "./router";

// 图标配置
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
library.add(faTrashAlt, faPlusCircle);

// 引入样式
import "./styles/index.less";

// 应用实例
export const app = createApp(App);

// 加载所有插件
loadAllPlugins(app);

// 全局注册组件
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(store).use(router).mount("#app");
