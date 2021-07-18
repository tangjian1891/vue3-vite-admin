<template>
  <div>
    <input type="text"  v-model="data.text" />
    这是什么啊
  </div>
</template>
  <script   setup>
import { reactive, toRefs, onMounted } from 'vue';

const data = reactive({
  text: ""
})
</script>
 <style lang='scss' scoped>
</style>