<template>
  <a-form style="width: 800px" :wrapperCol="{ span: 24 }" layout="vertical" :model="formState" :rules="formRules" ref="formRef">
    <a-row>
      <a-col :span="12">
        <a-form-item label="题目">
          <a-select
            show-search
            v-model:value="question"
            placeholder="输入题目名称搜索"
            :allowClear="true"
            :defaultActive-firstOption="false"
            :filterOption="false"
            :notFoundContent="null"
            @search="handleSearch"
            @change="handleChange"
          >
            <a-select-option
              v-for="question in questions"
              :key="`${question._id}::${question.type}::${question.score}::${question.level}::${question.title}`"
              :disabled="selectedQuestionKeys.includes(`${question._id}::${question.type}::${question.score}::${question.level}::${question.title}`)"
            >
              <a-space>
                <a-tag :color="getTypeTag(question.type).color">{{ getTypeTag(question.type).label }}</a-tag>
                <a-tag :color="getLevelTag(question.level).color">{{ getLevelTag(question.level).label }}</a-tag>
                <a-tag>{{ question.score }} 分</a-tag>
                <div>{{ question.title }}</div>
              </a-space>
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          name="questions"
          :label="`单选/多选/填空/代码/总分 : ${questionScores.choice} / ${questionScores.multi} / ${questionScores.blank} / ${questionScores.blank} / ${questionScores.allScore}`"
          v-if="selectedQuestions.length"
        >
          <div class="question"  v-for="question in selectedQuestions" :key="question._id">
            <div class="type">
              <a-tag :color="getTypeTag(question.type).color">{{ getTypeTag(question.type).label }}</a-tag>
            </div>
            <div class="level">
              <a-tag :color="getLevelTag(question.level).color">{{ getLevelTag(question.level).label }}</a-tag>
            </div>
            <div class="title" :title="question.title">{{ question.title }}</div>
            <div class="score">{{ question.score }} 分</div>
            <div class="close" @click="remove(question)"><CloseCircleOutlined style="font-size: 16px" /></div>
          </div>
        </a-form-item>
          <a-empty v-else description="尚未选择题目"></a-empty>
      </a-col>
      <a-col :span="10" :offset="2">
        <a-form-item label="标题" required name="title">
          <a-input v-model:value="formState.title" :maxlength="15" placeholder="标题最长15位" />
        </a-form-item>
        <a-form-item label="附件">
          <a-upload :fileList="fileList" :remove="handleRemove" :before-upload="beforeUpload">
            <a-button type="primary"> <UploadOutlined /> 选择文件 </a-button>
          </a-upload>
          <div class="file" v-for="(file, i) in formState.files" :key="i">
            <span><PaperClipOutlined style="color: rgba(0, 0, 0, 0.45)" /></span>
            <span class="filename">{{ file.name }}(已存在)</span>
            <span class="delfile" @click="removeOwnedFile(i)">
              <DeleteOutlined style="color: rgba(0, 0, 0, 0.45)" />
            </span>
          </div>
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="onSubmit(1)" :loading="loading">保存</a-button>
            <a-button type="primary" @click="onSubmit(2)" :loading="loading">发布</a-button>
          </a-space>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts">
import { CloseCircleOutlined, UploadOutlined, PaperClipOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { defineComponent, reactive, UnwrapRef, ref, nextTick, toRaw } from "vue";
import http from "../../../libs/http";
import { IOptions, getTypeTag, getLevelTag, IFileItem, IQuestion } from "../question/data";
import { ValidateErrorEntity } from "ant-design-vue/lib/form/interface";
import router from "../../../router";
import { useRoute } from "vue-router";
interface IOptionsExtra extends IOptions {
  score?: number;
  id?: string;
  title: string;
}
interface IFormState {
  title?: string;
  files: string[];
  questions: string[];
  status: number;
}
export default defineComponent({
  setup() {
    const formRef = ref();
    const mode = ref(1); // 1: add | 2: edit
    const formState: UnwrapRef<IFormState> = reactive({
      files: [],
      questions: [],
      title: undefined,
      status: 1,
    });
    const questionScores = reactive({
      choice: 0,
      multi: 0,
      blank: 0,
      code: 0,
      allScore: 0,
    });
    const loading = ref(false);
    const question = ref<string>();
    const questions = reactive([]);
    const selectedQuestionKeys = ref<string[]>([]);
    const selectedQuestions: UnwrapRef<IOptionsExtra[]> = reactive([]);

    // 搜索选择题目
    const requestQuestion = (e: string) => {
      http
        .get("/question", {
          page: 1,
          count: 10,
          options: {
            title: e,
            status: 5,
          },
        })
        .then((res) => {
          return Object.assign(questions, res.data.questions);
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
    const handleChange = (e: string) => {
      const data = e;
      const [id, type, score, level, title] = data.split("::");
      if (!selectedQuestionKeys.value.includes(e)) {
        selectedQuestionKeys.value.push(e);
        selectedQuestions.push({
          id: id,
          type: Number(type),
          score: Number(score),
          level: Number(level),
          title: title,
        });
        if (type == "1") {
          questionScores.choice += Number(score);
        } else if (type == "2") {
          questionScores.multi += Number(score);
        } else if (type == "3") {
          questionScores.blank += Number(score);
        } else {
          questionScores.code += Number(score);
        }
        questionScores.allScore += Number(score);
        nextTick(() => {
          question.value = undefined;
          if (questions.length == 1) questions.length = 0;
        });
      }
    };
    const remove = (question: IOptionsExtra) => {
      const key = `${question.id}::${question.type}::${question.score}::${question.level}::${question.title}`;
      const i = selectedQuestionKeys.value.indexOf(key);
      selectedQuestionKeys.value.splice(i, 1);
      selectedQuestions.forEach((item, i) => {
        if (item.id == question.id) {
          selectedQuestions.splice(i, 1);
        }
      });
      if (question.type == 1) {
        questionScores.choice -= Number(question.score);
      } else if (question.type == 2) {
        questionScores.multi -= Number(question.score);
      } else if (question.type == 3) {
        questionScores.blank -= Number(question.score);
      } else {
        questionScores.code -= Number(question.score);
      }
      questionScores.allScore -= Number(question.score);
    };

    // form 规则
    const formRules = {
      title: [{ required: true, message: "请输入标题", trigger: "change" }],
      questions: [
        {
          validator: async () => {
            if (selectedQuestions.length == 0) {
              return Promise.reject("请选择题目");
            }
          },
          trigger: "change",
        },
      ],
    };

    // 附件相关
    const fileList = ref<IFileItem[]>([]);
    const beforeUpload = (file: IFileItem) => {
      if (file.size && file.size > 1024 * 1024 * 50) {
        return message.error("文件过大，无法上传！");
      }
      fileList.value = [file, ...fileList.value];
      return false;
    };
    const handleRemove = (file: IFileItem) => {
      const index = fileList.value.indexOf(file);
      const newFileList = fileList.value.slice();
      newFileList.splice(index, 1);
      fileList.value = newFileList;
    };
    const handleUpload = (): Promise<void> => {
      return new Promise((reslove, reject) => {
        const formData = new FormData();
        fileList.value.forEach((file: IFileItem) => {
          formData.append("files[]", file as any);
        });
        http.post("/testpaper/upload", formData).then((res) => {
          const files = res.data as never[];
          formState.files.push(...files);
          reslove();
        });
      });
    };
    const removeOwnedFile = (i: number) => {
      const newFileList = formState.files.slice();
      newFileList.splice(i, 1);
      formState.files = newFileList;
    };

    const onSubmit = (status: number) => {
      formState.status = status;
      formRef.value
        .validate()
        .then(async () => {
          loading.value = true;
          formState.questions.length = 0;
          selectedQuestionKeys.value.forEach((key) => {
            formState.questions.push(key.split("::")[0]);
          });
          if (fileList.value.length) await handleUpload();
          if (mode.value == 1) {
            http.post("/testpaper", toRaw(formState)).then((res) => {
              message.success("新增成功! 即将跳转......");
              loading.value = false;
              const timer = setTimeout(() => {
                router.push(`/admin/testpaper/${res.data._id}?type=newadd`);
                clearTimeout(timer);
              }, 500);
            });
          } else {
            http.put("/testpaper", toRaw(formState)).then((res) => {
              message.success("更新成功! 即将跳转......");
              loading.value = false;
              const timer = setTimeout(() => {
                router.push(`/admin/testpaper/${query}?type=newadd`);
                clearTimeout(timer);
              }, 500);
            });
          }
        })
        .catch((error: ValidateErrorEntity<IOptionsExtra>) => {
          console.log("error", error);
        });
    };

    // 处理新增、编辑切换
    const route = useRoute();
    const query = route.query["id"];
    if (query) {
      mode.value = 2;
      http.get(`/testpaper/${query}`, {}).then((res) => {
        questionScores.choice = res.data.choiceScore;
        questionScores.multi = res.data.multiScore;
        questionScores.blank = res.data.blankScore;
        questionScores.code = res.data.codeScore;
        questionScores.allScore = res.data.allScore;
        res.data.questions.forEach((question: IQuestion) => {
          selectedQuestionKeys.value.push(`${question._id}::${question.type}::${question.score}::${question.level}::${question.title}`);
          selectedQuestions.push({
            id: question._id,
            type: question.type,
            score: question.score,
            level: question.level,
            title: String(question.title),
          });
        });
        res.data.questions = res.data.questions.map((question: IQuestion) => question._id)
        Object.assign(formState, res.data);
      });
    }

    return {
      formRef,
      loading,
      formState,
      formRules,
      questions,
      question,
      questionScores,
      remove,
      handleSearch,
      handleChange,
      selectedQuestions,
      selectedQuestionKeys,
      getTypeTag,
      getLevelTag,
      fileList,
      beforeUpload,
      handleRemove,
      removeOwnedFile,
      onSubmit,
    };
  },
  components: {
    CloseCircleOutlined,
    UploadOutlined,
    PaperClipOutlined,
    DeleteOutlined,
  },
});
</script>

<style scoped>
.question {
  position: relative;
  width: 100%;
  height: 33px;
  box-sizing: border-box;
  padding: 5px 5px;
  line-height: 23px;
  border-radius: 5px;
  margin-bottom: 5px;
  transition: all 0.3s;
  cursor: pointer;
  overflow: hidden;
}
.question:hover {
  background-color: #f3f3f3;
}
.title {
  max-width: 240px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  float: left;
}
.question .level,
.type {
  float: left;
}
.question .score {
  float: right;
  transition: all 0.3s;
}
.question .close {
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s;
  width: 33px;
  height: 33px;
  line-height: 33px;
  text-align: center;
}
.question:hover .score {
  display: none;
}
.question:hover .close {
  right: 12px;
}
.close:hover {
  color: red;
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
