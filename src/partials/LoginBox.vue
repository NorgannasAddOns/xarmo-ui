<template>
  <div>
    <el-form :model="login" :rules="rules" ref="login" label-width="120px">
      <el-form-item label="Email address" prop="email">
        <el-input v-model="login.email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="password" v-model="login.password"></el-input>
      </el-form-item>
      <el-form-item label="">
        <mt-switch v-model="login.remember">Remember me</mt-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('login')">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        login: {
          email: '',
          password: '',
          remember: false,
        },
        rules: {
          email: [
            { type: 'email', required: true, message: 'Please enter the email address you registered with.', trigger: 'blur' },
            { min: 6, message: 'Your email address is too short.', trigger: 'blur' },
            { max: 128, message: 'Your email address is too long.', trigger: 'blur' },
          ],
          password: [
            { required: true, message: 'Please enter the password associated with your account.', trigger: 'blur' },
            { min: 7, message: 'Your password is too short.', trigger: 'blur' },
            { max: 128, message: 'Your password is too long.', trigger: 'blur' },
          ],
        }
      }
    },
    methods: {
      submitForm(refName) {
        const self = this
        this.$refs[refName].validate((valid) => {
          if (valid) {
            switch (refName) {
              case 'login':
                self.performLogin()
            }
          } else {
            return false
          }
        })
      },

      performLogin() {
        alert('TODO: Process login for:\n email: ' + this.login.email + '\n password: ' + this.login.password)
        this.$root.login(this.login.email, this.login.password)
      },
    }
  }
</script>
