<template>
  <div class="home">
    home page1,{{ count }}, <a-button @click="count++">123</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const count = ref(0);
    return count;
  },
});
</script>
