<template>
  <a-table :columns="columns" rowKey="_id" :dataSource="data.data" :loading="tableLoading" :pagination="pagination" @change="pageChange">
    <template #action="{ record }">
      <a-space>
        <a-button :disabled="record.status == 3" shape="circle" type="danger" @click="openDeleteModal(record)">
          <template #icon>
            <DeleteOutlined />
          </template>
        </a-button>
        <a-button shape="circle" type="primary">
          <router-link :to="`/admin/question/${record._id}`"><EllipsisOutlined /></router-link>
        </a-button>
        <a-button v-if="record.status == 1" type="dashed" shape="circle" @click="publish(record, 2)">
          <template #icon>
            <BranchesOutlined style="color: #52c41a" />
          </template>
        </a-button>
        <a-button v-else :disabled="record.status == 3" type="dashed" shape="circle" @click="publish(record, 1)">
          <template #icon>
            <DisconnectOutlined />
          </template>
        </a-button>
      </a-space>
    </template>
  </a-table>
</template>
<script lang="ts">
import { EllipsisOutlined, DeleteOutlined, BranchesOutlined, DisconnectOutlined, ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { message, Modal } from "ant-design-vue";
import { defineComponent, reactive, toRefs, watch, ref, createVNode } from "vue";
import http from "../../../libs/http";
import { columns, IExam, getStatusTag, getTypeTag } from "./data";

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
    const tableLoading = ref(loading.value);
    watch(loading, () => (tableLoading.value = loading.value));
    const pagination = reactive({
      current: page || 1,
      pageSize: count || 10,
      total: total || 0,
      showTotal: (total: number) => {
        return `共 ${total} 题`;
      },
    });
    const pageChange = (pagination: any, filters: any, sorter: any, data: any) => {
      emit("pageChange", pagination);
    };
    const openDeleteModal = (reacrd: IExam) => {
      Modal.confirm({
        title: "确定要删除吗?",
        icon: createVNode(ExclamationCircleOutlined),
        content: "题目一经删除,无法恢复,请确认后删除!",
        okText: `删除`,
        okType: "danger",
        cancelText: "取消",
        onOk() {
          http.delete("/question", { id: reacrd._id }).then((res) => {
            message.success(String(res.message));
            emit("reacrdDelete");
          });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    };

    const publish = (reacrd: IExam, status: number) => {
      http.put("/question/publish", { id: reacrd._id, status: status }).then((res) => {
        message.success(`[${reacrd.title}] ${status == 2 ? "" : "取消"}发布成功!`);
        reacrd.status = status;
      });
    };
    return {
      data,
      tableLoading,
      pagination,
      getTypeTag,
      getStatusTag,
      columns,
      openDeleteModal,
      pageChange,
      publish,
    };
  },
  components: {
    EllipsisOutlined,
    DeleteOutlined,
    BranchesOutlined,
    DisconnectOutlined,
  },
});
</script>
