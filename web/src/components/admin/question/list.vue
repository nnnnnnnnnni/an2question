<template>
  <a-table :columns="columns" rowKey="_id" :dataSource="data.data" :loading="tableLoading" :pagination="pagination" @change="pageChange">
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
    <template #actionTitle>
      操作(
      <a-space>
        <a-tooltip>
          <template #title>删除</template>
          <span class="circle"> <DeleteOutlined style="color: #ff7875" /> </span>
        </a-tooltip>
        <a-tooltip>
          <template #title>跳转详情页</template>
          <span class="circle"> <EllipsisOutlined style="color: #1890ff" /> </span>
        </a-tooltip>
        <a-tooltip>
          <template #title>发布</template>
          <span class="circle"> <BranchesOutlined style="color: #52c41a" /> </span>
        </a-tooltip>
        <a-tooltip>
          <template #title>取消发布</template>
          <span class="circle"> <DisconnectOutlined style="color: #f5222d" /> </span> </a-tooltip
        >)
      </a-space>
    </template>
    <template #action="{ record }">
      <a-space>
        <a-button shape="circle" type="danger" @click="del(record)">
          <template #icon>
            <DeleteOutlined />
          </template>
        </a-button>
        <a-button shape="circle" type="primary" @click="goDetail(record)">
          <template #icon>
            <EllipsisOutlined />
          </template>
        </a-button>
        <a-button v-if="record.status == 1" type="dashed" shape="circle" @click="publish(record, 2)">
          <template #icon>
            <BranchesOutlined style="color: #52c41a" />
          </template>
        </a-button>
        <a-button v-if="record.status == 2" type="dashed" shape="circle" @click="publish(record, 1)">
          <template #icon>
            <DisconnectOutlined style="color: #f5222d" />
          </template>
        </a-button>
      </a-space>
    </template>
  </a-table>
</template>
<script lang="ts">
import { EllipsisOutlined, DeleteOutlined, BranchesOutlined, DisconnectOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { defineComponent, reactive, toRefs, watch, ref } from "vue";
import http from "../../../libs/http";
import router from "../../../router";
import { columns, IQuestion, getLevelTag, getStatusTag, getTypeTag } from "./data";

export default defineComponent({
  props: ["list", "page", "count", "total", "loading"],
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
    });
    const goDetail = (reacrd: IQuestion) => {
      router.push(`/admin/question/${reacrd._id}`);
    };
    const pageChange = (pagination: any, filters: any, sorter: any, data: any) => {
      emit("pageChange", pagination);
    };
    const del = (reacrd: IQuestion) => {};
    const publish = (reacrd: IQuestion, status: number) => {
      http.put("/question/publish", { id: reacrd._id, status: status }).then((res) => {
        message.success(`${status == 2 ? "" : "取消"}发布成功!`);
        reacrd.status = status;
      });
    };
    return {
      data,
      tableLoading,
      pagination,
      getLevelTag,
      getTypeTag,
      getStatusTag,
      columns,
      goDetail,
      del,
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
