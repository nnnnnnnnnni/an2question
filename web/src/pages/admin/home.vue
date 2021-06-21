<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsed>
      <Menu :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <Navbar />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view class="content-view shake" />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import Menu from "../../components/admin/menu.vue";
import Navbar from "../../components/admin/nav.vue";
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
export default defineComponent({
  components: {
    Menu,
    Navbar,
  },
  setup() {
    const collapsed = ref<boolean>(false);
    onMounted(() => {
      if (document.body.clientWidth < 1110) {
        collapsed.value = true;
      } else {
        collapsed.value = false;
      }
      window.addEventListener("resize", (e) => {
        if (document.body.clientWidth < 1110 && !collapsed.value) {
          collapsed.value = true;
        } else if (document.body.clientWidth > 1110 && collapsed.value) {
          collapsed.value = false;
        }
      });
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", () => {});
    });
    return {
      collapsed,
    };
  },
});
</script>
<style scoped>
.header {
  background: #fff;
  padding: 0;
  z-index: 2;
  box-shadow: 0 2px 8px #f0f1f2;
}
.content {
  padding: 20px;
  overflow-x: auto;
  overflow-y: auto;
  height: calc(100vh - 64px);
  min-width: 900px;
}
.content-view {
  background-color: #fff;
  box-shadow: 0px, 5px 12px 4px rgba(0, 0, 0, 0.09);
  box-sizing: border-box;
  padding: 20px;
}
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  0% {
    opacity: 0.3;
    transform: translateX(50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
