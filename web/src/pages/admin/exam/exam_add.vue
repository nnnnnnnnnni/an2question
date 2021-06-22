<template>
  <div class='exam_add'>
    <AddForm />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import AddForm from '@/components/admin/exam/add_form.vue'
export default defineComponent({
  setup() {},
  components: {
    AddForm
  }
});
</script>


<style scoped>
.exam_add {
  display: flex;
  justify-content: center;
}
</style>