import { BaseResponse } from "@/typings/request";
import { MockMethod, Recordable } from "vite-plugin-mock";

export interface IUserInfoRequest {}

export interface IUserInfoResponse extends BaseResponse<IUserInfoData> {}

export interface Claim {
  type: string;
  value: string;
}

export interface IUserInfoData {
  /** 用户id */
  id: number;
  /** 用户账号 */
  account: string;
  /** 用户姓名 */
  userName?: string;
  /** 角色 */
  role: string;
  /** 权限 */
  claims: Claim[];
}

export default [
  {
    url: "/api/accounts/detail",
    method: "get",
    response: ({ query, body }: Recordable<IUserInfoRequest>) => {
      return {
        code: 200,
        message: "ok",
        success: true,
        data: {
          id: 17,
          account: "jexlau@qq.com",
          userName: "jexlau@qq.com",
          role: "admin",
          claims: [],
        },
      } as IUserInfoResponse;
    },
  },
] as MockMethod[];
