<template>
  <div class="testpaper_detail">
    <a-card :title="testpaper.title + ' [ ' + testpaper.allScore + ' 分 ]'" :headStyle="headerStyle" :bodyStyle="bodyStyle" class="testpaper_detail_card">
      <template #extra>
        <a-space>
          <a-button type="primary" v-if="testpaper.status != 3" @click="goEdit"> <EditOutlined /> 编辑 </a-button>
          <a-button type="primary" v-if="testpaper.status == 1" @click="publish(2)"> <BranchesOutlined /> 发布 </a-button>
          <a-button type="primary" v-if="testpaper.status == 2" @click="publish(1)"> <DisconnectOutlined /> 取消发布 </a-button>
          <a-button type="danger" v-if="testpaper.status != 3" @click="handleDelete"> <DeleteOutlined /> 删除 </a-button>
        </a-space>
      </template>
      <div class="body">
        <div class="left">
          <a-card title="所有题目">
            <div class="question" v-for="question in testpaper.questions" :key="question._id">
              <a-space>
                <a-tag :color="getTypeTag(question.type).color">{{ getTypeTag(question.type).label }}</a-tag>
                <a-tag :color="getLevelTag(question.level).color">{{ getLevelTag(question.level).label }}</a-tag>
                <a-tag :color="getStatusTag(question.status).color">{{ getStatusTag(question.status).label }}</a-tag>
              </a-space>
                <span class="title">{{ question.title }}</span>
                <span class="score">{{ question.score }}</span>
            </div>
          </a-card>
        </div>
        <div class="right">
          <a-card title="附件">
            <div class="option" v-if="testpaper.files && testpaper.files.length" v-for="file in testpaper.files" :key="file.name">
              <a :href="file.path" target="__blank">{{ file.name }}</a>
            </div>
            <a-empty v-else description="无附件"></a-empty>
          </a-card>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import { createVNode, defineComponent, onBeforeMount, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { EditOutlined, BranchesOutlined, DisconnectOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons-vue";
import http from "../../../libs/http";
import { message, Modal } from "ant-design-vue";
import router from "../../../router";
import { getTypeTag, getLevelTag, getStatusTag } from "../../../components/admin/question/data";
export default defineComponent({
  setup() {
    const { params } = useRoute();
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
.testpaper_detail_card {
  height: 100%;
}
.testpaper_detail_card .body {
  height: 100%;
  display: flex;
  box-sizing: border-box;
}
.testpaper_detail_card .body .left {
  flex: 1;
  overflow: auto;
  padding: 24px;
}
.testpaper_detail_card .body .left .question {
  height: 40px;
  line-height: 40px;
  transition: all 0.3s;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0px 5px;
  cursor: pointer;
  position: relative;
}
.testpaper_detail_card .body .left .question:hover {
  background-color: #f3f3f3;
}
.testpaper_detail_card .body .left .question .score {
  float: right
}
.testpaper_detail_card .body .right {
  flex: 1;
  overflow: auto;
  box-sizing: border-box;
  padding: 24px;
  font-size: 18px;
}
.right .option {
  font-size: 16px;
  line-height: 30px;
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
