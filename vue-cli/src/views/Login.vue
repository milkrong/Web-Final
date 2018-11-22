<template>
    <div class="login">
        <div class="container fill">
            <div class="row justify-content-center">
                <div class="col-lg-4 col-md-5 col-sm-8 login-form">
                    <el-card class="py-lg-3 px-lg-3">
                        <div class="text-muted text-center mb-3">
                            <span>Welcome the Postify, Sign In</span>
                        </div>
                        <el-form :model="loginForm" status-icon :rules="rule" ref="loginForm">
                            <el-form-item label-width="0" prop="email">
                                <el-input placeholder="Email" v-model="loginForm.email"></el-input>
                            </el-form-item>
                            <el-form-item label-width="0" prop="password">
                                <el-input type="password" placeholder="Password" v-model="loginForm.password"></el-input>
                            </el-form-item>
                            <el-form-item label-width="0">
                                <el-checkbox label="remember me"></el-checkbox>
                            </el-form-item>
                            <div class="text-center">
                                <el-button type="primary"  :disabled="isDisabled" @click="signin('loginForm')">Sign In</el-button>
                            </div>
                        </el-form>

                        <div class="row mt-3">
                            <div class="col-6">
                                <a href="#">
                                    <small>Forgot password?</small>
                                </a>
                            </div>
                            <div class="col-6 text-right">
                                <router-link to="/register">
                                    <small>Create new account</small>
                                </router-link>
                            </div>
                        </div>
                    </el-card>
                </div>
                <vue-particles 
                color="#409EFF"
                linesColor="#409EFF"
                class="particles">
                </vue-particles>
            </div>
        </div>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode'

export default {
  name: 'login',
  components: {},
  data () {
    var checkPass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('Please input password'))
      }
      callback()
    }

    var checkEmail = (rule, value, callback) => {
      let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      if (value === '') {
        callback(new Error('Please input email'))
      }
      if (!(pattern.test(value))) {
        callback(new Error('The Format is incorrect'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        email: '',
        password: ''
      },
      rule: {
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        password: [
          { validator: checkPass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    isDisabled () {
      if (this.loginForm.email && this.loginForm.password) return false
      else return true
    }
  },
  methods: {
    signin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post('/api/users/login', this.loginForm).then(res => {
              // token
              const { token } = res.data
              //   save the token
              localStorage.setItem('postifyToken', token)

              //   token decode
              const decode = jwt_decode(token)

              this.$store.dispatch('setIsAutnenticated', !this.isEmpty(decode))
              this.$store.dispatch('setUser', decode)

              this.$emit('getUser')
              this.$router.push('/')
            })
        } else {
          return false
        }
      })
    },
    isEmpty (value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    }
  }
}
</script>

<style>
.login {
    position: relative;
}

.particles {
    position: absolute;
    width: 100%;
    height: 100%;

    top: 0;
    left: 0;
    z-index: 0;
}

.login-form {
    position: relative;
    z-index: 100;

    margin: 10% 0;
}

.fill {
    min-height: 100vh;
}
</style>
