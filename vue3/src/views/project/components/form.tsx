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
import { IProjectCreateRequest, IProjectListVo } from "@/mock/project";
import { AGetDetail, APostCreate } from "@/api/project";
import { ElFormCtx, FormType } from "@/typings/global.d";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "ProjectForm",
  props: {
    /** 控制表单渲染的类型 */
    formType: {
      type: String as PropType<FormType>,
      required: true,
    },
    /** 详情表单需要用到的id */
    id: {
      type: Number,
      default: 0,
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    /** 将props变成响应式的 */
    const { formType, id } = toRefs(props);
    /** 详情数据 */
    let detail = reactive({
      data: {} as IProjectListVo,
    });
    /** router */
    const router = useRouter();
    /** props */
    const onChange = (val: string) => emit("change", val);
    /** 表单实例 */
    const projectFormRef = ref<ElFormCtx>();
    /** 表单数据 */
    const projectFormModel = reactive<IProjectCreateRequest>({
      name: "",
      code: "",
    });
    /** 表单校验规则 */
    const rules = {
      name: [
        {
          required: true,
          trigger: "change",
        },
      ],
      code: [
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
          id: id.value,
        });
        if (res?.success && res.data) {
          detail.data = res.data;
          projectFormModel.name = detail.data.name;
          projectFormModel.code = detail.data.code;
          projectFormModel.remark = detail.data.remark;
          projectFormModel.id = detail.data.id;
        } else {
          ElMessage.error(res?.message || "项目不存在");
          router.push("/project");
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

    const linkBackProject = () => {
      router.push("/project");
    };

    /** 提交表单 */
    const submitForm = async () => {
      // 校验操作
      const isAllow = await projectFormRef?.value?.validate();
      if (isAllow) {
        const { name = "", code = "", remark, id } = projectFormModel || {};
        const res = await APostCreate({
          id,
          name,
          code,
          remark,
        });
        if (res?.success) {
          ElMessage.success(res?.message || "操作成功");
          if (formType.value === "create") {
            router.push({
              path: "/project",
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
        router.push("/project");
      } else if (formType.value === "edit") {
        onChange("detail");
      }
    };

    /** 渲染详情类型表单 */
    const renderDetailForm = () => {
      return (
        <>
          <el-form-item label={t("project.name")} prop="name">
            <div>{detail.data.name}</div>
          </el-form-item>
          <el-form-item label={t("project.unityName")} prop="code">
            <div>{detail.data.code}</div>
          </el-form-item>
          <el-form-item label={t("project.remark")} prop="remark">
            <div>{detail.data.remark}</div>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" size="small" onClick={editForm}>
              {t("global.edit")}
            </el-button>
            <el-button size="small" plain onClick={linkBackProject}>
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
          <el-form-item label={t("project.name")} prop="name">
            <el-input
              v-model={projectFormModel.name}
              onChange={(val: string) => (projectFormModel.name = val)}
            ></el-input>
            <div>{t("project.nameRequire")}</div>
          </el-form-item>
          <el-form-item label={t("project.unityName")} prop="code">
            <el-input
              v-model={projectFormModel.code}
              onChange={(val: string) => (projectFormModel.code = val)}
            ></el-input>
            <div>{t("project.unityRequire")}</div>
          </el-form-item>
          <el-form-item label={t("project.remark")} prop="remark">
            <el-input
              type="textarea"
              autosize={{ minRows: 3, maxRows: 5 }}
              v-model={projectFormModel.remark}
              onChange={(val: string) => (projectFormModel.remark = val)}
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
        ref={projectFormRef}
        show-message={false}
        rules={rules}
        model={projectFormModel}
        hide-required-asterisk={formType.value === "detail"}
      >
        {formType.value === "detail" && renderDetailForm()}
        {["edit", "create"].includes(formType.value) && renderEditForm()}
      </el-form>
    );
  },
});
