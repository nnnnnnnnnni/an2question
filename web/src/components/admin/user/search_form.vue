<template>
  <div class="search_form">
    <a-form layout="inline">
      <a-form-item>
        <a-input v-model:value="formState.key" placeholder="名称 / 邮箱" allowClear />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" @click="search">
            <template #icon> <SearchOutlined /></template>搜索
          </a-button>
          <a-button type="primary" @click="add">
            <template #icon> <PlusOutlined /></template>批量新增
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>
    <a-modal v-model:visible="visible" title="批量生成" @ok="handleAddOk" okText="确认添加" cancelText="取消" :confirmLoading="btnLoading">
      <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 17, offset: 1 }" :model="addFormState" :rules="formRules" ref="formRef">
        <a-form-item label="名称/邮箱前缀" required :help="addFormState.name ? `格式: ${addFormState.name}[xxx]@qq.com` : ''" name="name">
          <a-input v-model:value="addFormState.name" allowClear />
        </a-form-item>
        <a-form-item
          label="生成个数"
          required
          name="count"
          :help="addFormState.count == 1 ? `示例: ${addFormState.name}0@qq.com` : `示例: ${addFormState.name}0@qq.com ~ ${addFormState.name}${addFormState.count - 1}@qq.com`"
        >
          <a-input-number v-model:value="addFormState.count" allowClear style="width: 100%" />
        </a-form-item>
        <a-form-item label="通用密码" required name="password">
          <a-input-password v-model:value="addFormState.password" allowClear />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { SearchOutlined, UndoOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, UnwrapRef, ref, toRaw } from "vue";
import http from "../../../libs/http";
import { ValidateErrorEntity } from "ant-design-vue/lib/form/interface";
import { IOptions, IAddOptions } from "./data";
import { message } from "ant-design-vue";
export default defineComponent({
  setup(_, context) {
    const formRef = ref();
    const formState: UnwrapRef<IOptions> = reactive({
      key: undefined,
    });
    const visible = ref<Boolean>(false);
    const addFormState: UnwrapRef<IAddOptions> = reactive({
      name: "",
      password: undefined,
      count: 1,
    });

    // 打开modal
    const add = () => {
      visible.value = true;
    };

    const btnLoading = ref<boolean>(false);
    // form 规则
    const formRules = {
      name: [{ required: true, message: "请输入标题", trigger: "change" }],
      password: [
        { required: true, message: "请输入密码", trigger: "change" },
        { min: 6, message: "密码长度不少于6", trigger: "change" },
      ],
      count: [
        { required: true, type: "number", message: "请输入生成个数", trigger: "change" },
        { min: 1, message: "生成个数必须大于1", type: "number", trigger: "change" },
        { max: 99, message: "生成个数必须小于99", type: "number", trigger: "change" },
      ],
    };
    // modal-ok
    const handleAddOk = () => {
      formRef.value
        .validate()
        .then(async () => {
          btnLoading.value = true;
          http.post('/manager/insert', toRaw(addFormState)).then(res => {
            Object.assign(addFormState, {
              name: '',
              password: '',
              count: 1,
            })
            visible.value = false;
            btnLoading.value = false;
            return message.success(res.message || '新建成功，请刷新页面！');
          })
        })
        .catch((error: ValidateErrorEntity<IAddOptions>) => {
          console.log(error);
        });
    };
    const search = () => {
      context.emit("search", formState);
    };
    return {
      formState,
      addFormState,
      visible,
      btnLoading,
      formRef,
      formRules,
      add,
      search,
      handleAddOk,
    };
  },
  components: {
    SearchOutlined,
    UndoOutlined,
    PlusOutlined,
  },
});
</script>

<style scoped></style>
