import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
library.add(faUser);
import classes from "./index.module.less";

export default defineComponent({
  name: "app-header",
  setup() {
    const { t } = useI18n();
    return () => (
      <el-header class={classes["app-header"]}>
        <h1 class={classes["app-name"]}>{t("header.title")}</h1>
        <font-awesome-icon icon={["fas", "user"]} size="2x" />
      </el-header>
    );
  },
});
