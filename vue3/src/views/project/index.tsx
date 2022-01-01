import HeaderTitle from "@/components/header-title";
import ProTable from "@/components/pro-table/index";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { IProjectListRequest, IProjectListVo } from "@/mock/project";
import { AGetList, ADeleteProject_Ids } from "@/api/project";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "Project",
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const store = useStore();

    const columns = [
      {
        prop: "name",
        label: t("project.name"),
        slot: (scope: { row: IProjectListVo }) => {
          return (
            <el-button
              type="text"
              size="small"
              onClick={() => linkProjectHome(scope.row.id)}
            >
              {scope.row.name}
            </el-button>
          );
        },
      },
    ];

    /** 列表数据 */
    let tableData = reactive<{ data: IProjectListVo[] }>({
      data: [],
    });

    /** 列表总数 */
    const total = ref<number>(0);

    /** 接口搜索的参数 */
    const params = reactive<IProjectListRequest>({
      page: 1,
      pageSize: 10,
      keyword: undefined,
    });

    /** 选中的值 */
    let multipleSelection = reactive<IProjectListVo[]>([]);

    const handleSelectionChange = (val: IProjectListVo[]) => {
      multipleSelection = val;
    };

    /** 获取项目列表数据 */
    const getProjectList = async () => {
      const res = await AGetList({ ...params });
      tableData.data = res?.data?.values || [];
      total.value = res?.data?.total || 0;
    };

    /** 翻页 */
    const pageChange = async (page: number) => {
      params.page = page;
      await getProjectList();
    };

    /** 关键字改变 */
    const keywordChange = (value: string) => {
      if (value) {
        params.keyword = value;
      } else {
        params.keyword = undefined;
      }
    };

    /** 搜索 */
    const search = async () => {
      await getProjectList();
    };

    /** 批量删除项目 */
    const deleteProjects = async () => {
      if (multipleSelection.length) {
        const ids = multipleSelection.map((item) => item.id).join(",");
        const res = await ADeleteProject_Ids({ ids });
        if (res?.success) {
          ElMessage.success("删除成功");
          await getProjectList();
        } else {
          ElMessage.error(res?.message || "删除失败");
        }
      }
    };

    /** 跳转到新增页面 */
    const createProject = () => {
      router.push("/project/create");
    };

    /** 跳转到与该项目对应的菜单详情 */
    const linkProjectHome = (id: number) => {
      store.commit("settings/setProjectId", id);
      router.push("/project-info");
    };

    onMounted(() => {
      getProjectList();
    });

    return () => (
      <div class="content">
        <HeaderTitle title={t("project.title")}></HeaderTitle>
        <ProTable
          tableData={tableData.data}
          params={params}
          total={total.value}
          multipleSelection={multipleSelection}
          onCreate={createProject}
          onDeleteValues={deleteProjects}
          onSelectionChange={handleSelectionChange}
          onKeywordChange={keywordChange}
          onPageChange={pageChange}
          onSearch={search}
          columns={columns}
        ></ProTable>
      </div>
    );
  },
});
