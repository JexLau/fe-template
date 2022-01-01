import { ElMessage } from "element-plus";
import {
  defineComponent,
  PropType,
  reactive,
  ref,
  toRefs,
  watchEffect,
} from "vue";
import { useRouter } from "vue-router";
import { IMemberCreateRequest, IMemberListVo } from "@/mock/member";
import { AGetDetail, APostCreate } from "@/api/member";
import { ElFormCtx, FormType } from "@/typings/global.d";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "MemberForm",
  props: {
    /** 控制表单渲染的类型 */
    formType: {
      type: String as PropType<FormType>,
      required: true,
    },
    /** 详情表单需要用到的id */
    id: {
      type: String,
      default: "0",
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    /** 将props变成响应式的 */
    const { formType, id } = toRefs(props);
    /** 详情数据 */
    let detail = reactive({
      data: {} as IMemberListVo,
    });
    /** router */
    const router = useRouter();
    /** props */
    const onChange = (val: string) => emit("change", val);
    /** 表单实例 */
    const memberFormRef = ref<ElFormCtx>();
    /** 表单数据 */
    const memberFormModel = reactive<IMemberCreateRequest>({
      memberName: "",
      position: "",
      belongs: "",
    });
    /** 表单校验规则 */
    const rules = {
      memberName: [
        {
          required: true,
          trigger: "change",
        },
      ],
      position: [
        {
          required: true,
          trigger: "change",
        },
      ],
      belongs: [
        {
          required: true,
          trigger: "change",
        },
      ],
    };
    /** 获取详情数据 */
    const getDetail = async () => {
      if (["detail", "edit"].includes(formType.value)) {
        const res = await AGetDetail({
          id: Number(id.value),
        });
        if (res?.success && res.data) {
          detail.data = res.data;
          memberFormModel.memberName = detail.data.memberName;
          memberFormModel.position = detail.data.position;
          memberFormModel.belongs = detail.data.belongs;
          memberFormModel.id = detail.data.id;
        } else {
          ElMessage.error(res?.message || "该成员不存在");
        }
      }
    };
    const { t } = useI18n();

    watchEffect(() => {
      getDetail();
    });

    /** 编辑表单 */
    const editForm = async () => {
      onChange("edit");
    };

    const linkBackMember = () => {
      router.push("/member");
    };

    /** 提交表单 */
    const submitForm = async () => {
      // 校验操作
      const isAllow = await memberFormRef?.value?.validate();
      if (isAllow) {
        const {
          memberName = "",
          belongs = "",
          position,
          id,
        } = memberFormModel || {};
        const res = await APostCreate({
          id,
          memberName,
          belongs,
          position,
        });
        if (res?.success) {
          ElMessage.success(res?.message || "操作成功");
          if (formType.value === "create") {
            router.push({
              path: "/member",
            });
          } else if (formType.value === "edit") {
            onChange("detail");
          }
        } else {
          ElMessage.error(res?.message || "操作失败");
        }
      }
    };

    /** 取消 */
    const cancel = () => {
      if (formType.value === "create") {
        router.push("/member");
      } else if (formType.value === "edit") {
        onChange("detail");
      }
    };

    /** 渲染详情类型表单 */
    const renderDetailForm = () => {
      return (
        <>
          <el-form-item label={t("member.memberName")} prop="memberName">
            <div>{detail.data.memberName}</div>
          </el-form-item>
          <el-form-item label={t("member.position")} prop="position">
            <div>{detail.data.position}</div>
          </el-form-item>
          <el-form-item label={t("member.belongs")} prop="belongs">
            <div>{detail.data.belongs}</div>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" size="small" onClick={editForm}>
              {t("global.edit")}
            </el-button>
            <el-button size="small" plain onClick={linkBackMember}>
              {t("global.back")}
            </el-button>
          </el-form-item>
        </>
      );
    };

    /** 渲染编辑+新增类型表单 */
    const renderEditForm = () => {
      return (
        <>
          <el-form-item label={t("member.memberName")} prop="memberName">
            <el-input
              v-model={memberFormModel.memberName}
              onChange={(val: string) => (memberFormModel.memberName = val)}
            ></el-input>
          </el-form-item>
          <el-form-item label={t("member.belongs")} prop="belongs">
            <el-input
              v-model={memberFormModel.belongs}
              onChange={(val: string) => (memberFormModel.belongs = val)}
            ></el-input>
          </el-form-item>
          <el-form-item label={t("member.position")} prop="position">
            <el-input
              v-model={memberFormModel.position}
              onChange={(val: string) => (memberFormModel.position = val)}
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" size="small" onClick={submitForm}>
              {formType.value === "edit"
                ? t("global.create")
                : t("global.edit")}
            </el-button>
            <el-button size="small" plain onClick={cancel}>
              {t("global.cancel")}
            </el-button>
          </el-form-item>
        </>
      );
    };

    return () => (
      <el-form
        label-position="top"
        status-icon
        label-width="120px"
        size="small"
        ref={memberFormRef}
        show-message={false}
        rules={rules}
        model={memberFormModel}
        hide-required-asterisk={formType.value === "detail"}
      >
        {formType.value === "detail" && renderDetailForm()}
        {["edit", "create"].includes(formType.value) && renderEditForm()}
      </el-form>
    );
  },
});
