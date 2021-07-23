<template>
  <div class="question_detail">
    <a-card>
      <a-descriptions :title="question.title" :column="2" layout="vertical">
        <a-descriptions-item label="题目描述" :span="2">
          <div v-html="question.body" />
        </a-descriptions-item>
        <a-descriptions-item label="答案选项" v-if="question.type == 1 || question.type == 2">
          <div class="options">
            <div class="option" :class="{ correct: question.answer.includes(option.key) }" v-for="option in question.options" :key="option.key">
              <span class="option_label">{{ option.key }}</span>
              <span class="option_value">{{ option.val }}</span>
            </div>
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="答案" v-if="question.type == 3">
          <div class="option correct">{{ question.answer }}</div>
        </a-descriptions-item>
        <a-descriptions-item label="附件列表">
          <div class="options">
            <div class="option" v-if="question.files && question.files.length" v-for="file in question.files" :key="file.name">
              <a :href="file.path" target="__blank">{{ file.name }}</a>
            </div>
            <a-empty v-else description="无附件"></a-empty>
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="判题因素" v-if="question.type == 3" :span="1">
          <dic class="options">
            <div class="option correct" v-if="question.factor.isCase">是否区分大小写</div>
            <div class="option correct" v-if="question.factor.isSpace">是否区分空格</div>
            <div class="option correct" v-if="question.factor.isWidth">是否区分全半角</div>
            <div class="option correct" v-if="question.factor.isKeywords">是否按点得分</div>
            <a-empty v-if="!question.factor.isCase && !question.factor.isSpace && !question.factor.isWidth && !question.factor.isKeywords" description="无特殊判定"></a-empty>
          </dic>
        </a-descriptions-item>
        <a-descriptions-item label="示例" v-if="question.type == 4">
          <div class="option" v-for="(example, i) in question.examples" :key="i">
            <pre class="example">{{ example.input }}</pre>
            <pre class="example">{{ example.output }}</pre>
          </div>
        </a-descriptions-item>
        <template #extra>
          <a-space>
            <a-button type="primary" v-if="isNewInswert" @click="goAdd"> <EditOutlined /> 继续添加 </a-button>
            <a-button type="primary" v-if="question.status != 3" @click="goEdit"> <EditOutlined /> 编辑 </a-button>
            <a-button type="primary" v-if="question.status == 1" @click="publish(2)"> <BranchesOutlined /> 发布 </a-button>
            <a-button type="primary" v-if="question.status == 2" @click="publish(1)"> <DisconnectOutlined /> 取消发布 </a-button>
            <a-button type="danger" v-if="question.status != 3" @click="handleDelete"> <DeleteOutlined /> 删除 </a-button>
          </a-space>
        </template>
      </a-descriptions>
    </a-card>
  </div>
</template>

<script lang="ts">
import { createVNode, defineComponent, onBeforeMount, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { EditOutlined, BranchesOutlined, DisconnectOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons-vue";
import http from "../../../libs/http";
import { message, Modal } from "ant-design-vue";
import router from "../../../router";
import { getFileType } from "../../../libs/utils";
import docPng from "@/assets/file/doc.png";
import excelPng from "@/assets/file/excel.png";
import imgPng from "@/assets/file/img.png";
import otherPng from "@/assets/file/other.png";
import pdfPng from "@/assets/file/pdf.png";
import pptPng from "@/assets/file/ppt.png";
import zipPng from "@/assets/file/zip.png";
export default defineComponent({
  setup() {
    const { params, query } = useRoute();
    const question = reactive({
      status: 3,
    });
    const fileType = {
      doc: docPng,
      excel: excelPng,
      img: imgPng,
      other: otherPng,
      pdf: pdfPng,
      ppt: pptPng,
      zip: zipPng,
    };
    const isNewInswert = ref<Boolean>(Object.keys(query).length > 0);
    const getDetail = () => {
      http.get(`/question/${params.id}`, {}).then((res) => {
        res.data.files.map((file: any) => {
          file.icon = fileType[getFileType(file.path)];
          return file;
        });
        return Object.assign(question, res.data);
      });
    };
    onBeforeMount(async () => await getDetail());

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
    const goAdd = () => {
      router.push({ name: "ADMIN_QUESTION_ADD" });
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
      isNewInswert,
      handleDelete,
      goEdit,
      publish,
      goAdd,
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
.options {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 20px 0px 10px;
}
.options .option {
  line-height: 30px;
}
.options .option img {
  display: block;
  width: 40px;
  height: 40px;
}
.options .option_label {
  display: inline-block;
  padding-right: 10px;
}
.options .option .example {
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
  font-size: 1.1em;
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
