<template>
  <div>
    <h1>Enter your credentials to login here.</h1>
    <login-box />
  </div>
</template>
<script>
  import LoginBox from '../partials/LoginBox.vue'
  export default {
    data () {
      return {
      }
    },
    components: {
      LoginBox,
    },
  }
</script>
