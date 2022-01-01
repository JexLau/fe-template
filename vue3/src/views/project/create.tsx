import HeaderTitle from "@/components/header-title";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import ProjectForm from "./components/form";

export default defineComponent({
  name: "ProjectCreate",
  setup() {
    const { t } = useI18n();

    return () => (
      <div class="content">
        <HeaderTitle title={t("project.createTitle")}></HeaderTitle>
        <el-row>
          <el-col span={8}>
            <ProjectForm formType="create" />
          </el-col>
        </el-row>
      </div>
    );
  },
});
