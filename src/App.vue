<template>
  <div id="app">
    <el-menu default-active="1" mode="horizontal" router>
      <el-menu-item index="/"><img src="/static/horizontal.png" height="18"/></el-menu-item>
      <template v-if="logged_in">
        <el-menu-item index="/list">Reports list</el-menu-item>
      </template>
      <template v-else>
        <el-menu-item index="/login">Login</el-menu-item>
        <el-menu-item index="/create">Create an account</el-menu-item>
      </template>
    </el-menu>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      logged_in: false,
    }
  },
}
</script>

<style lang="stylus" scoped>
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #2c3e50

    margin 10px auto
    max-width 1200px

    .el-form-item.is-required
    .el-form-item__label:before
      content "*"
      color #ff4949
      margin-right 4px
</style>
