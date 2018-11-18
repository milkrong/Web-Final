<template>
    <div class="account-setting mt-5">
        <h3>Account</h3>
        <el-form ref="accountForm" status-icon :rules="rules" :model="accountForm" label-width="80px">
            <el-form-item label="Email" prop="email">
                <el-input v-model="accountForm.email" ></el-input>
            </el-form-item>
            <el-form-item label="Username" prop="email">
                <el-input v-model="accountForm.username"></el-input>
            </el-form-item>
            <el-button type="primary" @click="save('accountForm')">Save Changes</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
  name: 'account-setting',
  props: ['user'],
  data () {
    return {
      accountForm: {
        id: this.user.id,
        email: this.user.email,
        username: this.user.username
      },
      rules: {
        email: [
          { type: 'email', required: true, message: 'Please input correct email', trigger: 'blur' }
        ],
        username: [
          { required: true, message: 'Please set your username', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    save (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post('/api/setting/account', this.accountForm)
            .then(res => {
              console.log(res.data)
              this.$message({
                message: res.data,
                type: 'success'
              })
            })
        }
      })
    }
  }
}
</script>

<style scoped>
.account-setting {
    background-color: #ffffff;
    padding: 30px 30px;
    border-radius: 5px
}

.account-setting h3 {
    margin-bottom: 30px;
    border-bottom: 2px solid #eeeeee;
}
</style>
