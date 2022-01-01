import { RootState } from "@/store";
import { computed, defineComponent, ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import classes from "./index.module.less";

export default defineComponent({
  name: "app-sidebar",
  setup() {
    const store = useStore<RootState>();
    const menu = computed(() => {
      return store.state.settings.menu;
    });

    const route = useRoute();

    let active = ref<string>(route.path);

    /** 监听路由变化 */
    watch(route, (cur) => active.value = cur.path);

    return () => (
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-scrollbar>
          <el-menu router default-active={active.value}>
            {menu.value.map((item) => {
              return (
                <el-sub-menu
                  key={item.id}
                  index={item.id}
                  v-slots={{
                    title: () => {
                      return (
                        item.children?.length && (
                          <span class={classes["menu-title"]}>
                            {item.title}
                          </span>
                        )
                      );
                    },
                  }}
                >
                  {item.children?.map((child) => {
                    return (
                      <el-menu-item key={child.id} index={child.link}>
                        {child.title}
                      </el-menu-item>
                    );
                  })}
                </el-sub-menu>
              );
            })}
          </el-menu>
        </el-scrollbar>
      </el-aside>
    );
  },
});
