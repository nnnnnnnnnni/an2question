<template>
  <div class="testpaper_detail">
    <a-card>
      <a-descriptions :title="testpaper.title" :column="2" layout="vertical">
        <a-descriptions-item label="题目列表">
          <div class="questions">
            <div class="question" v-for="question in testpaper.questions" :key="question._id">
              <router-link :to="`/admin/question/${question._id}`">
                <a-space>
                  <a-tag :color="getTypeTag(question.type).color">{{ getTypeTag(question.type).label }}</a-tag>
                  <a-tag :color="getLevelTag(question.level).color">{{ getLevelTag(question.level).label }}</a-tag>
                  <a-tag :color="getStatusTag(question.status).color">{{ getStatusTag(question.status).label }}</a-tag>
                  <span class="title">{{ question.title }}</span>
                </a-space>
                <span class="score">{{ question.score }}</span>
              </router-link>
            </div>
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="附件列表">
          <div class="options">
            <div class="option" v-if="testpaper.files && testpaper.files.length" v-for="file in testpaper.files" :key="file.name">
              <a :href="file.path" target="__blank">{{ file.name }}</a>
            </div>
            <a-empty v-else description="无附件"></a-empty>
          </div>
        </a-descriptions-item>
        <template #extra>
          <a-space>
            <a-button type="primary" v-if="isNewInswert" @click="goAdd"> <EditOutlined /> 继续添加 </a-button>
            <a-button type="primary" v-if="testpaper.status != 3" @click="goEdit"> <EditOutlined /> 编辑 </a-button>
            <a-button type="primary" v-if="testpaper.status == 1" @click="publish(2)"> <BranchesOutlined /> 发布 </a-button>
            <a-button type="primary" v-if="testpaper.status == 2" @click="publish(1)"> <DisconnectOutlined /> 取消发布 </a-button>
            <a-button type="danger" v-if="testpaper.status != 3" @click="handleDelete"> <DeleteOutlined /> 删除 </a-button>
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
import { getTypeTag, getLevelTag, getStatusTag } from "../../../components/admin/question/data";
export default defineComponent({
  setup() {
    const { params, query } = useRoute();
    const isNewInswert = ref<Boolean>(Object.keys(query).length > 0);
    const testpaper = reactive({
      status: 3,
    });
    const getDetail = () => {
      http.get(`/testpaper/${params.id}`, {}).then((res) => {
        return Object.assign(testpaper, res.data);
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
          http.delete("/testpaper", { id: params.id }).then((res) => {
            message.success(String(res.message));
            return router.push("/admin/testpaper");
          });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    };
    const goEdit = () => {
      router.push({ name: "ADMIN_TESTPAPER_EDIT", query: { id: params.id } });
    };
    const publish = (status: number) => {
      http.put("/testpaper/publish", { id: params.id, status: status }).then((res) => {
        message.success(`${status == 2 ? "" : "取消"}发布成功!`);
        getDetail();
      });
    };
    const goAdd = () => {
      router.push({ name: "ADMIN_TESTPAPER_ADD" });
    };
    return {
      id: params.id,
      testpaper,
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
      getTypeTag,
      getLevelTag,
      getStatusTag,
      isNewInswert,
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
.testpaper_detail {
  margin: 0 auto;
  padding: 0 !important;
  background-color: transparent !important;

  width: 80%;
  min-width: 800px;
  height: 100%;
  overflow: hidden;
}
.questions {
  width: 100%;
  box-sizing: border-box;
  padding-right: 20px;
}
.questions .question {
  position: relative;
  padding: 6px 6px;
  border-radius: 5px;
  transition: all 0.3s;
  cursor: pointer;
  margin: 4px 0px;
  background-color: #efefef;
}
.questions .question .score {
  float: right;
}
.questions .question:hover {
  background-color: #e3e3e3;
}
.options {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 20px;
}
.option {
  font-size: 16px;
  line-height: 30px;
  padding: 6px 6px;
}
.correct {
  font-weight: 600;
  color: #40a9ff;
  font-size: 1.2em;
}
a {
  display: block;
  color: #40a9ff;
  text-decoration: none;
}
</style>
