import { ElMessage } from "element-plus";
import { APostLogin, APostLogout } from "@/api/login";
import { LoginState } from "@/typings/store/login";
import { getToken, removeToken, setToken } from "@/utils/storage";
import { ILoginRequest } from "@/mock/login";

const state: LoginState = {
  token: getToken() || "",
  refreshToken: "",
};

const mutations = {
  setUserToken: (state: LoginState, token: string) => {
    state.token = token;
    if (token) {
      setToken(token);
    } else {
      removeToken();
    }
  },
  setRefreshToken: (state: LoginState, refreshToken: string) => {
    state.refreshToken = refreshToken;
  },
};

const actions = {
  // user login
  login({ commit }: any, userInfo: ILoginRequest) {
    return new Promise((resolve, reject) => {
      APostLogin(userInfo)
        .then((res) => {
          if (res?.success) {
            const { refreshToken, accessToken } = res.data || {};
            commit("setUserToken", accessToken?.token);
            commit("setRefreshToken", refreshToken);
            ElMessage({
              type: "success",
              message: res.message,
            });
          } else {
            ElMessage({
              type: "error",
              message: res?.message,
            });
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state, dispatch }: any) {
    return new Promise((resolve, reject) => {
      APostLogout()
        .then((res) => {
          commit("setUserToken", "");
          commit("setRefreshToken", "");
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
