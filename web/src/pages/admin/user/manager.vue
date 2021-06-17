<template>
  <div class="manager">
    <div class="form">
      <SearchForm @search="search" />
    </div>
    <div class="list">
      <List @pageChange="pageChange" @reacrdDelete="reacrdDelete" :list="pageData.data" :page="pageData.page" :count="pageData.count" :total="pageData.total" :loading="pageData.loading" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw, UnwrapRef, onMounted } from "vue";
import SearchForm from "@/components/admin/user/search_form.vue";
import List from "@/components/admin/user/list.vue";
import http, { isDev } from "../../../libs/http";
import { clearObj } from "../../../libs/utils";
interface IOptions {
  key?: string;
}
export default defineComponent({
  setup() {
    const pageData = reactive({
      data: [],
      page: 1,
      count: 10,
      total: 0,
      loading: false,
    });
    const searchData: UnwrapRef<IOptions> = reactive({
      key: undefined
    });
    const getList = (page: number, count: number, conds?: IOptions) => {
      pageData.loading = true;
      http
        .get("/manager/list", {
          page: page,
          count: count,
          key: searchData.key
        })
        .then((res) => {
          if (res.data.total != 0 && res.data.binds.length == 0) {
            getList(pageData.page - 1, pageData.count, clearObj(toRaw(searchData), true));
          } else {
            if (isDev) {
              pageData.data = res.data.binds.map((bind: any) => {
                bind.avator = `/api${bind.avator}`;
                return bind;
              });
            } else {
              pageData.data = res.data.binds;
            }
            pageData.total = res.data.total;
            pageData.loading = false;
          }
        });
    };
    const search = (data: IOptions) => {
      searchData.key = data.key;
      pageData.count = 10;
      pageData.page = 1;
      getList(pageData.page, pageData.count, clearObj(toRaw(data), true));
    };
    const pageChange = (_data: { current: number; pageSize: number }) => {
      pageData.page = _data.current;
      pageData.count = _data.pageSize;
      getList(_data.current, _data.pageSize, clearObj(toRaw(searchData), true));
    };
    const reacrdDelete = () => {
      getList(pageData.page, pageData.count, clearObj(toRaw(searchData), true));
    };
    onMounted(() => {
      getList(pageData.page, pageData.count);
    });

    return {
      search,
      pageData,
      pageChange,
      reacrdDelete,
    };
  },
  components: {
    SearchForm,
    List,
  },
});
</script>

<style scoped>
.form {
  margin-bottom: 20px;
}
</style>
