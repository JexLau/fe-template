import { createApp } from 'vue'
import elementPlugin from "./element-plus";
import i18n from "./i18n";

/**
 * @description 加载所有 Plugins
 * @param  {ReturnType<typeofcreateApp>} app 整个应用的实例
 */
export function loadAllPlugins(app: ReturnType<typeof createApp>) {
  elementPlugin(app)
  i18n(app)
}
