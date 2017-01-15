<template>
  <div id="app">
    <el-menu default-active="1" mode="horizontal" router>
      <el-menu-item index="/" class="logo"/>
      <template v-if="$root.isLoggedIn">
        <el-menu-item index="/report">Reports list</el-menu-item>
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

    .logo
      background-image url('/static/horizontal.png')
      background-repeat no-repeat
      background-size auto 18px
      background-position 16px 20px
      width 166px

    @media (max-width: 700px)
      .el-menu .el-menu-item
        font-size 12px
        vertical-align top
        padding 0 10px

      .logo
        background-image url('/static/icon.png')
        background-size auto 18px
        background-position 16px 20px
        width 50px

    .el-form-item.is-required
    .el-form-item__label:before
      content "*"
      color #ff4949
      margin-right 4px
</style>
