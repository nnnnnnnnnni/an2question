<template>
  <a-table :columns="columns" rowKey="_id" :dataSource="data.data" :loading="tableLoading" :pagination="pagination" @change="pageChange">
    <template #info="{ record }">
      <div class="name-td">
        <a-avatar :src="record.avator"></a-avatar>
        <span class="name">
          {{ record.name }}
        </span>
      </div>
    </template>
    <template #phone="{ record }">
      <span v-if="record.phone">
        {{ record.phone }}
      </span>
      <span v-else style="color: #f5222d">暂未设置</span>
    </template>
    <template #action="{ record }">
      <a-button shape="circle" type="danger" @click="openDeleteModal(record)">
        <template #icon>
          <ApiOutlined />
        </template>
      </a-button>
    </template>
  </a-table>
</template>
<script lang="ts">
import { ApiOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, toRefs, watch, ref } from "vue";
import { columns } from "./data";

export default defineComponent({
  props: ["list", "page", "count", "total", "loading"],
  emits: ["pageChange", "reacrdDelete"],
  setup(props, { emit }) {
    const { list, page, count, total, loading } = toRefs(props);
    const data = reactive({
      data: list || [],
      page: page.value || 1,
      count: count.value || 10,
      total: total.value || 0,
    });
    const pagination = reactive({
      current: page || 1,
      pageSize: count || 10,
      total: total || 0,
    });

    const tableLoading = ref(loading.value);
    watch(loading, () => (tableLoading.value = loading.value));

    const pageChange = (pagination: any, filters: any, sorter: any, data: any) => {
      emit("pageChange", pagination);
    };

    const openDeleteModal = () => {};
    return {
      columns,
      list,
      tableLoading,
      data,
      openDeleteModal,
      pagination,
      pageChange,
    };
  },
  components: { 
    ApiOutlined,
  },
});
</script>

<style scoped>
.name {
  display: inline-block;
  margin-left: 20px;
  width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.name-td {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
