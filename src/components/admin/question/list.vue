<template>
  <a-table :columns="columns" rowKey="_id" :data-source="data">
    <template #level="{ text }">
      <span>
        <a-tag :color='getLevelTag(text).color'>{{getLevelTag(text).label}}</a-tag>
      </span>
    </template>
    <template #status="{ text }">
      <span>
        <a-tag :color='getStatusTag(text).color'>{{getStatusTag(text).label}}</a-tag>
      </span>
    </template>
    <template #action="{ record }">
      <span>
        <a-button shape="circle" type="primary" @click="detail(record)">
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
import { defineComponent } from "vue";
import router from "../../../router";
import { columns, IData, getLevelTag, getStatusTag } from "./data";
const data = [
  {
    _id: "1",
    name: "测试题目1",
    type: 1,
    status: 1,
    level: 1,
    score: 10,
  },
  {
    _id: "2",
    name: "测试题目2",
    type: 2,
    status: 2,
    level: 2,
    score: 20,
  },
  {
    _id: "3",
    name: "测试题目3",
    type: 3,
    status: 3,
    level: 3,
    score: 30,
  },
  {
    _id: "4",
    name: "测试题目4",
    type: 4,
    status: 4,
    level: 3,
    score: 40,
  },
];

export default defineComponent({
  setup() {
    const detail = (reacrd: IData) => {
      router.push({ name: "ADMIN_QUESTION_DETAIL", params: { id: reacrd._id } });
    };
    const del = (reacrd: IData) => {};
    return {
      data,
      getLevelTag,
      getStatusTag,
      columns,
      detail,
      del,
    };
  },
  components: {
    EllipsisOutlined,
    DeleteOutlined,
  },
});
</script>
