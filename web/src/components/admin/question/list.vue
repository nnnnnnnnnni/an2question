<template>
  <a-table :columns="columns" rowKey="_id" :dataSource="data.data" :loading="data.loading" :pagination="pagination" @change="pageChange">
    <template #type="{ text }">
      <span>
        <a-tag :color="getTypeTag(text).color">{{ getTypeTag(text).label }}</a-tag>
      </span>
    </template>
    <template #level="{ text }">
      <span>
        <a-tag :color="getLevelTag(text).color">{{ getLevelTag(text).label }}</a-tag>
      </span>
    </template>
    <template #status="{ text }">
      <span>
        <a-tag :color="getStatusTag(text).color">{{ getStatusTag(text).label }}</a-tag>
      </span>
    </template>
    <template #action="{ record }">
      <span>
        <a-button shape="circle" type="primary" @click="goDetail(record)">
          <template #icon>
            <EllipsisOutlined />
          </template>
        </a-button>
        <a-divider type="vertical" />
        <a-button shape="circle" type="danger" @click="del(record)">
          <template #icon>
            <DeleteOutlined />
          </template>
        </a-button>
      </span>
    </template>
  </a-table>
</template>
<script lang="ts">
import { EllipsisOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, toRefs } from "vue";
import router from "../../../router";
import { columns, IQuestion, getLevelTag, getStatusTag, getTypeTag } from "./data";

export default defineComponent({
  props: ["list", "page", "count", "total", "loading"],
  setup(props, {emit}) {
    const { list, page, count, total, loading } = toRefs(props);
    const data = reactive({
      data: list || [],
      page: page.value || 1,
      count: count.value || 10,
      total: total.value || 0,
      loading: loading.value || false,
    });
    const pagination = reactive({
      current: page || 1,
      pageSize: count || 10,
      total: total || 0,
    });
    const goDetail = (reacrd: IQuestion) => {
      router.push(`/admin/question/${reacrd._id}`);
    };
    const pageChange = (pagination: any, filters: any, sorter: any, data: any) => {
      emit('pageChange', pagination)
    };
    const del = (reacrd: IQuestion) => {};
    return {
      data,
      pagination,
      getLevelTag,
      getTypeTag,
      getStatusTag,
      columns,
      goDetail,
      del,
      pageChange,
    };
  },
  components: {
    EllipsisOutlined,
    DeleteOutlined,
  },
});
</script>
