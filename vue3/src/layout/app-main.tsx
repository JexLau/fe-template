import { defineComponent } from "vue";
export default defineComponent({
  name: "AppMain",
  setup() {
    return () => (
      <el-main>
        <router-view />
      </el-main>
    );
  },
});
