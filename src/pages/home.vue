<template>
  <div class="home">
    优学
    <div>
      <a-button type="primary">
        <router-link to="/admin">管理端</router-link>
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup(props) {
    const count = ref(0);
    return { count };
  },
});
</script>
