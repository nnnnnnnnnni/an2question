<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="头像">
      <a-space direction="vertical" align='center'>
        <img class="avator" :src="formState.avator" alt="" />
        <a-button  type="primary" shape="round">
          <template #icon> <UploadOutlined /> 更换</template>
        </a-button>
      </a-space>
    </a-form-item>
    <a-form-item label="邮箱">
      <a-input v-model:value="formState.email" />
    </a-form-item>
    <a-form-item label="姓名">
      <a-input v-model:value="formState.name" />
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw, UnwrapRef } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { IUser } from "../../../pages/interface";
import store from "../../../vuex";
export default defineComponent({
  components: {
    UploadOutlined,
  },
  setup() {
    const formState: UnwrapRef<IUser> = reactive(JSON.parse(JSON.stringify(store.state.user)));
    const onSubmit = () => {
      console.log("submit!", toRaw(formState));
    };
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 8, offset: 1 },
      formState,
      onSubmit,
    };
  },
});
</script>

<style scoped>
.avator {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0px 12px	16px	8px rgba(0, 0, 0, .05);
}
</style>
