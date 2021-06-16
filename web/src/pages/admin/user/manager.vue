<template>
  <div class="manager">
    <div class="form">
      <SearchForm />
    </div>
    <div class="list">
      list
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchForm from "@/components/admin/user/search_form.vue";
export default defineComponent({
  components: { SearchForm },
  setup() {},
});
</script>

<style scoped>
.form {
  margin-bottom: 20px;
}
</style>
