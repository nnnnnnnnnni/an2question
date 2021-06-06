<template>
  <div class="search_form">
    <a-form layout="inline">
      <a-form-item>
        <a-input v-model:value="formState.title" placeholder="标题" style="width: 150px" />
      </a-form-item>
      <a-form-item>
        <a-select v-model:value="formState.status" placeholder="状态" allowClear style="width: 150px">
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
import { SearchOutlined, UndoOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { useForm } from "@ant-design-vue/use";
import { defineComponent, reactive, UnwrapRef } from "vue";
import { IOptions, status } from "./data";
import router from "../../../router";
export default defineComponent({
  setup(_, context) {
    const formState: UnwrapRef<IOptions> = reactive({
      title: undefined,
      status: undefined,
    });
    const RStatus = reactive(status);
    const { resetFields } = useForm(formState, reactive([]));
    const add = () => {
      router.push({ name: "ADMIN_TESTPAPER_ADD" });
    };
    const reset = () => {
      resetFields();
    };
    const search = () => {
      context.emit('search', formState)
    };
    return {
      formState,
      add,
      reset,
      search,
      RStatus,
    };
  },
  components: {
    SearchOutlined,
    UndoOutlined,
    PlusOutlined,
  },
});
</script>

<style scoped></style>
