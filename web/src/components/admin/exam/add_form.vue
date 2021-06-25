<template>
  <a-form style="width: 800px" :labelCol="{ span: 3 }" :wrapperCol="{ span: 20, offset: 1 }" :model="formState" :rules="formRules" ref="formRef">
    <a-form-item label="题型" required name="title">
      <a-input v-model:value="formState.title" :maxlength="15" placeholder="标题最长15位" />
    </a-form-item>
    <a-form-item label="类型" required name="type">
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
    <a-form-item v-if="formState.type == 1" label="开始时间">
      <a-space>
        <a-date-picker
          placeholder="请选择时间"
          v-model:value="formState.startAt"
          :showTime="{ minuteStep: 10, format: 'HH:mm' }"
          format="YYYY-MM-DD HH:mm:00"
          :locale="locale"
          @change="dateChange"
          :disabledDate="disabledDate"
        />
        <span v-if="formState.closeAt" class="closeAt">结束时间: {{ moment(formState.closeAt).format("YYYY-MM-DD HH:mm:00") }}</span>
      </a-space>
    </a-form-item>
    <a-form-item label="时长" required>
      <a-space>
        <a-input-number v-model:value="formState.times" :min="0" :max="300" :step="30" @change="timesChange" />
        <span>分钟</span>
      </a-space>
    </a-form-item>
    <a-form-item label="试卷" required name="testpaper">
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
    <a-form-item label="注意事项" required name="note">
      <div id="note"></div>
    </a-form-item>
    <a-form-item label="考试人员" required name="participants">
      <a-select
        mode="multiple"
        v-model:value="formState.participants"
        placeholder="输入用户名称/邮箱搜索"
        :defaultActive-firstOption="false"
        :not-found-content="null"
        :maxTagTextLength="10"
        @search="handleBindsSearch"
      >
        <a-select-option v-for="bind in binds" :key="bind._id">
          <a-space>
            <a-avatar :src="bind.avator" size="small" />
            <span> {{ bind.name }}</span>
          </a-space>
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :wrapperCol="{ span: 13, offset: 11 }">
      <a-space>
        <a-button type="primary" @click="onSubmit(1)" :loading="loading">保存</a-button>
        <a-button type="primary" @click="onSubmit(2)" :loading="loading">发布</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { defineComponent, onMounted, onBeforeUnmount, reactive, ref, UnwrapRef } from "vue";
import { IExam, type, noteStr } from "./data";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
import moment, { Moment } from "moment";
import { ITestpaper } from "../testpaper/data";
import { getTypeTag } from "../question/data";
import http, { isDev } from "../../../libs/http";
import WangEditor from "wangeditor";
import { ValidateErrorEntity } from "ant-design-vue/lib/form/interface";
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

    // 时间选择
    const dateChange = (date: any) => {
      if (date) {
        const min = moment(date).minutes();
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
    const disabledDate = (current: Moment) => {
      return current && current < moment().add(-1, "days").endOf("day");
    };

    // 试卷选择
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

    // 正文处用到的文本框
    let editor: WangEditor;
    onMounted(() => {
      editor = new WangEditor("#note");
      editor.config.menus = ["head", "bold", "italic", "strikeThrough", "indent", "lineHeight", "foreColor", "link", "list", "justify", "emoticon", "table", "code"];
      editor.config.onchange = () => {
        formState.note = editor.txt.html();
        formRef.value.validate("note");
      };
      editor.create();
      editor.txt.html(noteStr);
    });
    onBeforeUnmount(() => {
      editor.destroy();
    });

    // 用户选择
    const binds: UnwrapRef<ITestpaper[]> = reactive([]);
    const reuqestUser = (e: string) => {
      http
        .get("/manager/list", {
          page: 1,
          count: 20,
          key: e,
        })
        .then((res) => {
          binds.length = 0;
          binds.push(
            ...res.data.binds.map((bind: any) => {
              bind.avator = isDev ? "/api" + bind.avator : bind.avator;
              return bind;
            })
          );
        });
    };
    const handleBindsSearch = (e: string) => {
      if (e != "") {
        if (timer != null) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          reuqestUser(e);
        }, 500);
      } else {
        binds.length = 0;
      }
    };

    // form规则
    const formRules = {
      title: [{ required: true, message: "请输入标题", trigger: "change" }],
      type: [{ required: true, message: "请选择类型", type: "number", trigger: "change" }],
      times: [
        { required: true, message: "请输入时长", type: "number", trigger: "change" },
        { min: 0, message: "时长必须大于0", type: "number", trigger: "change" },
      ],
      testpaper: [{ required: true, message: "请选择试卷", trigger: "change" }],
      participants: [{ required: true, message: "请选择考试人员", type: "array", trigger: "change" }],
      note: [{ required: true, message: "请填写注意事项", trigger: "change", whitespace: true }],
    };

    // 提交
    const onSubmit = (type: number) => {
      formRef.value
        .validate()
        .then(() => {
          console.log(1);
        })
        .catch((error: ValidateErrorEntity<IExam>) => {
          console.log("error", error);
        });
    };

    return {
      locale,
      formRef,
      formRules,
      type,
      formState,
      loading,
      moment,
      disabledDate,
      dateChange,
      timesChange,
      testpapers,
      handleSearch,
      getTypeTag,
      binds,
      handleBindsSearch,
      onSubmit,
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
