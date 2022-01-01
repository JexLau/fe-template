import { BaseResponse, BaseListRequest } from "@/typings/request";
import { MockMethod, Recordable } from "vite-plugin-mock";

/** 搜索接口 start */
export interface IMemberListRequest extends BaseListRequest {}
export interface IMemberListResponse extends BaseResponse<IMemberListData> {}

/** 列表数据 */
export interface IMemberListData {
  values: IMemberListVo[];
  total: number;
}
/** 列表项 */
export interface IMemberListVo {
  /** id */
  id: number;
  /** 成员名称 */
  memberName: string;
  /** 职位 */
  position: string;
  /** 所属 */
  belongs: string;
}
/** 搜索接口end */

/** 删除接口 */
export interface IMemberDeleteIdsRequest {
  ids: string;
}
export interface IMemberDeleteIdsResponse extends BaseResponse {}
/** 删除接口 end */

/** 新增和编辑接口 */
export interface IMemberCreateRequest {
  id?: number;
  /** 成员名称 */
  memberName: string;
  /** 职位 */
  position: string;
  /** 所属 */
  belongs: string;
}
export interface IMemberCreateResponse extends BaseResponse {}
/** 新增和编辑接口 end */

/** 详情接口 */
export interface IMemberDetailRequest {
  /** id */
  id: number;
}
export interface IMemberDetailResponse extends BaseResponse<IMemberListVo> {}
/** 详情接口end */

/** 数据 */
const position = ["普通员工", "组长", "社长"];
const belongs = ["公司1", "公司2", "公司3"];
const members: IMemberListVo[] = [...new Array(100)].map((a, i) => {
  return {
    id: i + 1,
    position: position[i % 3],
    memberName: `成员${i + 1}`,
    belongs: belongs[i % 3],
  };
});

export default [
  {
    url: "/api/member/list",
    method: "get",
    response: ({ query }: Recordable<IMemberListRequest>) => {
      const { page = 1, pageSize = 10, keyword = "" } = query;
      let shouldData: IMemberListVo[] = [];
      let shouldTotal = 0;
      if (keyword) {
        const keywordData = members.filter((p) => p.memberName.match(keyword));
        shouldTotal = keywordData.length;
        shouldData = keywordData.slice((page - 1) * pageSize, page * pageSize);
      } else {
        shouldData = members.slice((page - 1) * pageSize, page * pageSize);
        shouldTotal = members.length;
      }
      return {
        code: 200,
        message: "ok",
        success: true,
        data: {
          values: shouldData,
          total: shouldTotal,
        },
      } as IMemberListResponse;
    },
  },
  {
    url: `/api/member/delete`,
    method: "delete",
    response: ({ query, body }: Recordable<IMemberDeleteIdsRequest>) => {
      const { ids } = body;
      const aId = ids.split(",");
      const reseData = [...members];
      reseData.forEach((rest) => {
        if (aId.includes(rest.id.toString())) {
          const index = members.findIndex((p) => p.id === rest.id);
          members.splice(index, 1);
        }
      });

      return {
        code: 200,
        message: "ok",
        success: true,
      } as IMemberDeleteIdsResponse;
    },
  },
  {
    url: "/api/member/create",
    method: "post",
    response: ({ body }: Recordable<IMemberCreateRequest>) => {
      // 带有id的为编辑
      if (typeof body.id !== "undefined") {
        let targetIndex = -1;
        const target = members.find((item, index) => {
          if (item.id === Number(body.id)) {
            targetIndex = index;
            return item;
          }
        });
        if (target) {
          members.splice(targetIndex, 1, { id: target.id, ...body });
          return {
            code: 200,
            message: "编辑成功",
            success: true,
          } as IMemberCreateResponse;
        } else {
          return {
            code: 404,
            message: "该数据不存在",
            success: false,
          } as IMemberCreateResponse;
        }
      } else {
        const memberItem = {
          id: new Date().getTime(),
          memberName: body.memberName,
          belongs: body.belongs,
          position: body.position,
        };
        members.unshift(memberItem);
        return {
          code: 200,
          message: "新增成功",
          success: true,
        } as IMemberCreateResponse;
      }
    },
  },
  {
    url: "/api/member/detail",
    method: "get",
    response: ({ query }: Recordable<IMemberDetailRequest>) => {
      const { id } = query;
      const target = members.find((item) => item.id === Number(id));
      if (target) {
        return {
          code: 200,
          message: "ok",
          success: true,
          data: target,
        } as IMemberDetailResponse;
      } else {
        return {
          code: 404,
          message: "该不存在，请重新选择",
          success: false,
        } as IMemberDetailResponse;
      }
    },
  },
] as MockMethod[];
