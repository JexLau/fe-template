import HeaderTitle from "@/components/header-title";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import MemberForm from "./components/form";

export default defineComponent({
  name: "MemberCreate",
  setup() {
    const { t } = useI18n();

    return () => (
      <div class="content">
        <HeaderTitle title={t("member.createTitle")}></HeaderTitle>
        <el-row>
          <el-col span={8}>
            <MemberForm formType="create" />
          </el-col>
        </el-row>
      </div>
    );
  },
});
