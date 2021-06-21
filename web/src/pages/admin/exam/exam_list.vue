<template>
  <div class="exam_list">
    <div class="form">
      <SearchForm />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchForm from "@/components/admin/exam/search_form.vue";
export default defineComponent({
  setup() {},
  components: { SearchForm },
});
</script>

<style scoped>
.form {
  margin-bottom: 20px;
}
</style>
