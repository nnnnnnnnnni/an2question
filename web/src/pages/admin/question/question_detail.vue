<template>
  <div class='question_detail'>question_detail, params.id = {{id}}</div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import {useRoute} from 'vue-router'
export default defineComponent({
  setup() {
    const {params} = useRoute();
    return {
      id: params.id,
    }
  } 
});
</script>


<style scoped>

</style>