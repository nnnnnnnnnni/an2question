<template>
  <div class="search_form">
    <a-form layout="inline">
      <a-form-item>
        <a-input v-model:value="formState.title" placeholder="名称 / 邮箱" allowClear />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" @click="search">
            <template #icon> <SearchOutlined /></template>搜索
          </a-button>
          <a-button type="primary" @click="add">
            <template #icon> <PlusOutlined /></template>批量新增
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>
    <a-modal v-model:visible="visible" title="批量生成" @ok="handleAddOk" okText="确认添加" cancelText="取消" width="800px">
      <a-form :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
        <a-form-item
          label="名称/邮箱前缀"
          required
          :help="addFormState.name ? `生成后的格式: ${addFormState.name}[xxx]@qq.com` : ''"
        >
          <a-input v-model:value="addFormState.name" allowClear />
        </a-form-item>
        <a-form-item
          label="生成个数"
          required
          :help="
            addFormState.count == 1
              ? `账号示例: ${addFormState.name}0@qq.com`
              : `账号示例: ${addFormState.name}0@qq.com - ${addFormState.name}${addFormState.count - 1}@qq.com`
          "
        >
          <a-input-number v-model:value="addFormState.count" allowClear style="width: 100%" />
        </a-form-item>
        <a-form-item label="通用密码" required>
          <a-input v-model:value="addFormState.password" allowClear />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { SearchOutlined, UndoOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, UnwrapRef, ref } from "vue";
import store from "../../../vuex";
import { IOptions, IAddOptions } from "./data";
export default defineComponent({
  setup(_, context) {
    const formState: UnwrapRef<IOptions> = reactive({
      key: undefined,
    });
    const visible = ref<Boolean>(false);
    const addFormState: UnwrapRef<IAddOptions> = reactive({
      name: '前缀',
      password: undefined,
      count: 1,
    });

    // 打开modal
    const add = () => {
      visible.value = true;
    };

    // modal-ok
    const handleAddOk = () => {};
    const search = () => {
      context.emit("search", formState);
    };
    return {
      formState,
      addFormState,
      visible,
      add,
      search,
      handleAddOk,
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
