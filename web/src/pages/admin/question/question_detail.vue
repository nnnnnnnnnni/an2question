<template>
  <div class="question_detail">
    <a-card :title="question._title" :headStyle='headerStyle' class="question_detail_card">
      <template #extra>
        <a-space>
          <a-button type="primary" v-if="question.status != 3"> <EditOutlined /> 编辑 </a-button>
          <a-button type="primary" v-if="question.status == 1"> <BranchesOutlined /> 发布 </a-button>
          <a-button type="primary" v-if="question.status == 2"> <DisconnectOutlined /> 取消发布 </a-button>
          <a-button type="danger" v-if="question.status != 3"> <DeleteOutlined /> 删除 </a-button>
        </a-space>
      </template>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { EditOutlined, BranchesOutlined, DisconnectOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import http from "../../../libs/http";
export default defineComponent({
  setup() {
    const { params } = useRoute();
    const question = reactive({});
    const getDetail = () => {
      http.get(`/question/${params.id}`, {}).then((res) => {
        res.data._title = `${res.data.title} [${res.data.score}分]`
        return Object.assign(question, res.data);
      });
    };
    const headerStyle = reactive({
      fontWeight: 600
    })
    onMounted(async() => await getDetail());
    return {
      id: params.id,
      getDetail,
      question,
      headerStyle
    };
  },
  components: {
    EditOutlined,
    BranchesOutlined,
    DisconnectOutlined,
    DeleteOutlined
  },
});
</script>

<style scoped>
.question_detail {
  background-color: transparent !important;
}
.question_detail_card {
  width: 80%;
  min-width: 800px;
  margin: 0 auto;
}
</style>
