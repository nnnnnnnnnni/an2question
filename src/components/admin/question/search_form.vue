<template>
  <div class="search_form">
    <a-form layout="inline">
      <a-form-item>
        <a-input v-model:value="formState.name" placeholder="标题" style="width: 150px" />
      </a-form-item>
      <a-form-item>
        <a-select v-model:value="formState.level" placeholder="题目难度" allowClear style="width: 150px">
          <a-select-option v-for="item in RLevel" :key="item.label" :value="item.key">{{ item.label }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-select v-model:value="formState.type" placeholder="题目类型" allowClear style="width: 150px">
          <a-select-option v-for="item in RType" :key="item.label" :value="item.key">{{ item.label }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-select v-model:value="formState.status" placeholder="状态" allowClear style="width: 150px">
          <a-select-option v-for="item in RStatus" :key="item.label" :value="item.key">{{ item.label }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button-group>
          <a-button type="primary" @click="search">
            <template #icon> <SearchOutlined /> </template>
          </a-button>
          <a-button type="primary" @click="reset">
            <template #icon> <UndoOutlined /> </template>
          </a-button>
          <a-button type="primary" @click="add">
            <template #icon> <PlusOutlined /> </template>
          </a-button>
        </a-button-group>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { SearchOutlined, UndoOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { useForm } from "@ant-design-vue/use";
import { defineComponent, reactive, UnwrapRef, toRaw } from "vue";
import { IFormState, level, type, status } from "./data";
import router from "../../../router";
export default defineComponent({
  setup() {
    const formState: UnwrapRef<IFormState> = reactive({
      name: undefined,
      type: undefined,
      level: undefined,
      status: undefined,
    });
    const RLevel = reactive(level);
    const RType = reactive(type);
    const RStatus = reactive(status);
    const { resetFields } = useForm(formState, reactive([]));
    const add = () => {
      router.push({ name: "ADMIN_QUESTION_ADD" });
    };
    const reset = () => {
      resetFields();
    };
    const search = () => {
      console.log(toRaw(formState));
    };
    return {
      formState,
      add,
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
