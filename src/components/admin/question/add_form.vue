<template>
  <a-form style="width: 600px" :labelCol="labelCol" :wrapperCol="wrapperCol">
    <a-form-item label="题型">
      <a-radio-group v-model:value="formState.type">
        <a-radio v-for="item in type" :key="item.key" :value="item.key">{{
          item.label
        }}</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="标题">
      <a-input v-model:value="formState.title" />
    </a-form-item>
    <a-form-item label="正文">
      <div id="body"></div>
    </a-form-item>
    <a-form-item :wrapperCol="{ span: 19, offset: 5 }">
      <a-button type="primary" @click="onSubmit">确定</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { Moment } from "moment";
import { type, IFormState } from "./data";
import { defineComponent, onMounted, reactive, toRaw, UnwrapRef } from "vue";
import { clearObj } from "../../../libs/utils";
import E from "wangeditor";
export default defineComponent({
  setup() {
    const formState: UnwrapRef<IFormState> = reactive({
      title: undefined,
      type: 1,
      level: undefined,
      status: undefined,
    });
    const onSubmit = () => {
      console.log(
        "submit!",
        toRaw(formState),
        clearObj(toRaw(formState), true)
      );
    };
    onMounted(() => {
      const editor = new E("#body");
      editor.create();
    });
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 19, offset: 1 },
      formState,
      onSubmit,
      type,
    };
  },
});
</script>

<style scoped>
</style>

