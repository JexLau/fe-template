import { defineComponent } from "vue";
import classes from "./index.module.less";

export default defineComponent({
  name: "HeaderTitle",
  props: {
    title: {
      type: String,
    },
  },
  setup(props) {
    return () => <h1 class={classes["header-title"]}>{props.title}</h1>;
  },
});
