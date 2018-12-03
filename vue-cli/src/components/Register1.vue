<template>
<div class="register">
    <div class="text-center text-muted mb-4">
        <span>Welcome to postify music</span>
    </div>
    <el-form :model="registerForm" status-icon :rules="rule" ref="registerForm">
        <el-form-item label-width="0" prop="email">
            <el-input placeholder="Email" v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item label-width="0" prop="name">
            <el-input placeholder="Name" v-model="registerForm.name"></el-input>
        </el-form-item>
        <el-form-item label-width="0" prop="username">
            <el-input placeholder="Username" v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label-width="0" prop="password">
            <el-input type="password" placeholder="Password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label-width="0" prop="password2">
            <el-input type="password" placeholder="Confirm Password" v-model="registerForm.password2"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
            <el-checkbox>I Agree with Privacy Policy</el-checkbox>
        </el-form-item>
        <div class="text-center">
            <el-button type="primary" @click="signup('registerForm')"  :disabled="isDisabled">Sign up</el-button>
        </div>
    </el-form>
</div>
</template>

<script>
    export default {
      name: 'register-step1',
      methods: {
        signup (formName) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.$axios.post('/api/users/register/step1', this.registerForm)
                .then((res) => {
                  this.$message({
                    message: 'Register Successfully',
                    type: 'success'
                  })
                  this.$store.state.rstep.step = 2
                  this.$store.state.ruser.register = res.data
                  this.$router.push('/register/step2')
                  console.log(res.data)
                })
            }
          })
        }
      },
      data () {
        var checkPass = (rule, value, callback) => {
          if (value === '') {
            return callback(new Error('Please input password'))
          } else {
            if (this.registerForm.password2 !== '') {
              this.$refs.registerForm.validateField('password2')
            }
            callback()
          }
        }

        var checkPass2 = (rule, value, callback) => {
          if (value === '') {
            return callback(new Error('Please confirm password'))
          } else if (value !== this.registerForm.password) {
            callback(new Error('Password is not same'))
          } else {
            callback()
          }
        }

        return {
          registerForm: {
            username: '',
            name: '',
            email: '',
            password: '',
            password2: ''
          },
          rule: {
            name: [
              { required: true, message: 'Please enter name', trigger: 'blur' },
              { max: 20, message: 'No more than 20', trigger: 'blur' }
            ],
            username: [
              { required: true, message: 'Please enter name', trigger: 'blur' },
              { max: 20, message: 'No more than 20', trigger: 'blur' }
            ],
            email: [
              { type: 'email', required: true, message: 'Please enter correct email', trigger: 'blur' }
            ],
            password: [
              { validator: checkPass, trigger: 'blur' },
              { min: 5, max: 20, trigger: 'blur' }
            ],
            password2: [
              { validator: checkPass2, trigger: 'blur' },
              { min: 5, max: 20, trigger: 'blur' }
            ]
          }

        }
      },
      computed: {
        isDisabled () {
          if (this.registerForm.email &&
                this.registerForm.password &&
                this.registerForm.username &&
                this.registerForm.password2) return false
          else return true
        }
      }
    }
</script>

<style scoped>

</style>

