<template>
  <div class="question_detail">
    <a-card :title="question._title" :headStyle="headerStyle" :bodyStyle="bodyStyle" class="question_detail_card">
      <template #extra>
        <a-space>
          <a-button type="primary" v-if="question.status != 3"> <EditOutlined /> 编辑 </a-button>
          <a-button type="primary" v-if="question.status == 1" @click="publish(2)"> <BranchesOutlined /> 发布 </a-button>
          <a-button type="primary" v-if="question.status == 2" @click="publish(1)"> <DisconnectOutlined /> 取消发布 </a-button>
          <a-button type="danger" v-if="question.status != 3" @click="del"> <DeleteOutlined /> 删除 </a-button>
        </a-space>
      </template>
      <div class="body">
        <div class="left">
          <div class="container">
            <div v-html="question.body"></div>
          </div>
        </div>
        <div class="right">
          <a-card title="答案选项" v-if="[1, 2].includes(question.type)">
            <div class="option" :class="{ correct: question.answer.includes(option.key) }" v-for="option in question.options" :key="option.key">
              <span class="option_label">{{ option.key }}</span>
              <span class="option_value">{{ option.val }}</span>
            </div>
          </a-card>
          <a-card title="判题因素" v-if="question.type == 3" style="margin-top: 20px">
            <div class="option" :class="{ correct: question.factor.isCase }">是否区分大小写</div>
            <div class="option" :class="{ correct: question.factor.isSpace }">是否区分空格</div>
            <div class="option" :class="{ correct: question.factor.isWidth }">是否区分全半角</div>
            <div class="option" :class="{ correct: question.factor.isKeywords }">是否按点得分</div>
          </a-card>
          <a-card title="附件" style="margin-top: 20px">
            <div class="option" v-for="file in question.files" :key="file.name">
              <a :href="file.path" target="__blank">{{file.name}}</a>
            </div>
          </a-card>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { EditOutlined, BranchesOutlined, DisconnectOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import http from "../../../libs/http";
import { message } from "ant-design-vue";
import router from "../../../router";
export default defineComponent({
  setup() {
    const { params } = useRoute();
    const question = reactive({});
    const getDetail = () => {
      http.get(`/question/${params.id}`, {}).then((res) => {
        res.data._title = `${res.data.title} [${res.data.score}分]`;
        return Object.assign(question, res.data);
      });
    };
    const headerStyle = reactive({
      fontWeight: 600,
    });
    const bodyStyle = reactive({
      height: "calc(100% - 65px)",
      padding: "0px",
    });
    onMounted(async () => await getDetail());
    
    const del = () => {
      http.delete("/question", { id: params.id }).then((res) => {
        message.success(String(res.message));
        setTimeout(() => {
          router.push('/admin/question')
        }, 500);
      });
    };
    const publish = (status: number) => {
      http.put("/question/publish", { id: params.id, status: status }).then((res) => {
        message.success(`${status == 2 ? "" : "取消"}发布成功!`);
        getDetail();
      });
    };
    return {
      id: params.id,
      getDetail,
      question,
      headerStyle,
      bodyStyle,
      del,
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
  flex: 1;
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
  flex: 1;
  overflow: auto;
  box-sizing: border-box;
  padding: 24px;
  font-size: 18px;
}
.right .option {
  font-size: 16px;
  line-height: 30px;
  height: 30px;
}
.right .option_label {
  display: inline-block;
  padding-right: 10px;
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
