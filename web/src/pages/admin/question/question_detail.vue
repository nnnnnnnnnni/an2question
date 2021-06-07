<template>
  <div class="question_detail">
    <a-card
      :title="question.title + ' [ ' + question.score + ' 分 ]'"
      :headStyle="headerStyle"
      :bodyStyle="bodyStyle"
      class="question_detail_card"
    >
      <template #extra>
        <a-space>
          <a-button type="primary" v-if="question.status != 3" @click="goEdit"> <EditOutlined /> 编辑 </a-button>
          <a-button type="primary" v-if="question.status == 1" @click="publish(2)">
            <BranchesOutlined /> 发布
          </a-button>
          <a-button type="primary" v-if="question.status == 2" @click="publish(1)">
            <DisconnectOutlined /> 取消发布
          </a-button>
          <a-button type="danger" v-if="question.status != 3" @click="handleDelete"> <DeleteOutlined /> 删除 </a-button>
        </a-space>
      </template>
      <div class="body">
        <div class="left">
          <div class="container">
            <div v-html="question.body"></div>
          </div>
        </div>
        <div class="right">
          <a-card title="答案选项" v-if="question.type == 1 || question.type == 2">
            <div
              class="option"
              :class="{ correct: question.answer.includes(option.key) }"
              v-for="option in question.options"
              :key="option.key"
            >
              <span class="option_label">{{ option.key }}</span>
              <span class="option_value">{{ option.val }}</span>
            </div>
          </a-card>
          <a-card title="答案" v-if="question.type == 3" style="margin-top: 20px">
            <div class="option correct">{{question.answer}}</div>
          </a-card>
          <a-card title="判题因素" v-if="question.type == 3" style="margin-top: 20px">
            <div class="option correct" v-if="question.factor.isCase">是否区分大小写</div>
            <div class="option correct" v-if="question.factor.isSpace">是否区分空格</div>
            <div class="option correct" v-if="question.factor.isWidth">是否区分全半角</div>
            <div class="option correct" v-if="question.factor.isKeywords">是否按点得分</div>
          </a-card>
          <a-card title="示例" v-if="question.type == 4" style="margin-top: 20px">
            <div class="option" v-for="(example, i) in question.examples" :key="i">
              <pre class="example">{{ example.input }}</pre>
              <pre class="example">{{ example.output }}</pre>
            </div>
          </a-card>
          <a-card title="附件" style="margin-top: 20px">
            <div class="option" v-for="file in question.files" :key="file.name">
              <a :href="file.path" target="__blank">{{ file.name }}</a>
            </div>
          </a-card>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import { createVNode, defineComponent, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import {
  EditOutlined,
  BranchesOutlined,
  DisconnectOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import http from "../../../libs/http";
import { message, Modal } from "ant-design-vue";
import router from "../../../router";
export default defineComponent({
  setup() {
    const { params } = useRoute();
    const question = reactive({});
    const getDetail = () => {
      http.get(`/question/${params.id}`, {}).then((res) => {
        return Object.assign(question, res.data);
      });
    };
    onMounted(async () => await getDetail());

    const handleDelete = () => {
      Modal.confirm({
        title: "确定要删除吗?",
        icon: createVNode(ExclamationCircleOutlined),
        content: "题目一经删除,无法恢复,请确认后删除!",
        okText: "删除",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          http.delete("/question", { id: params.id }).then((res) => {
            message.success(String(res.message));
            return router.push("/admin/question");
          });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    };
    const goEdit = () => {
      router.push({ name: "ADMIN_QUESTION_EDIT", query: { id: params.id } });
    };
    const publish = (status: number) => {
      http.put("/question/publish", { id: params.id, status: status }).then((res) => {
        message.success(`${status == 2 ? "" : "取消"}发布成功!`);
        getDetail();
      });
    };
    return {
      id: params.id,
      question,
      headerStyle: {
        fontWeight: 600,
      },
      bodyStyle: {
        height: "calc(100% - 65px)",
        padding: "0px",
      },
      handleDelete,
      goEdit,
      publish,
    };
  },
  components: {
    EditOutlined,
    BranchesOutlined,
    DisconnectOutlined,
    DeleteOutlined,
  },
});
</script>

<style scoped>
.question_detail {
  margin: 0 auto;
  padding: 0 !important;
  background-color: transparent !important;

  width: 80%;
  min-width: 800px;
  height: 100%;
  overflow: hidden;
}
.question_detail_card {
  height: 100%;
}
.question_detail_card .body {
  height: 100%;
  display: flex;
  box-sizing: border-box;
}
.question_detail_card .body .left {
  flex: 3;
  overflow: auto;
  padding: 24px;
}
.question_detail_card .body .left .container {
  border-radius: 5px;
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.3);
}
.question_detail_card .body .right {
  flex: 2;
  overflow: auto;
  box-sizing: border-box;
  padding: 24px;
  font-size: 18px;
}
.right .option {
  font-size: 16px;
  line-height: 30px;
}
.right .option_label {
  display: inline-block;
  padding-right: 10px;
}
.right .option .example {
  width: 48%;
  margin: 10px 1%;
  padding: 4px;
  border-radius: 5px;
  border: 1px solid #e3e3e3;
  display: inline-block;
}
.correct {
  font-weight: 600;
  color: #40a9ff;
  font-size: 1.2em;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #fff;
}
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #e0e0e0;
}
::-webkit-scrollbar-track {
  background-color: #f0f0f0;
}
a {
  display: block;
  color: #40a9ff;
  text-decoration: none;
}
</style>
