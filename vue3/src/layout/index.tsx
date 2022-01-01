import { defineComponent, computed } from "vue";
import AppHeader from "./app-header";
import AppSidebar from "./app-sidebar";
import AppMain from "./app-main";
import { useStore } from "vuex";
import classes from "./index.module.less";

export default defineComponent({
  name: "Layout",
  setup() {
    const store = useStore();
    /** 在项目一览页不显示菜单栏 */
    const isShowMenu = computed(() => {
      return store.state.settings.isShowMenu;
    });

    return () => (
      <el-container direction="vertical" class={classes["app-wrap"]}>
        <AppHeader />
        <el-container>
          {isShowMenu.value ? <AppSidebar /> : null}
          <AppMain />
        </el-container>
      </el-container>
    );
  },
});
