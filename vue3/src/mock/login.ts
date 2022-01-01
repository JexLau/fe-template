import { BaseResponse } from "@/typings/request";
import { MockMethod, Recordable } from "vite-plugin-mock";

export default [
  {
    url: "/api/accounts/login",
    method: "post",
    response: ({ query, body }: Recordable<ILoginRequest>) => {
      if (body.account === "123" && body.password === "123451") {
        return {
          code: 200,
          message: "登录成功",
          success: true,
          data: {
            accessToken: {
              expiresIn: 1814400,
              token: Math.random().toString(36).substr(2, 10),
            },
            refreshToken: Math.random().toString(36).substr(2, 10),
          },
        } as ILoginResponse;
      }
      return {
        code: 403,
        message: "账号或密码错误",
        success: false,
      } as ILoginResponse;
    },
  },
  {
    url: "/api/accounts/logout",
    method: "post",
    response: ({ query, body }: Recordable) => {
      return {
        code: 200,
        message: "ok",
        success: true,
      } as ILogoutResponse;
    },
  },
] as MockMethod[];

/** 登录接口 start */
export interface ILoginRequest {
  account: string;
  password: string;
}

export interface ILoginResponse extends BaseResponse<ILoginData> {}

export interface ILoginData {
  accessToken: IAccessToken;
  refreshToken: string;
}

interface IAccessToken {
  token: string;
  expiresIn: number;
}
/** 登录接口 end */

/** 退出登录接口 start */
export interface ILogoutResponse extends BaseResponse {}
/** 退出登录接口 end */
