<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider>
      <Menu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <Navbar />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view class="content-view" />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import Menu from "@/components/admin/menu.vue";
import Navbar from "@/components/admin/nav.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    Menu,
    Navbar,
  },
  setup() {},
});
</script>
<style scoped>
.header {
  background: #fff;
  padding: 0;
  box-shadow: 0 2px 8px #f0f1f2;
}
.content {
  padding: 30px;
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100vh - 64px);
}
.content-view {
  background-color: #fff;
  box-shadow: 0px, 5px 12px 4px rgba(0, 0, 0, 0.09);
  box-sizing: border-box;
  padding: 20px;
}
</style>
