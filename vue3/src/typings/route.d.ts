import { RouteRecordRaw } from "vue-router";

export type CustomRoute = RouteRecordRaw & {
  // 设置为true时路由将显示在sidebar中(默认false)
  hidden?: boolean;
};
