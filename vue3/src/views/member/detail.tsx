import HeaderTitle from "@/components/header-title";
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import MemberForm from "./components/form";
import { useRoute } from "vue-router";
import { FormType } from "@/typings/global.d";

export default defineComponent({
  name: "MemberDetail",
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const memberId = route.params.id as string;
    const formType = ref<FormType>("detail");

    const transformType = (type: FormType) => {
      console.log("type", type);
      formType.value = type;
    };

    return () => (
      <div class="content">
        <HeaderTitle title={t("member.detail")}></HeaderTitle>
        <el-row>
          <el-col>
            <MemberForm
              formType={formType.value}
              id={memberId}
              onChange={transformType}
            />
          </el-col>
        </el-row>
      </div>
    );
  },
});
