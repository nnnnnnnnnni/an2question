<template>
  <a-form style="width: 800px" :labelCol="{ span: 3 }" :wrapperCol="{ span: 20, offset: 1 }" :model="formState" ref="formRef">
    <a-form-item label="题型" required>
      <a-input v-model:value="formState.title" :maxlength="15" placeholder="标题最长15位" />
    </a-form-item>
    <a-form-item label="类型" required>
      <a-radio-group v-model:value="formState.type">
        <a-radio v-for="item in type" :key="item.key" :value="item.key">{{ item.label }}</a-radio>
      </a-radio-group>
      <a-tooltip :destroyTooltipOnHide="true">
        <template #title>
          <div>固定时间: 开始-结束时间，其他时间无法访问</div>
          <div>固定时长: 设置固定时间长度，任何时候都可以开始考试</div>
        </template>
        <QuestionCircleOutlined style="color: #a1a1a1" />
      </a-tooltip>
    </a-form-item>
    <a-form-item v-if="formState.type == 1" label="时间段" required>
      <a-range-picker v-model:value="timeRange" @change="change" :showTime="true" format="YYYY-MM-DD HH:mm" :placeholder="['开始时间', '结束时间']" :locale="locale" style="width: 100%" />
    </a-form-item>
    <a-form-item v-else label="时长" required>
      <a-space>
        <a-input-number v-model:value="formState.times" max="300" />
        <span>分钟</span>
      </a-space>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref, UnwrapRef } from "vue";
import { IExam, type } from "./data";
import { Moment } from "Moment";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
export default defineComponent({
  setup() {
    const formRef = ref();
    const loading = ref(false);
    const formState: UnwrapRef<IExam> = reactive({
      title: undefined,
      type: 1,
      testpaper: undefined,
      participants: [],
      note: undefined,
      times: 0,
      startAt: undefined,
      closeAt: undefined,
    });

    const timeRange = ref<Moment[]>([]);

    const change = function(dates: any, dateStrings: [string, string]) {
      console.log(dates, dateStrings)
    }

    return {
      locale,
      timeRange,
      formRef,
      type,
      formState,
      loading,
      change,
    };
  },
  components: {
    QuestionCircleOutlined,
  },
});
</script>

<style scoped>
.dynamic-delete-button {
  font-size: 20px;
}
.file {
  height: 22px;
  transition: background-color 0.3s;
  color: rgba(0, 0, 0, 0.85);
  margin-top: 8px;
  line-height: 22px;
  box-sizing: border-box;
  padding-left: 4px;
  position: relative;
}
.file .filename {
  padding-left: 8px;
  color: #40a9ff;
}
.file .delfile {
  display: none;
  float: right;
  margin-right: 6px;
}
.file:hover {
  background-color: #f3f3f3;
}
.file:hover .delfile {
  display: block;
  cursor: pointer;
}
</style>
