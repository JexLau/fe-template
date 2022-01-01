import { defineComponent, toRefs } from "vue";
import classes from "./index.module.less";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "ProTable",
  props: {
    columns: {
      type: Array,
    },
    tableData: {
      type: Array,
    },
    params: {
      type: Object,
      default: {
        keyword: ""
      }
    },
    total: {
      type: Number,
    },
    multipleSelection: {
      type: Array,
    },
    allowSelect: {
      type: Boolean,
      default: true,
    },
  },
  emits: [
    "pageChange",
    "keywordChange",
    "deleteValues",
    "create",
    "selectionChange",
    "search",
  ],
  setup(props, { emit }) {
    const { t } = useI18n();
    const {
      tableData,
      params,
      total,
      multipleSelection,
      columns,
      allowSelect,
    } = toRefs(props);

    /** 监听页数变化 */
    const pageChange = (pageIndex: number) => emit("pageChange", pageIndex);

    /** 监听搜索关键字变化 */
    const keywordChange = (value: string) => emit("keywordChange", value);

    /** 选中值变化 */
    const selectionChange = (values: any) => emit("selectionChange", values);

    /** 搜索 */
    const search = () => emit("search");

    /** 删除选中值 */
    const deleteValues = (multipleSelection: Array<any>) =>
      emit("deleteValues", multipleSelection);

    /** 新增 */
    const create = (pageIndex: number) => emit("create", pageIndex);

    return () => (
      <div>
        <div class="flx-col-center flx-row-btw" style="margin-bottom: 12px;">
          <div class="flx-col-center">
            <div
              class={classes["delete-icon"]}
              onClick={() => deleteValues(multipleSelection.value || [])}
            >
              <font-awesome-icon icon={["fas", "trash-alt"]} size="lg" />
            </div>
            <el-input
              v-model={params.value.keyword}
              placeholder="Search"
              style="width: 200px; margin-right: 10px;"
              size="small"
              onChange={keywordChange}
            ></el-input>
            <el-button size="small" plain onClick={() => search()}>
              {t("global.search")}
            </el-button>
          </div>
          <div>
            <el-button
              type="danger"
              size="small"
              class="flx-col-center"
              onClick={create}
            >
              <font-awesome-icon icon={["fas", "plus-circle"]} size="lg" />
              <span class={classes["btn-text"]}>{t("global.create")}</span>
            </el-button>
          </div>
        </div>
        <el-table
          data={tableData.value}
          size="small"
          border
          onSelectionChange={selectionChange}
        >
          {allowSelect && (
            <el-table-column type="selection" width="55"></el-table-column>
          )}
          {columns.value?.map((item: any) => {
            if (item.slot) {
              return (
                <el-table-column
                  property={item.prop}
                  label={item.label}
                  v-slots={{
                    default: (scope: any) => {
                      return item.slot(scope);
                    },
                  }}
                ></el-table-column>
              );
            } else {
              return <el-table-column {...item}></el-table-column>;
            }
          })}
        </el-table>
        <div class="flx-row-center mt-20">
          <el-pagination
            prev-text={t("global.prev")}
            next-text={t("global.next")}
            layout="prev, pager, next"
            total={total.value}
            onCurrentChange={pageChange}
          ></el-pagination>
        </div>
      </div>
    );
  },
});
