<template>
  <div class='question_list'>
    <div class="form">
      <SearchForm />
    </div>
    <div class="table">
      <List />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import SearchForm from '@/components/admin/question/search_form.vue'
import List from '@/components/admin/question/list.vue'
export default defineComponent({
  setup() {},
  components: {
    SearchForm,
    List
  }
});
</script>


<style scoped>
.form {
  margin-bottom: 20px;
}
</style>