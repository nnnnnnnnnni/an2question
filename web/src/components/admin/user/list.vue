<template>
  <a-table :columns="columns" rowKey="_id" :dataSource="data.data" :loading="tableLoading" :pagination="pagination" @change="pageChange">
    <template #info="{ record }">
      <div class="name-td">
        <a-avatar :src="record.avator"></a-avatar>
        <div class="name">
          {{ record.name }}
        </div>
      </div>
    </template>
    <template #phone="{ record }">
      <span v-if="record.phone">
        {{ record.phone }}
      </span>
      <span v-else style="color: #f5222d">暂未设置</span>
    </template>
    <template #createAt="{ record }">
      {{ moment(record.createAt).format("YYYY-MM-DD") }}
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
import { ApiOutlined, ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, toRefs, watch, ref, createVNode } from "vue";
import { columns } from "./data";
import moment from "moment";
import { message, Modal } from "ant-design-vue";
import http from "../../../libs/http";

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
      showTotal: (total: number) => {
        return `共 ${total} 人`;
      },
    });

    const tableLoading = ref(loading.value);
    watch(loading, () => (tableLoading.value = loading.value));

    const pageChange = (pagination: any, filters: any, sorter: any, data: any) => {
      emit("pageChange", pagination);
    };

    const openDeleteModal = (e) => {
      Modal.confirm({
        title: "确定要解绑吗?",
        icon: createVNode(ExclamationCircleOutlined),
        content: "题目一经解绑,无法恢复,请确认后解绑!",
        okText: "解绑",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          http.delete("/manager/unlink", { id: e._id }).then((res) => {
            message.success(String(res.message));
            emit("reacrdDelete");
          });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    };
    return {
      columns,
      list,
      tableLoading,
      data,
      openDeleteModal,
      pagination,
      pageChange,
      moment,
    };
  },
  components: {
    ApiOutlined,
  },
});
</script>

<style scoped>
.name {
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
