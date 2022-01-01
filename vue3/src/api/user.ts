import { ContentType, Method } from "axios-mapper";
import https from "@/utils/https";
import { IUserInfoRequest, IUserInfoResponse } from "@/mock/user";

/**
 ** 接口名称: account
 ** 接口地址: /api/accounts/detail
 ** 请求方式: get
 ** 接口描述: 用户详情
 */
export const AGetDetail = (params?: IUserInfoRequest) => {
  return https().request<IUserInfoResponse>(
    "/api/accounts/detail",
    Method.GET,
    params,
    ContentType.json
  );
};
