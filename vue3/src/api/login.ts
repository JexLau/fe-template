import { ContentType, Method } from "axios-mapper";
import { ILoginRequest, ILoginResponse, ILogoutResponse } from "@/mock/login";
import https from "@/utils/https";

/**
 ** 接口名称: account
 ** 接口地址: /api/accounts/login
 ** 请求方式: post
 ** 接口描述: 登录接口
 */
export const APostLogin = (params: ILoginRequest) => {
  return https({ notAuth: true }).request<ILoginResponse>(
    "/api/accounts/login",
    Method.POST,
    params,
    ContentType.json
  );
};

/**
 ** 接口名称: account
 ** 接口地址: /api/accounts/logout
 ** 请求方式: post
 ** 接口描述: 登出接口
 */
export const APostLogout = () => {
  return https().request<ILogoutResponse>(
    "/api/accounts/logout",
    Method.POST,
    undefined,
    ContentType.json
  );
};