<template>
  <div class='testpaper_add'>
    <AddForm />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import AddForm from '@/components/admin/testpaper/add_form.vue'
export default defineComponent({
  setup() {},
  components: {
    AddForm
  }
});
</script>


<style scoped>
.testpaper_add {
  display: flex;
  justify-content: center;
}
</style>