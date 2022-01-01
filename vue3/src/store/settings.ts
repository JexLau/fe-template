import i18n from "@/locale";
import { SettingsState } from "@/typings/store/settings.d";
import { getProjectId, setProjectId } from "@/utils/storage";

const state: SettingsState = {
  /** 是否显示菜单栏（在项目一览页不显示） */
  isShowMenu: true,
  // 初始化菜单数据，后期改成接口获取
  menu: [
    {
      id: "base",
      title: i18n.global.t("global.menu.base"),
      claim: "",
      children: [
        {
          id: "project",
          title: i18n.global.t("global.menu.project"),
          claim: "",
          link: "/project-info",
        },
        {
          id: "member",
          title: i18n.global.t("global.menu.member"),
          claim: "",
          link: "/member",
        },
      ],
    },
    {
      id: "engineer",
      title: i18n.global.t("global.menu.engineer"),
      claim: "",
      children: [
        {
          id: "engineerinfo",
          title: i18n.global.t("global.menu.engineerinfo"),
          claim: "",
          link: "/scenario",
        },
        {
          id: "wbs",
          title: i18n.global.t("global.menu.wbs"),
          claim: "",
          link: "/wbs",
        },
      ],
    },
    {
      id: "environment",
      title: i18n.global.t("global.menu.environment"),
      claim: "",
      children: [
        {
          id: "pointgroup",
          title: i18n.global.t("global.menu.pointgroup"),
          claim: "",
          link: "/point-group",
        },
      ],
    },
    {
      id: "heavydevice",
      title: i18n.global.t("global.menu.heavydevice"),
      claim: "",
      children: [
        {
          id: "device",
          title: i18n.global.t("global.menu.device"),
          claim: "",
          link: "/device",
        },
      ],
    },
    {
      id: "operator",
      title: i18n.global.t("global.menu.operator"),
      claim: "",
      children: [
        {
          id: "operator",
          title: i18n.global.t("global.menu.operator"),
          claim: "",
          link: "/operator",
        },
      ],
    },
  ],
  projectId: Number(getProjectId()),
};

const mutations = {
  setIsShowMenu: (state: SettingsState, isShowMenu: boolean) => {
    state.isShowMenu = isShowMenu;
  },
  setProjectId: (state: SettingsState, projectId: number) => {
    setProjectId(projectId.toString());
    state.projectId = projectId;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
