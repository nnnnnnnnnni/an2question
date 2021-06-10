<template>
  <div class="setting-menu">
    <div class="setting-container">
      <div class="slider" :style="{ top: `${10 + (activeTab - 1) * 60}px` }"></div>
      <div class="setting-item">
        <router-link :class="activeTab == 1 ? 'setting-item-active' : ''" to="/admin/setting/base">基本设置</router-link>
      </div>
      <div class="setting-item">
        <router-link :class="activeTab == 2 ? 'setting-item-active' : ''" to="/admin/setting/password">修改密码</router-link>
      </div>
      <div class="setting-item">
        <router-link :class="activeTab == 3 ? 'setting-item-active' : ''" to="/admin/setting/message">消息中心</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  setup() {
    const activeTab = ref<number>(1);
    const route = useRoute();
    onBeforeMount(() => {
      activeTab.value = Number(route.meta.tab) || 1;
    });
    watch(
      () => route.meta.tab,
      (key) => (activeTab.value = Number(key))
    );
    return {
      activeTab,
    };
  },
});
</script>

<style scoped>
.setting-menu {
  width: 100%;
  height: calc(100% - 40px);
  box-sizing: border-box;
  margin: 20px 0px;
  padding: 0px 20px;
  border-right: 1px solid #e3e3e3;
}
.setting-menu .setting-container {
  position: relative;
}
.slider {
  height: 40px;
  width: 140px;
  border-radius: 10px;
  left: 10px;
  transition: all 0.3s;
  position: absolute;
  background-color: #e6f7ff;
  z-index: 1;
}
.setting-item {
  position: relative;
  height: 60px;
  line-height: 60px;
  text-align: center;
  z-index: 2;
  transition-delay: 0.3s;
}
.setting-item-active {
  color: #1890ff !important;
  font-weight: 600;
}
a {
  display: block;
  text-decoration: none;
  color: #333;
}
</style>
