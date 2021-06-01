<template>
  <a-form
    style="width: 800px"
    :labelCol="{ span: 3 }"
    :wrapperCol="{ span: 20, offset: 1 }"
    :model="formState"
    :rules="formRules"
    ref="formRef"
  >
    <a-form-item label="题型" required>
      <a-radio-group v-model:value="formState.type" @change="typeChange">
        <a-radio v-for="item in type" :key="item.key" :value="item.key">{{ item.label }}</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="等级" required>
      <a-radio-group v-model:value="formState.level">
        <a-radio v-for="item in level" :key="item.key" :value="item.key">{{ item.label }}</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="标题" required name="title">
      <a-input v-model:value="formState.title" />
    </a-form-item>
    <a-form-item label="正文" required name="body">
      <div id="body"></div>
    </a-form-item>
    <a-form-item label="分值" required name="score">
      <a-input-number :min="1" v-model:value="formState.score"></a-input-number>
    </a-form-item>
    <a-form-item label="答题次数" required name="answerTime">
      <a-input-number :min="1" v-model:value="formState.answerTime"></a-input-number>
    </a-form-item>
    <a-form-item label="判题因素">
      <a-checkbox-group v-model:value="factors" @change="optionsChange">
        <a-checkbox value="isCase">区分大小写</a-checkbox>
        <a-checkbox value="isSpace">区分空格</a-checkbox>
        <a-checkbox value="isWidth">区分全半角</a-checkbox>
        <a-checkbox value="isKeywords" v-if="formState.type == 3">按点得分</a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item :label="formState.type != 4 ? '答案' : '示例'" required>
      <a-form-item v-if="formState.type == 1" :wrapperCol="{ span: 24 }">
        <a-space direction="vertical" style="width: 100%">
          <a-radio-group v-model:value="formState.answer" style="width: 100%">
            <a-space direction="vertical" style="width: 100%">
              <a-radio
                v-for="(option, index) in formState.options"
                :key="index"
                :value="option.key"
                style="margin: 0; width: 80%"
              >
                {{ option.key }}
                <a-input v-model:value="option.val" style="margin-left: 10px" />
                <a-space style="margin-left: 10px">
                  <MinusCircleOutlined
                    v-if="formState.options.length == index + 1 && formState.options.length > 1"
                    class="dynamic-delete-button"
                    @click="removeOption"
                  />
                  <PlusCircleOutlined
                    v-if="formState.options.length == index + 1 && formState.options.length < 4"
                    class="dynamic-delete-button"
                    @click="addOption"
                  />
                </a-space>
              </a-radio>
            </a-space>
          </a-radio-group>
        </a-space>
      </a-form-item>
      <a-form-item v-else-if="formState.type == 2" :wrapperCol="{ span: 24 }">
        <a-checkbox-group v-model:value="formState.answer" style="width: 100%">
          <a-row align="middle" justify="center" v-for="(option, index) in formState.options" :key="index" style="margin-bottom: 8px">
            <a-col :span="2">
              <a-checkbox :value="option.key" style="margin: 0; width: 80%">
                {{ option.key }}
              </a-checkbox>
            </a-col>
            <a-col :span="18" :offset="1">
              <a-input v-model:value="option.val" />
            </a-col>
            <a-col :span="2" :offset="1">
              <a-space>
                <MinusCircleOutlined
                  v-if="formState.options.length == index + 1 && formState.options.length > 1"
                  class="dynamic-delete-button"
                  @click="removeOption"
                />
                <PlusCircleOutlined
                  v-if="formState.options.length == index + 1 && formState.options.length < 4"
                  class="dynamic-delete-button"
                  @click="addOption"
                />
              </a-space>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item v-else-if="formState.type == 3">
        <a-textarea
          style="display: block; width: 666.66px"
          v-model:value="formState.answer"
          :placeholder="formState.factor.isKeywords ? placeholder : ''"
        ></a-textarea>
      </a-form-item>
      <a-form-item v-for="(example, index) in formState.examples" :key="index" v-else :wrapperCol="{ span: 24 }">
        <a-row justify="center" align="center">
          <a-col :span="10">
            <a-textarea v-model:value="example.input" placeholder="输入" style="margin-right: 8px" />
          </a-col>
          <a-col :span="10" :offset="1">
            <a-textarea v-model:value="example.output" placeholder="输出" style="margin-right: 8px" />
          </a-col>
          <a-col :span="2" :offset="1">
            <MinusCircleOutlined class="dynamic-delete-button" @click="removeCodeExample(example)" />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item v-if="formState.type == 4">
        <a-button type="dashed" @click="addCodeExample" :disabled="formState.examples.length > 3">
          <PlusOutlined />Add Example
        </a-button>
      </a-form-item>
    </a-form-item>
    <a-form-item :wrapperCol="{ span: 13, offset: 11 }">
      <a-space>
        <a-button type="primary" @click="onSubmit">保存</a-button>
        <a-button type="primary" @click="onSubmit">发布</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { type, level, IQuestion } from "./data";
import { defineComponent, onMounted, reactive, toRaw, UnwrapRef, ref, watch } from "vue";
import { MinusCircleOutlined, PlusOutlined, PlusCircleOutlined } from "@ant-design/icons-vue";
import E from "wangeditor";
import { useRoute } from "vue-router";
import { ValidateErrorEntity } from "ant-design-vue/lib/form/interface";
export default defineComponent({
  setup() {
    const route = useRoute();
    const query = route.query["type"];
    const formRef = ref();
    const formState: UnwrapRef<IQuestion> = reactive({
      title: undefined,
      type: 2,
      level: 1,
      status: 1,
      score: 10,
      body: "",
      answerTime: 1,
      factor: {
        isSpace: false,
        isCase: false,
        isKeywords: false,
        isWidth: false,
      },
      options: [
        { key: "A", val: "" },
        { key: "B", val: "" },
      ],
      answer: "A",
      examples: [],
    });
    const formRules = {
      title: [{ required: true, message: "请输入标题", trigger: "change" }],
      body: [{ required: true, message: "请输入正文", trigger: "change" }],
      score: [
        { required: true, message: "请输入分数", type: "number", trigger: "change" },
        { min: 1, message: "分数必须大于1", type: "number", trigger: "change" },
      ],
      answerTime: [
        { required: true, message: "请输入答题次数", type: "number", trigger: "change" },
        { min: 1, message: "答题次数必须大于1", type: "number", trigger: "change" },
      ],
    };

    // 答案初始化
    const typeChange = (e: any) => {
      const val = e.target.value;
      if (val == 1) {
        formState.answer = "A";
      } else if (val == 2) {
        formState.answer = ["A"];
      } else {
        formState.answer = "";
      }
    };

    // 判题因素
    const factors = ref<string[]>([]);
    const optionsChange = (e: string[]) => {
      formState.factor.isSpace = e.includes("isSpace");
      formState.factor.isCase = e.includes("isCase");
      formState.factor.isKeywords = e.includes("isKeywords");
      formState.factor.isWidth = e.includes("isWidth");
    };

    const addOption = () => {
      formState.options.push({ key: String.fromCharCode(65 + formState.options.length), val: "" });
    };
    const removeOption = () => {
      formState.options.pop();
    };

    // 代码示例
    const removeCodeExample = (item: any) => {
      let index = formState.examples.indexOf(item);
      if (index !== -1) {
        formState.examples.splice(index, 1);
      }
    };
    const addCodeExample = () => {
      formState.examples.push({ input: "", output: "" });
    };

    // 填空题placeholder
    const placeholder = ref<string>(
      `关键字答案填写方式: "答案A,答案A分值.答案B,答案B分值." 例如: windows,10.linux,5.(关键词windows得分5分,linux得分五分)`
    );

    // 正文处用到的文本框
    let editor: E;
    onMounted(() => {
      editor = new E("#body");
      editor.config.menus = [
        "head",
        "bold",
        "italic",
        "strikeThrough",
        "indent",
        "lineHeight",
        "foreColor",
        "link",
        "list",
        "justify",
        "emoticon",
        "image",
        "table",
        "code",
      ];
      editor.config.onchange = (newHtml: string) => {
        formState.body = newHtml;
      };
      editor.create();
    });

    const onSubmit = () => {
      formState.body = editor.txt.html();
      formRef.value
        .validate()
        .then(() => {
          console.log(toRaw(formState));
          if (formState.type == 1) {
          } else if (formState.type == 2) {
          } else if (formState.type == 3) {
          } else {
          }
        })
        .catch((error: ValidateErrorEntity<IQuestion>) => {
          console.log("error", error);
        });
    };

    const answerChange = (e: any) => {
      console.log(e);
    };
    return {
      formState,
      formRules,
      factors,
      onSubmit,
      type,
      level,
      addCodeExample,
      removeCodeExample,
      addOption,
      removeOption,
      placeholder,
      optionsChange,
      typeChange,
      answerChange,
      formRef,
    };
  },
  components: {
    MinusCircleOutlined,
    PlusOutlined,
    PlusCircleOutlined,
  },
});
</script>

<style scoped>
.dynamic-delete-button {
  font-size: 20px;
}
</style>
