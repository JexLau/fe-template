import { ElMessage } from "element-plus";
import { UserState } from "@/typings/store/user.d";
import { AGetDetail } from "@/api/user";

const state: UserState = {
  id: 0,
  role: "",
  userName: "",
  account: "",
  claims: [],
};

const mutations = {
  SET_USERINFO: (state: UserState, user: UserState) => {
    state = { ...state, ...user };
  },
};

const actions = {
  // get user info
  getInfo({ commit, state }: any) {
    return new Promise((resolve, reject) => {
      AGetDetail()
        .then((res) => {
          if (res?.success) {
            commit("SET_USERINFO", res?.data);
            resolve(res);
          } else {
            ElMessage({
              type: "error",
              message: res?.message,
            });
          }
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
