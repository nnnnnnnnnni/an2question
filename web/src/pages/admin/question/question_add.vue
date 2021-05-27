<template>
  <div class='question_add'>
    <AddForm />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import AddForm from '@/components/admin/question/add_form.vue'
export default defineComponent({
  setup() {},
  components: {
    AddForm
  }
});
</script>


<style scoped>
.question_add {
  display: flex;
  justify-content: center;
}
</style>