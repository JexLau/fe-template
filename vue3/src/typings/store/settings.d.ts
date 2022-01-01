export interface Menu {
  /** 菜单名称 */
  title: string;
  /** 菜单权限 */
  claim: string;
  /** 菜单id */
  id: string;
  /** 跳转的路由 */
  link?: string;
  /** 二级菜单 */
  children?: Menu[];
}

export interface SettingsState {
  /** 是否展示左侧菜单 */
  isShowMenu: boolean;
  /** 菜单 */
  menu: Menu[];
  /** 项目id */
  projectId: number;
}
