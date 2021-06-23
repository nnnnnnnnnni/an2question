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
    <a-form-item v-if="formState.type == 1" label="开始时间" required>
      <a-space>
        <a-date-picker placeholder="请选择时间" v-model:value="formState.startAt" :showTime="{ minuteStep: 10, format: 'HH:mm' }" format="YYYY-MM-DD HH:mm:00" :locale="locale" @change="dateChange" />
        <span v-if="formState.closeAt" class="closeAt">结束时间: {{ moment(formState.closeAt).format("YYYY-MM-DD HH:mm:00") }}</span>
      </a-space>
    </a-form-item>
    <a-form-item label="时长" required>
      <a-space>
        <a-input-number v-model:value="formState.times" :min="0" :max="300" :step="30" @change="timesChange" />
        <span>分钟</span>
      </a-space>
    </a-form-item>
    <a-form-item label="试卷" required>
      <a-select
        show-search
        v-model:value="formState.testpaper"
        placeholder="输入试卷名称搜索"
        :allowClear="true"
        :defaultActive-firstOption="false"
        :filterOption="false"
        :notFoundContent="null"
        @search="handleSearch"
      >
        <a-select-option v-for="testpaper in testpapers" :key="testpaper._id">
          <a-space>
            <div>{{ testpaper.title }}</div>
            <a-tag :color="getTypeTag(1).color">单选 {{ testpaper.choiceScore }} / {{ testpaper.choiceCount }}</a-tag>
            <a-tag :color="getTypeTag(2).color">多选 {{ testpaper.multiScore }} / {{ testpaper.multiCount }}</a-tag>
            <a-tag :color="getTypeTag(3).color">填空 {{ testpaper.blankScore }} / {{ testpaper.blankCount }}</a-tag>
            <a-tag :color="getTypeTag(4).color">代码 {{ testpaper.codeScore }} / {{ testpaper.codeCount }}</a-tag>
          </a-space>
        </a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref, UnwrapRef } from "vue";
import { IExam, type } from "./data";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
import moment from "moment";
import { ITestpaper } from "../testpaper/data";
import { getTypeTag } from "../question/data";
import http from "../../../libs/http";
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
      times: 120,
      startAt: undefined,
      closeAt: undefined,
    });

    const dateChange = (date: any) => {
      if (date) {
        const min = moment(date).minutes();
        console.log(min);
        formState.startAt = moment(date)
          .add(-(min % 10), "minutes")
          .format("YYYY-MM-DD HH:mm:00");
        formState.closeAt = moment(date)
          .add(-(min % 10) + formState.times, "minutes")
          .format("YYYY-MM-DD HH:mm:00");
      } else {
        formState.closeAt = undefined;
      }
    };
    const timesChange = (key: any) => {
      if (formState.startAt && formState.closeAt) {
        formState.closeAt = moment(formState.startAt).add(key, "minutes").format("YYYY-MM-DD HH:mm:00");
      }
    };

    const testpapers: UnwrapRef<ITestpaper[]> = reactive([]);
    const requestQuestion = (e: string) => {
      http
        .get("/testpaper", {
          page: 1,
          count: 10,
          options: {
            title: e,
            status: 5,
          },
        })
        .then((res) => {
          console.log(res.data.testpapers);
          return Object.assign(testpapers, res.data.testpapers);
        });
    };
    let timer: any = null;
    const handleSearch = (e: string) => {
      if (e != "") {
        if (timer != null) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          requestQuestion(e);
        }, 500);
      }
    };

    return {
      locale,
      formRef,
      type,
      formState,
      loading,
      moment,
      testpapers,
      dateChange,
      timesChange,
      handleSearch,
      getTypeTag,
    };
  },
  components: {
    QuestionCircleOutlined,
  },
});
</script>

<style scoped>
.closeAt {
  color: #52c41a;
}
</style>
