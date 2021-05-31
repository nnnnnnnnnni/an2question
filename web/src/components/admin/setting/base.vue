<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="头像">
      <a-space direction="vertical" align="center">
        <img class="avator" :src="formState.avator" alt="" />
      </a-space>
    </a-form-item>
    <a-form-item label="邮箱">
      <a-input :value="formState.email" disabled />
    </a-form-item>
    <a-form-item label="姓名">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 2, offset: 3 }">
      <a-button type="primary" @click="onSubmit">提交</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw, UnwrapRef } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { IUser } from "../../../pages/interface";
import store from "../../../vuex";
import { message } from "ant-design-vue";
import http from "../../../libs/http";

export default defineComponent({
  components: {
    UploadOutlined,
  },
  setup() {
    const formState: UnwrapRef<IUser> = reactive(JSON.parse(JSON.stringify(store.state.user)));
    const onSubmit = () => {
      http.put('/user/setting', toRaw(formState)).then(res => {
        if(res.code == 1) {
          store.commit('setUser', res.data);
          return message.success('修改成功')
        } else {
          message.error(res.message || "接口错误")
        }
      })
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
  box-shadow: 0px 12px 16px 8px rgba(0, 0, 0, 0.05);
}
</style>
