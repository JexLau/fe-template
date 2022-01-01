import { ContentType, Method } from "axios-mapper";
import https from "@/utils/https";
import {
  IMemberCreateRequest,
  IMemberCreateResponse,
  IMemberDeleteIdsRequest,
  IMemberDeleteIdsResponse,
  IMemberDetailRequest,
  IMemberDetailResponse,
  IMemberListRequest,
  IMemberListResponse,
} from "@/mock/member";

/**
 ** 接口名称: member
 ** 接口地址: /api/member/list
 ** 请求方式: get
 ** 接口描述: 成员列表
 */
export const AGetList = (params?: IMemberListRequest) => {
  return https().request<IMemberListResponse>(
    "/api/member/list",
    Method.GET,
    params,
    ContentType.json
  );
};

/**
 ** 接口名称: member
 ** 接口地址: /api/member/delete
 ** 请求方式: DELETE
 ** 接口描述: 成员删除/批量删除
 */
export function ADeleteMember_Ids(params: IMemberDeleteIdsRequest) {
  return https().request<IMemberDeleteIdsResponse>(
    `/api/member/delete`,
    Method.DELETE,
    params,
    ContentType.json
  );
}

/**
 ** 接口名称: member
 ** 接口地址: /api/member/create
 ** 请求方式: post
 ** 接口描述: 新增成员
 */
export const APostCreate = (params: IMemberCreateRequest) => {
  return https().request<IMemberCreateResponse>(
    "/api/member/create",
    Method.POST,
    params,
    ContentType.json
  );
};

/**
 ** 接口名称: member
 ** 接口地址: /api/member/detail
 ** 请求方式: get
 ** 接口描述: 成员详情
 */
 export const AGetDetail = (params: IMemberDetailRequest) => {
  return https().request<IMemberDetailResponse>(
    "/api/member/detail",
    Method.GET,
    params,
    ContentType.json
  );
};
