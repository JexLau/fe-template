import { LoginState } from "@/typings/store/login";
import { UserState } from "@/typings/store/user";
import { createStore } from "vuex";
import settings from "./settings";
import login from "./login";
import user from "./user";
import { SettingsState } from "@/typings/store/settings";

// export type IStore = HomeStore<Pick<RootState, "login" | "user">>;

export interface RootState {
  login: LoginState;
  user: UserState;
  settings: SettingsState;
}

export const store = createStore<RootState>({
  modules: {
    login,
    user,
    settings
  },
});

export default store;
