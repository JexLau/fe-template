import { ContentType, Method } from "axios-mapper";
import https from "@/utils/https";
import {
  IProjectCreateRequest,
  IProjectCreateResponse,
  IProjectDeleteIdsRequest,
  IProjectDeleteIdsResponse,
  IProjectDetailRequest,
  IProjectDetailResponse,
  IProjectListRequest,
  IProjectListResponse,
} from "@/mock/project";

/**
 ** 接口名称: project
 ** 接口地址: /api/project/list
 ** 请求方式: get
 ** 接口描述: 项目列表
 */
export const AGetList = (params?: IProjectListRequest) => {
  return https().request<IProjectListResponse>(
    "/api/project/list",
    Method.GET,
    params,
    ContentType.json
  );
};

/**
 ** 接口名称: project
 ** 接口地址: /api/project/delete
 ** 请求方式: DELETE
 ** 接口描述: 项目删除/批量删除
 */
export function ADeleteProject_Ids(params: IProjectDeleteIdsRequest) {
  return https().request<IProjectDeleteIdsResponse>(
    `/api/project/delete`,
    Method.DELETE,
    params,
    ContentType.json
  );
}

/**
 ** 接口名称: project
 ** 接口地址: /api/project/create
 ** 请求方式: post
 ** 接口描述: 新增项目
 */
export const APostCreate = (params: IProjectCreateRequest) => {
  return https().request<IProjectCreateResponse>(
    "/api/project/create",
    Method.POST,
    params,
    ContentType.json
  );
};

/**
 ** 接口名称: project
 ** 接口地址: /api/project/detail
 ** 请求方式: get
 ** 接口描述: 项目详情
 */
 export const AGetDetail = (params: IProjectDetailRequest) => {
  return https().request<IProjectDetailResponse>(
    "/api/project/detail",
    Method.GET,
    params,
    ContentType.json
  );
};
