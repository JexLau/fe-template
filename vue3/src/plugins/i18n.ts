import i18n from "@/locale";
import { createApp } from "vue";

export default function loadComponent(app: ReturnType<typeof createApp>) {
  app.use(i18n);
}
