<template>
  <div>
    <svg-icon v-if="icon" icon-class="icon" />
    <span v-if="title" slot="title">{{title}}</span>
  </div>
</template>
  <script    >

export default {
  name: 'MenuItem',
  // functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}

</script>
 