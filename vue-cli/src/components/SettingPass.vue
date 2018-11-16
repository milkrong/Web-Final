<template>
    <div class="pass-setting mt-5">
        <h3>Password</h3>
        <el-form ref="passForm" :rules="rules" :model="passForm" label-width="150px">
            <el-form-item label="Old Password">
                <el-input v-model="passForm.oldPassword" ></el-input>
            </el-form-item>
            <el-form-item label="New Password" prop="newPassword">
                <el-input v-model="passForm.newPassword"></el-input>
            </el-form-item>
            <el-form-item label="Confirm Password" prop="newPassword2">
                <el-input v-model="passForm.newPassword2"></el-input>
            </el-form-item>
            <el-button type="primary">Save Changes</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
  name: 'account-setting',
  props: ['user'],
  data () {
        var checkPass = (rule, value, callback) => {
            if (value === '') {
            return callback(new Error('Please input password'))
            } else {
            if (this.passForm.newPassword2 !== '') {
                this.$refs.passForm.validateField('password2')
            }
            callback()
            }
        }

        var checkPass2 = (rule, value, callback) => {
          if (value === '') {
            return callback(new Error('Please confirm password'))
          } else if (value !== this.passForm.newPassword) {
            callback(new Error('Password is not same'))
          } else {
            callback()
          }
        }

    return {
      passForm: {
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
      },
      rules: {
            newPassword: [
                { validator: checkPass, trigger: 'blur' },
                { min: 5, max: 20, trigger: 'blur' }
            ],
            newPassword2: [
                { validator: checkPass2, trigger: 'blur' },
                { min: 5, max: 20, trigger: 'blur' }
            ]
      }
    }
  }
}
</script>

<style>
.pass-setting {
    background-color: #ffffff;
    padding: 30px 30px;
    border-radius: 5px
}

.pass-setting h3 {
    margin-bottom: 30px;
    border-bottom: 2px solid #eeeeee;
}
</style>

