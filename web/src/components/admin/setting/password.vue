<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="旧密码" required>
      <a-input-password v-model:value="formState.oldPass" />
    </a-form-item>
    <a-form-item label="新密码" required>
      <a-input-password v-model:value="formState.newPass" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 2, offset: 3 }">
      <a-button type="primary" @click="onSubmit">提交</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { message } from "ant-design-vue";
import { defineComponent, reactive } from "vue";
import http from "../../../libs/http";
import router from "../../../router";
export default defineComponent({
  setup() {
    const formState = reactive({
      newPass: "",
      oldPass: "",
    });
    const onSubmit = () => {
      if(!formState.newPass || !formState.oldPass) {
        return message.error('请填写完整信息!')
      }
      if(formState.oldPass == formState.newPass) {
        return message.error('新旧密码不能相同!')
      }
      http.put('/user/password', formState).then(res => {
        if(res.code == 1) {
          message.success(res.message || '密码修改成功');
          setTimeout(() => {
            return router.push({name: 'LOGIN'})
          }, 1000);
        }
      })
    }
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 8, offset: 1 },
      formState,
      onSubmit
    };
  },
});
</script>

<style scoped></style>
