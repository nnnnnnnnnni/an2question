<template>
  <a-table :columns="columns" rowKey="_id" :dataSource="data.data" :loading="tableLoading" :pagination="pagination" @change="pageChange">
    <template #status="{ text }">
      <span>
        <a-tag :color="getStatusTag(text).color">{{ getStatusTag(text).label }}</a-tag>
      </span>
    </template>
    <template #choice="{ record }">
      <a-statistic>
        <template #formatter>
          <span style="color: #f5222d">{{ record.choiceCount }}</span>
        </template>
        <template #suffix>
          <span>/ {{ record.choiceScore }}</span>
        </template>
      </a-statistic>
    </template>
    <template #multi="{ record }">
      <a-statistic>
        <template #formatter>
          <span style="color: #f5222d">{{ record.multiCount }}</span>
        </template>
        <template #suffix>
          <span>/ {{ record.multiScore }}</span>
        </template>
      </a-statistic>
    </template>
    <template #blank="{ record }">
      <a-statistic>
        <template #formatter>
          <span style="color: #f5222d">{{ record.blankCount }}</span>
        </template>
        <template #suffix>
          <span>/ {{ record.blankScore }}</span>
        </template>
      </a-statistic>
    </template>
    <template #code="{ record }">
      <a-statistic>
        <template #formatter>
          <span style="color: #f5222d">{{ record.codeCount }}</span>
        </template>
        <template #suffix>
          <span>/ {{ record.codeScore }}</span>
        </template>
      </a-statistic>
    </template>
    <template #allScore="{ record }">
      <b style="color: #f5222d">{{ record.choiceScore + record.multiScore + record.blankScore + record.codeScore }}</b>
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
        <a-button :disabled="record.status == 3" shape="circle" type="danger" @click="openDeleteModal(record)">
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
import { EllipsisOutlined, DeleteOutlined, BranchesOutlined, DisconnectOutlined, ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { message, Modal } from "ant-design-vue";
import { defineComponent, reactive, toRefs, watch, ref, createVNode } from "vue";
import http from "../../../libs/http";
import router from "../../../router";
import { columns, ITestpaper, getStatusTag } from "./data";

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
    console.log(list);
    const tableLoading = ref(loading.value);
    watch(loading, () => (tableLoading.value = loading.value));
    const pagination = reactive({
      current: page || 1,
      pageSize: count || 10,
      total: total || 0,
    });
    const goDetail = (reacrd: ITestpaper) => {
      router.push(`/admin/testpaper/${reacrd._id}`);
    };
    const pageChange = (pagination: any, filters: any, sorter: any, data: any) => {
      emit("pageChange", pagination);
    };
    const openDeleteModal = (reacrd: ITestpaper) => {
      Modal.confirm({
        title: "确定要删除吗?",
        icon: createVNode(ExclamationCircleOutlined),
        content: "题目一经删除,无法恢复,请确认后删除!",
        okText: "删除",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          http.delete("/testpaper", { id: reacrd._id }).then((res) => {
            message.success(String(res.message));
            emit("reacrdDelete");
          });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    };

    const publish = (reacrd: ITestpaper, status: number) => {
      http.put("/testpaper/publish", { id: reacrd._id, status: status }).then((res) => {
        message.success(`[${reacrd.title}] ${status == 2 ? "" : "取消"}发布成功!`);
        reacrd.status = status;
      });
    };
    return {
      data,
      tableLoading,
      pagination,
      getStatusTag,
      columns,
      goDetail,
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
