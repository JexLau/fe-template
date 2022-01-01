import { BaseListRequest, BaseResponse } from "@/typings/request";
import { MockMethod, Recordable } from "vite-plugin-mock";

/** 搜索接口 start */
export interface IProjectListRequest  extends BaseListRequest {}
export interface IProjectListResponse extends BaseResponse<IProjectListData> {}
/** 列表数据 */
export interface IProjectListData {
  values: IProjectListVo[];
  total: number;
}
/** 列表项 */
export interface IProjectListVo {
  /** 项目id */
  id: number;
  /** 项目code */
  code: string;
  /** 项目名称 */
  name: string;
  /** 说明 */
  remark?: string;
}
/** 搜索接口end */

/** 删除接口 */
export interface IProjectDeleteIdsRequest {
  ids: string;
}
export interface IProjectDeleteIdsResponse extends BaseResponse {}
/** 删除接口 end */

/** 新增和编辑接口 */
export interface IProjectCreateRequest {
  id?: number;
  /** 项目名称 */
  name: string;
  /** unityName */
  code: string;
  /** 备注 */
  remark?: string;
}
export interface IProjectCreateResponse extends BaseResponse {}
/** 新增和编辑接口 end */

/** 详情接口 */
export interface IProjectDetailRequest {
  /** 项目id */
  id: number;
}
export interface IProjectDetailResponse extends BaseResponse<IProjectListVo> {}
/** 详情接口end */

/** 项目数据 */
const projects: IProjectListVo[] = [...new Array(100)].map((a, i) => {
  return {
    id: i + 1,
    code: (i + 1).toString(),
    name: `项目${i + 1}`,
  };
});

export default [
  {
    url: "/api/project/list",
    method: "get",
    response: ({ query }: Recordable<IProjectListRequest>) => {
      const { page = 1, pageSize = 10, keyword = "" } = query;
      let shouldData: IProjectListVo[] = [];
      let shouldTotal = 0;
      if (keyword) {
        const keywordData = projects.filter((p) => p.name.match(keyword));
        shouldTotal = keywordData.length;
        shouldData = keywordData.slice((page - 1) * pageSize, page * pageSize);
      } else {
        shouldData = projects.slice((page - 1) * pageSize, page * pageSize);
        shouldTotal = projects.length;
      }
      return {
        code: 200,
        message: "ok",
        success: true,
        data: {
          values: shouldData,
          total: shouldTotal,
        },
      } as IProjectListResponse;
    },
  },
  {
    url: `/api/project/delete`,
    method: "delete",
    response: ({ query, body }: Recordable<IProjectDeleteIdsRequest>) => {
      const { ids } = body;
      const aId = ids.split(",");
      const reseData = [...projects];
      reseData.forEach((rest) => {
        if (aId.includes(rest.id.toString())) {
          const index = projects.findIndex((p) => p.id === rest.id);
          projects.splice(index, 1);
        }
      });

      return {
        code: 200,
        message: "ok",
        success: true,
      } as IProjectDeleteIdsResponse;
    },
  },
  {
    url: "/api/project/create",
    method: "post",
    response: ({ body }: Recordable<IProjectCreateRequest>) => {
      // 带有id的为编辑
      if (typeof body.id !== "undefined") {
        let targetIndex = -1;
        const target = projects.find((item, index) => {
          if (item.id === Number(body.id)) {
            targetIndex = index;
            return item;
          }
        });
        if (target) {
          projects.splice(targetIndex, 1, { id: target.id, ...body });
          return {
            code: 200,
            message: "编辑成功",
            success: true,
          } as IProjectCreateResponse;
        } else {
          return {
            code: 404,
            message: "该数据不存在",
            success: false,
          } as IProjectCreateResponse;
        }
      } else {
        const projectItem = {
          id: new Date().getTime(),
          code: body.code,
          name: body.name,
          remark: body.remark,
        };
        projects.unshift(projectItem);
        return {
          code: 200,
          message: "新增成功",
          success: true,
        } as IProjectCreateResponse;
      }
    },
  },
  {
    url: "/api/project/detail",
    method: "get",
    response: ({ query }: Recordable<IProjectDetailRequest>) => {
      const { id } = query;
      const target = projects.find((item) => item.id === Number(id));
      if (target) {
        return {
          code: 200,
          message: "ok",
          success: true,
          data: target,
        } as IProjectDetailResponse;
      } else {
        return {
          code: 404,
          message: "该项目不存在，请重新选择项目",
          success: false,
        } as IProjectDetailResponse;
      }
    },
  },
] as MockMethod[];
