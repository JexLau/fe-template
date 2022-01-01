import { ElForm } from "element-plus";

export type ElFormCtx = InstanceType<typeof ElForm>;

/** Project表单类型枚举 */
export type FormType = "edit" | "create" | "detail"