import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout";
import { CustomRoute } from "@/typings/route";
import store from "../store";

export const routes: Array<CustomRoute> = [
  {
    path: "/",
    component: Layout,
    redirect: "/project",
    children: [
      // 项目一览
      {
        name: "Project",
        path: "/project",
        component: () => import("@/views/project"),
      },
      {
        name: "ProjectCreate",
        path: "/project/create",
        component: () => import("@/views/project/create"),
      },
      // 基本情报-项目信息
      {
        name: "ProjectInfo",
        path: "/project-info",
        component: () => import("@/views/project/detail"),
      },
      // 基本情报-人员信息
      {
        name: "Member",
        path: "/member",
        component: () => import("@/views/member"),
      },
      {
        name: "MemberCreate",
        path: "/member/create",
        component: () => import("@/views/member/create"),
      },
      {
        name: "MemberInfo",
        path: "/member-info/:id",
        component: () => import("@/views/member/detail"),
      },
      // 工程信息-工程信息
      {
        name: "Scenario",
        path: "/scenario",
        component: () => import("@/views/scenario"),
      },
      // 工程信息-wbs
      {
        name: "Wbs",
        path: "/wbs",
        component: () => import("@/views/wbs"),
      },
      // 重型设备-设备
      {
        name: "Device",
        path: "/device",
        component: () => import("@/views/device"),
      },
      // 环境情报-点群
      {
        name: "PointGroup",
        path: "/point-group",
        component: () => import("@/views/point-group"),
      },
      // 作业员-作业员
      {
        name: "Operator",
        path: "/operator",
        component: () => import("@/views/operator"),
      },
    ],
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("@/views/login"),
  },
];

const router = createRouter({
  // history, 指定路由的模式
  history: createWebHashHistory(),
  // 路由列表
  routes,
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 决定在这个路由是否显示菜单
  if (typeof to.name === "string") {
    if (["Project", "ProjectCreate"].includes(to.name)) {
      store.commit("settings/setIsShowMenu", false);
    } else {
      store.commit("settings/setIsShowMenu", true);
    }
  }

  // 鉴权，重定向跳转
  if (to.name !== "Login" && !store.state.login.token) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
