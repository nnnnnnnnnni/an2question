<template>
  <div class="login">
    <div class="container">
      <div class="tabs container-item">
        <div class="tab" :class="{ tab_active: activeTab == 1 }" @click="changeTab(1)"><MailOutlined /> 邮箱</div>
        <div class="tab" :class="{ tab_active: activeTab != 1 }" @click="changeTab(2)"><PhoneOutlined /> 手机</div>
        <div class="slider" :style="{ left: activeTab == 1 ? '34px' : '188px' }" />
      </div>
      <div class="container-item2" :style="{ left: activeTab == 2 ? '0px' : '-360px' }">
        <div class="container-phone">
          <div class="container-item">
            <input type="text" v-model="formState.phone" placeholder="请输入手机号" />
          </div>
          <div class="container-item">
            <div class="code">
              <input placeholder="请输入验证码" />
              <span class="sendcode">发送验证码</span>
            </div>
          </div>
        </div>
        <div class="container-mail">
          <div class="container-item">
            <input type="text" v-model="formState.email" placeholder="请输入邮箱" />
          </div>
          <div class="container-item">
            <input type="password" v-model="formState.password" placeholder="请输入密码" />
          </div>
        </div>
      </div>
      <div class="container-item">
        <a-space>
          <a-button type="primary" @click="login">登录</a-button>
          <a-button type="primary" @click="register">注册</a-button>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, UnwrapRef } from "vue";
import { MailOutlined, PhoneOutlined, QuestionCircleOutlined } from "@ant-design/icons-vue";
import http from "../libs/http";
import { isEmail } from "../libs/utils";
import { message } from "ant-design-vue";
import { IUser } from "./interface";
import router from "../router";
import store from "../vuex";
export default defineComponent({
  setup() {
    const activeTab = ref<number>(1);
    const changeTab = (tab: number) => {
      activeTab.value = tab;
    };

    const formState: UnwrapRef<IUser> = reactive({});
    const login = () => {
      if (activeTab.value == 1) {
        if (formState.email && formState.password) {
          if (isEmail(formState.email)) {
            http
              .post("/login", {
                email: formState.email,
                password: formState.password,
              })
              .then((res) => {
                if(res.code == 1) {
                  message.success("登录成功");
                  store.commit('setUser', res.data)
                  router.push({ name: 'ADMIN_HOME' });
                } else {
                  return message.error(res.message);
                }
              });
          } else {
            message.error("邮箱格式错误");
          }
        } else {
          message.error("信息填写错误");
        }
      } else if (activeTab.value == 2) {
        message.warning("暂未开通手机号注册功能");
      } else {
        message.warning("暂未开通手机号注册功能");
      }
    };
    const register = () => {
      if (activeTab.value == 1) {
        if (formState.email && formState.password) {
          if (isEmail(formState.email)) {
            http
              .post("/register", {
                email: formState.email,
                password: formState.password,
              })
              .then((res) => {
                if (res.code == 1) {
                  message.success("注册成功");
                  store.commit('setUser', res.data)
                  router.push({ name: 'ADMIN_HOME' });
                } else {
                  return message.error(res?.message);
                }
              });
          } else {
            message.error("邮箱格式错误");
          }
        } else {
          message.error("信息填写错误");
        }
      } else if (activeTab.value == 2) {
        message.warning("暂未开通手机号注册功能");
      } else {
        message.warning("暂未开通手机号注册功能");
      }
    };
    return {
      changeTab,
      activeTab,
      formState,
      login,
      register,
    };
  },
  components: {
    MailOutlined,
    PhoneOutlined,
    QuestionCircleOutlined,
  },
});
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url("@/assets/login_bg1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login:after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: inherit;
  filter: blur(250px);
  z-index: 1;
}
input {
  display: block;
  box-sizing: border-box;
  padding: 0px 10px;
  outline: none;
  border: none;
  width: 80%;
  height: 40px;
  border-radius: 5px;
  color: #555;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.5px;
}
input::placeholder {
  font-weight: normal;
}
.container {
  z-index: 4;
  position: relative;
  width: 360px;
  height: 320px;
  box-sizing: border-box;
  padding: 20px 0px;
  overflow: hidden;
}
.container-item {
  height: 70px;
  width: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container-item2 {
  height: 140px;
  width: 360px;
  display: flex;
  position: relative;
  transition: all 0.3s;
}
.tabs {
  position: relative;
  display: flex;
  width: 300px;
  margin: 0 auto;
}
.tabs .slider {
  position: absolute;
  height: 1px;
  bottom: 10px;
  background-color: #40a9ff;
  transition: all 0.3s;
  width: 80px;
}
.tabs .tab {
  flex: 1;
  height: 100%;
  line-height: 70px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
}
.tab_active {
  color: #40a9ff;
}
.code {
  width: 80%;
  height: 40px;
  display: flex;
  border-radius: 5px;
  background-color: #fff;
}
.code input {
  flex: 1;
}
.code .sendcode {
  display: flex;
  align-items: center;
  font-size: 12px;
  height: 40px;
  width: 40px;
  padding-right: 10px;
  cursor: pointer;
  text-align: center;
  color: #000;
  user-select: none;
}
.tip {
  margin-left: 10px;
  color: #000;
  font-size: 12px;
  cursor: pointer;
}
</style>
