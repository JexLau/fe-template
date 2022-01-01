import { ILoginRequest } from "@/mock/login";
import { ElFormCtx } from "@/typings/global";
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import classes from "./index.module.less";

export default defineComponent({
  name: "Login",
  props: {
    title: {
      type: String,
    },
  },
  setup() {
    const { t } = useI18n();
    /** 表单实例 */
    const loginFormRef = ref<ElFormCtx>();
    /** 表单数据 */
    const loginFormModel = reactive<ILoginRequest>({
      account: "123",
      password: "123451",
    });
    /** 表单校验规则 */
    const rules = {
      account: [
        {
          required: true,
          message: "Please Input Account",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "Please Input Password",
          trigger: "change",
        },
        {
          min: 6,
          max: 10,
          message: "Length should be 6 to 10",
          trigger: "blur",
        },
      ],
    };
    const store = useStore();
    const router = useRouter();

    /** 提交表单 */
    const submitForm = async () => {
      // 校验操作
      const isAllow = await loginFormRef?.value?.validate();
      if (isAllow) {
        // 登录成功
        const res = await store.dispatch("login/login", {
          account: loginFormModel.account,
          password: loginFormModel.password,
        });
        if (res.success) {
          router
            .push({
              path: "/",
            })
            .catch((err) => {
              console.warn(err);
            });
        }
      }
    };

    return () => (
      <>
        <div class={classes["login-wrap"]}>
          <div class={classes.logo}>C P S</div>
          <el-form
            label-position="top"
            status-icon
            label-width="120px"
            ref={loginFormRef}
            rules={rules}
            model={loginFormModel}
          >
            <el-form-item label={t("login.account")} prop="account">
              <el-input v-model={loginFormModel.account}></el-input>
            </el-form-item>
            <el-form-item label={t("login.password")} prop="password">
              <el-input
                v-model={loginFormModel.password}
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item class={classes["operation"]}>
              <el-button type="danger" onClick={submitForm}>
                {t("login.submit")}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </>
    );
  },
});
