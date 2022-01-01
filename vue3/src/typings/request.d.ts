export interface BaseResponse<IData = unknown> {
  data?: IData;
  success: boolean;
  code: number;
  message: string;
}

export interface RequestExtraOptions {
  /** 是否需要token */
  notAuth?: boolean;
}

export interface BaseListRequest {
  /** keyword */
  keyword?: string;
  /** 当前页 */
  page?: number;
  /** 一页多少数据 */
  pageSize?: number;
}
