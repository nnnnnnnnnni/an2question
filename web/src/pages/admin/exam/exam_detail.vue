<template>
  <div class="exam_detail">
    <a-card>
      <a-descriptions :title="exam.title" :column="2" :labelStyle="labelStyle">
        <a-descriptions-item label="注意事项" :span="2"> <div v-html="exam.note"></div> </a-descriptions-item>
        <a-descriptions-item label="可见范围">{{ getVisibleTag(exam.visible).label }}</a-descriptions-item>
        <a-descriptions-item label="类型">{{ getVisibleTag(exam.type).label }}</a-descriptions-item>
        <a-descriptions-item label="考试时间">
          <template v-if="exam.type == 1"> {{ moment(exam.startAt).format("YYYY-MM-DD HH:mm:ss") }} - {{ moment(exam.closeAt).format("YYYY-MM-DD HH:mm:ss") }} </template>
          <template v-else> -- </template>
        </a-descriptions-item>
        <a-descriptions-item label="时长">{{ exam.times }} 分钟</a-descriptions-item>
        <a-descriptions-item label="试卷"> {{ exam.testpaper }} </a-descriptions-item>
        <a-descriptions-item label="考试人员">
          <template v-for="item in exam.participants">
            <a-tooltip :title="item.name" placement="top">
              <a-avatar :src="`${item.avator ? '/api' : ''}${item.avator}`" style="margin-right: 10px" />
            </a-tooltip>
          </template>
        </a-descriptions-item>
        <template #extra>
          <a-space>
            <a-button type="primary" v-if="isNewInswert" @click="goAdd"> <EditOutlined /> 继续添加 </a-button>
            <a-button type="primary" v-if="exam.status == 1 || exam.status == 2" @click="goEdit"> <EditOutlined /> 编辑 </a-button>
            <a-button type="primary" v-if="exam.status == 1" @click="publish(2)"> <BranchesOutlined /> 发布 </a-button>
            <a-button type="primary" v-if="exam.status == 2" @click="publish(1)"> <DisconnectOutlined /> 取消发布 </a-button>
            <a-button type="danger" v-if="exam.status == 1 || exam.status == 2" @click="handleDelete"> <DeleteOutlined /> 删除 </a-button>
          </a-space>
        </template>
      </a-descriptions>
    </a-card>
  </div>
</template>

<script lang="ts">
import { createVNode, defineComponent, onBeforeMount, reactive, ref } from "vue";
import { ExclamationCircleOutlined, EditOutlined, BranchesOutlined, DisconnectOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import http, { isDev } from "../../../libs/http";
import { getVisibleTag, getTypeTag } from "../../../components/admin/exam/data";
import moment from "moment";
import { message, Modal } from "ant-design-vue";
import router from "../../../router";
export default defineComponent({
  setup() {
    const { params, query } = useRoute();
    const isNewInswert = ref<Boolean>(Object.keys(query).length > 0);
    const exam = reactive({});
    const getDetail = () => {
      http.get(`/exam/${params.id}`, {}).then((res) => {
        Object.assign(res.data, {
          testpaper: res.data.testpaper.title,
        });
        return Object.assign(exam, res.data);
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
          http.delete("/exam", { id: params.id }).then((res) => {
            message.success(String(res.message));
            return router.push("/admin/exam");
          });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    };
    const goEdit = () => {
      router.push({ name: "ADMIN_EXAM_EDIT", query: { id: params.id } });
    };
    const publish = (status: number) => {
      http.put("/exam/publish", { id: params.id, status: status }).then((res) => {
        message.success(`${status == 2 ? "" : "取消"}发布成功!`);
        getDetail();
      });
    };
    const goAdd = () => {
      router.push({ name: "ADMIN_EXAM_ADD" });
    };
    return {
      publish,
      handleDelete,
      goEdit,
      goAdd,
      labelStyle: {
        width: "100px",
      },
      isDev,
      moment,
      getVisibleTag,
      getTypeTag,
      exam,
      isNewInswert
    };
  },
  components: {
    ExclamationCircleOutlined,
    EditOutlined,
    BranchesOutlined,
    DisconnectOutlined,
    DeleteOutlined,
  },
});
</script>

<style scoped>
.exam_detail {
  margin: 0 auto;
  padding: 0 !important;
  background-color: transparent !important;
  width: 80%;
  min-width: 800px;
  height: 100%;
  overflow: hidden;
}
.ant-descriptions-header {
  padding-bottom: 20px !important;
  border-bottom: 1px solid #f0f0f0 !important;
}
</style>
