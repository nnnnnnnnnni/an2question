<template>
  <div class="search_form">
    <a-form layout="inline">
      <a-form-item>
        <a-input v-model:value="formState.title" placeholder="标题" style="width: 150px" allowClear />
      </a-form-item>
      <a-form-item>
        <a-select v-model:value="formState.type" placeholder="考试类型" allowClear style="width: 100px">
          <a-select-option v-for="item in RType" :key="item.label" :value="item.key">{{ item.label }}</a-select-option>
        </a-select>
        <span style=" padding-left: 5px; cursor: pointer;">
          <a-tooltip :destroyTooltipOnHide='true'>
            <template #title>
              <div>固定时间点: 开始-结束时间，其他时间无法访问</div>
              <div>固定时间段: 设置固定时间长度，任何时候都可以开始考试</div>
            </template>
            <QuestionCircleOutlined style="color: #e1e1e1" />
          </a-tooltip>
        </span>
      </a-form-item>
      <a-form-item>
        <a-select v-model:value="formState.status" placeholder="状态" allowClear style="width: 100px">
          <a-select-option v-for="item in RStatus" :key="item.label" :value="item.key">{{ item.label }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" @click="search">
            <template #icon> <SearchOutlined /></template>搜索
          </a-button>
          <a-button type="primary" @click="reset">
            <template #icon> <UndoOutlined /></template>清空
          </a-button>
          <a-button type="primary" @click="add">
            <template #icon> <PlusOutlined /></template>新增
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { SearchOutlined, UndoOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons-vue";
import { useForm } from "@ant-design-vue/use";
import { defineComponent, reactive, UnwrapRef } from "vue";
import { IOptions, type, status } from "./data";
import router from "../../../router";
export default defineComponent({
  setup(_, context) {
    const formState: UnwrapRef<IOptions> = reactive({
      title: undefined,
      type: undefined,
      status: undefined,
    });
    const RType = reactive(type);
    const RStatus = reactive(status);
    const { resetFields } = useForm(formState, reactive([]));
    const add = () => {
      router.push({ name: "ADMIN_EXAM_ADD" });
    };
    const reset = () => {
      resetFields();
    };
    const search = () => {
      context.emit("search", formState);
    };
    return {
      formState,
      add,
      reset,
      search,
      RType,
      RStatus,
    };
  },
  components: {
    SearchOutlined,
    UndoOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
  },
});
</script>

<style scoped>
</style>
