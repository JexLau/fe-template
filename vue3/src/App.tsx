import { defineComponent, ref } from "vue";
import { getLocale, messages } from "@/locale";
import { Language } from "element-plus/lib/locale";

export default defineComponent({
  name: "App",
  setup() {
    /** 配置默认语言 */
    const language = getLocale();
    const locale = ref<Language>({
      name: language,
      el: messages[language],
    });

    return () => (
      <el-config-provider locale={locale}>
        <router-view />
      </el-config-provider>
    );
  },
});
