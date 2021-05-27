<template>
  <div class="navbar">
    <div class="container">
      <div class="container-item">
        <a-avatar shape="circle" size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      </div>
      <div class="container-item">
        <MessageOutlined style="font-size: 20px"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import img from "@/assets/logo.png";
import { MessageOutlined } from "@ant-design/icons-vue";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      img: img,
    };
  },
  components: { MessageOutlined },
  setup() {},
});
</script>

<style scoped>
.navbar {
  padding: 12px 20px;
  box-sizing: border-box;
}
.container {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row-reverse;
}
.container .container-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  margin: 0px 10px;
  cursor: pointer;
}
</style>
