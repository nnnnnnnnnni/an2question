<template>
  <div class="question_list">
    <div class="form">
      <SearchForm @search="search" />
    </div>
    <div class="table">
      <List @pageChange="pageChange" @reacrdDelete="reacrdDelete" :list="pageData.data" :page="pageData.page" :count="pageData.count" :total="pageData.total" :loading="pageData.loading" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRaw, UnwrapRef } from "vue";
import SearchForm from "@/components/admin/question/search_form.vue";
import {IOptions} from '../../../components/admin/question/data';
import List from "@/components/admin/question/list.vue";
import http from "../../../libs/http";
import { clearObj } from "../../../libs/utils";

export default defineComponent({
  setup() {
    const pageData = reactive({
      data: [],
      page: 1,
      count: 10,
      total: 0,
      loading: false,
    });
    const searchData: UnwrapRef<IOptions> = reactive({});
    const getList = (page: number, count: number, conds?: IOptions) => {
      pageData.loading = true;
      http
        .get("/question", {
          page: page,
          count: count,
          options: conds,
        })
        .then((res) => {
          if(res.data.total != 0 && res.data.questions.length == 0) {
            getList(pageData.page -1, pageData.count, clearObj(toRaw(searchData), true))
          } else {
            pageData.data = res.data.questions;
            pageData.total = res.data.total;
            pageData.loading = false;
          }
        });
    };
    const search = (data: IOptions) => {
      searchData.title = data.title;
      searchData.level = data.level;
      searchData.type = data.type;
      searchData.status = data.status;
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
    }
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
