import HeaderTitle from "@/components/header-title";
import ProTable from "@/components/pro-table/index";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { IMemberListRequest, IMemberListVo } from "@/mock/member";
import { AGetList, ADeleteMember_Ids } from "@/api/member";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "Member",
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const store = useStore();

    const columns = [
      {
        prop: "name",
        label: t("member.memberName"),
        slot: (scope: { row: IMemberListVo }) => {
          return (
            <el-button
              type="text"
              size="small"
              onClick={() => linkMemberHome(scope.row.id)}
            >
              {scope.row.memberName}
            </el-button>
          );
        },
      },
      {
        prop: "belongs",
        label: t("member.belongs"),
      },
      {
        prop: "position",
        label: t("member.position"),
      },
    ];

    /** 列表数据 */
    let tableData = reactive<{ data: IMemberListVo[] }>({
      data: [],
    });

    /** 列表总数 */
    const total = ref<number>(0);

    /** 接口搜索的参数 */
    const params = reactive<IMemberListRequest>({
      page: 1,
      pageSize: 10,
      keyword: undefined,
    });

    /** 选中的值 */
    let multipleSelection = reactive<IMemberListVo[]>([]);

    const handleSelectionChange = (val: IMemberListVo[]) => {
      multipleSelection = val;
    };

    /** 获取成员列表数据 */
    const getMemberList = async () => {
      const res = await AGetList({ ...params });
      tableData.data = res?.data?.values || [];
      total.value = res?.data?.total || 0;
    };

    /** 翻页 */
    const pageChange = async (page: number) => {
      params.page = page;
      await getMemberList();
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
      await getMemberList();
    };

    /** 批量删除成员 */
    const deleteMembers = async () => {
      if (multipleSelection.length) {
        const ids = multipleSelection.map((item) => item.id).join(",");
        const res = await ADeleteMember_Ids({ ids });
        if (res?.success) {
          ElMessage.success("删除成功");
          await getMemberList();
        } else {
          ElMessage.error(res?.message || "删除失败");
        }
      }
    };

    /** 跳转到新增页面 */
    const createMember = () => {
      router.push("/member/create");
    };

    /** 跳转到与该成员对应的详情 */
    const linkMemberHome = (id: number) => {
      router.push(`/member-info/${id}`);
    };

    onMounted(() => {
      getMemberList();
    });

    return () => (
      <div class="content">
        <HeaderTitle title={t("member.title")}></HeaderTitle>
        <ProTable
          tableData={tableData.data}
          params={params}
          total={total.value}
          multipleSelection={multipleSelection}
          onCreate={createMember}
          onDeleteValues={deleteMembers}
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
