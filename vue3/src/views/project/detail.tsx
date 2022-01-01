import HeaderTitle from "@/components/header-title";
import { FormType } from "@/typings/global.d";
import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import ProjectForm from "./components/form";

export default defineComponent({
  name: "ProjectDetail",
  setup() {
    const { t } = useI18n();
    const store = useStore();

    const formType = ref<FormType>("detail");
    const projectId = computed(() => {
      return store.state.settings.projectId;
    });
    const transformType = (type: FormType) => {
      console.log("type", type)
      formType.value = type;
    };

    return () => (
      <div class="content">
        <HeaderTitle title={t("global.menu.project")}></HeaderTitle>
        <el-row>
          <el-col>
            <ProjectForm
              formType={formType.value}
              id={projectId.value}
              onChange={transformType}
            />
          </el-col>
        </el-row>
      </div>
    );
  },
});
