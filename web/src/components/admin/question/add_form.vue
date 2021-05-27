<template>
  <a-form style="width: 800px" :labelCol="labelCol" :wrapperCol="wrapperCol">
    <a-form-item label="题型" required>
      <a-radio-group v-model:value="formState.type">
        <a-radio v-for="item in type" :key="item.key" :value="item.key">{{ item.label }}</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="等级" required>
      <a-radio-group v-model:value="formState.level">
        <a-radio v-for="item in level" :key="item.key" :value="item.key">{{ item.label }}</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="标题" required>
      <a-input v-model:value="formState.title" />
    </a-form-item>
    <a-form-item label="正文" required>
      <div id="body"></div>
    </a-form-item>
    <a-form-item label="分值" required>
      <a-input v-model:value="formState.score" type="number"></a-input>
    </a-form-item>
    <a-form-item label="答题次数" required>
      <a-input v-model:value="formState.answerTime" type="number"></a-input>
    </a-form-item>
    <a-form-item label="判题因素" required>
      <a-checkbox-group v-model:value="options">
        <a-checkbox value="isCase">区分大小写</a-checkbox>
        <a-checkbox value="isSpace">区分空格</a-checkbox>
        <a-checkbox value="isKeywords">按点得分</a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item :label="formState.type != 4 ? '答案' : '示例'" required>
      <a-form-item v-if="formState.type == 1">
        <a-space>
          <a-radio-group v-model:value="formState.answer">
            <a-space direction="vertical">
              <a-radio style="height: 32px" value="A">A</a-radio>
              <a-radio style="height: 32px" value="B">B</a-radio>
              <a-radio style="height: 32px" value="C">C</a-radio>
              <a-radio style="height: 32px" value="D">D</a-radio>
            </a-space>
          </a-radio-group>
          <div>
            <a-input />
            <a-input />
            <a-input />
            <a-input />
          </div>
        </a-space>
      </a-form-item>
      <a-form-item v-else-if="formState.type == 2">
        <a-space>
          <a-checkbox-group v-model:value="formState.answer">
            <a-space direction="vertical">
              <a-checkbox style="height: 32px; width: 50px" value="A">A</a-checkbox>
              <a-checkbox style="height: 32px; width: 50px" value="B">B</a-checkbox>
              <a-checkbox style="height: 32px; width: 50px" value="C">C</a-checkbox>
              <a-checkbox style="height: 32px; width: 50px" value="D">D</a-checkbox>
            </a-space>
          </a-checkbox-group>
          <div>
            <a-input />
            <a-input />
            <a-input />
            <a-input />
          </div>
        </a-space>
      </a-form-item>
      <a-form-item v-else-if="formState.type == 3">
        <a-textarea :autosize="{ minRows: 3, maxRows: 6 }" style="display: block; width: 666.66px"></a-textarea>
      </a-form-item>
      <a-form-item v-for="(example, index) in formState.examples" :key="index" v-else>
        <a-space>
          <a-textarea v-model:value="example.input" placeholder="输入" style="margin-right: 8px" />
          <a-textarea v-model:value="example.output" placeholder="输出" style="margin-right: 8px" />
          <MinusCircleOutlined v-if="formState.examples.length > 1" class="dynamic-delete-button" @click="removeCodeExample(example)" />
        </a-space>
      </a-form-item>
      <a-form-item v-if="formState.type == 4">
        <a-button type="dashed" @click="addCodeExample" :disabled="formState.examples.length > 3"> <PlusOutlined />Add Example </a-button>
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
import { defineComponent, onMounted, reactive, toRaw, UnwrapRef, ref } from "vue";
import { clearObj } from "../../../libs/utils";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import E from "wangeditor";
export default defineComponent({
  setup() {
    const formState: UnwrapRef<IQuestion> = reactive({
      title: undefined,
      type: 1,
      level: 1,
      status: 1,
      score: 10,
      answerTime: 1,
      options: {
        isSpace: false,
        isCase: false,
        isKeywords: false,
      },
      answer: "A",
      examples: [],
    });
    const options = ref<string[]>([]);
    const removeCodeExample = (item: any) => {
      let index = formState.examples.indexOf(item);
      if (index !== -1) {
        formState.examples.splice(index, 1);
      }
    };
    const addCodeExample = () => {
      formState.examples.push({ input: "", output: "" });
    };
    onMounted(() => {
      const editor = new E("#body");
      editor.config.menus = ["head", "bold", "italic", "strikeThrough", "indent", "lineHeight", "foreColor", "link", "list", "justify", "emoticon", "image", "table", "code"];
      editor.create();
    });

    const onSubmit = () => {
      console.log("submit!", toRaw(formState), clearObj(toRaw(formState), true));
    };
    return {
      labelCol: { span: 3 },
      wrapperCol: { span: 20, offset: 1 },
      formState,
      options,
      onSubmit,
      type,
      level,
      addCodeExample,
      removeCodeExample,
    };
  },
  components: {
    MinusCircleOutlined,
    PlusOutlined,
  },
});
</script>

<style scoped></style>
