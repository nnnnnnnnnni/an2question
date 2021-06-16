<template>
  <div class="navbar">
    <div class="container">
      <div class="container-item">
        <a-avatar shape="circle" size="large" :src="store.state?.user?.avator">{{ store.state?.user?.name }}</a-avatar>
      </div>
      <div class="container-item container-icon" @click="logout">
        <LoginOutlined style="font-size: 20px" />
      </div>
      <div class="container-item container-icon" @click="goMessage">
        <MessageOutlined style="font-size: 20px" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MessageOutlined, LoginOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { defineComponent } from "vue";
import http from "../../libs/http";
import router from "../../router";
import store from "../../vuex/index";
export default defineComponent({
  setup() {
    const logout = () => {
      http.post("/logout", {}).then((res) => {
        if (res.code == 1) {
          message.success(res.message || "");
          const timer = setTimeout(() => {
            router.push({ name: "LOGIN" });
            clearTimeout(timer);
          }, 500);
        }
      });
    };
    const goMessage = () => {
      return router.push('/admin/setting/message')
    }
    return {
      logout,
      goMessage,
      store,
    };
  },
  components: { MessageOutlined, LoginOutlined },
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
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 5px;
}
.container-icon:hover {
  background-color: #e5e5e5;
}
.container-icon {
  margin: 0 5px;
}
</style>
