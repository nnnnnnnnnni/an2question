<template>
  <div class="search_form">
    <a-form layout="inline">
      <a-form-item>
        <a-input v-model:value="formState.title" placeholder="标题" style="width: 150px" allowClear />
      </a-form-item>
      <a-form-item>
        <a-select v-model:value="formState.level" placeholder="题目难度" allowClear style="width: 100px">
          <a-select-option v-for="item in RLevel" :key="item.label" :value="item.key">{{ item.label }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-select v-model:value="formState.type" placeholder="题目类型" allowClear style="width: 100px">
          <a-select-option v-for="item in RType" :key="item.label" :value="item.key">{{ item.label }}</a-select-option>
        </a-select>
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
          <a-button type="primary">
            <router-link :to="{ name: 'ADMIN_QUESTION_ADD' }">
              <a-space> <PlusOutlined />新增 </a-space>
            </router-link>
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { SearchOutlined, UndoOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { useForm } from "@ant-design-vue/use";
import { defineComponent, reactive, UnwrapRef, toRaw } from "vue";
import { IOptions, level, type, status } from "./data";
export default defineComponent({
  setup(_, context) {
    const formState: UnwrapRef<IOptions> = reactive({
      title: undefined,
      type: undefined,
      level: undefined,
      status: undefined,
    });
    const RLevel = reactive(level);
    const RType = reactive(type);
    const RStatus = reactive(status);
    const { resetFields } = useForm(formState, reactive([]));
    const reset = () => {
      resetFields();
    };
    const search = () => {
      context.emit('search', formState)
    };
    return {
      formState,
      reset,
      search,
      RLevel,
      RType,
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
