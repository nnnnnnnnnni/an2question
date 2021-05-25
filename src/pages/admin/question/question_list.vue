<template>
  <div class='question_list'>
    <div class="form">
      <SearchForm />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import SearchForm from '@/components/admin/question/search_form.vue'
export default defineComponent({
  setup() {},
  components: {
    SearchForm
  }
});
</script>


<style scoped>

</style>