<template>
  <div class="setting">
    <div class="left">
      <Menu />
    </div>
    <div class="right">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Menu from "../../../components/admin/setting/menu.vue";
export default defineComponent({
  setup() {},
  components: {
    Menu,
  },
});
</script>

<style scoped>
.setting {
  height: 100%;
  overflow: hidden;
  display: flex;
}
.left {
  width: 200px;
  height: 100%;
}
.right {
  flex: 1;
  min-width: 600px;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
}
</style>
