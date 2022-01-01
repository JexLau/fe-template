/** 校验是否外部链接 */
export const isExternalLink = (path: string) => {
  return /^(https?:|mailto:|tel:)/.test(path);
}