<template>
    <div class="account-setting mt-5">
        <h3>Account</h3>
        <el-form ref="accountForm" :model="accountForm" label-width="80px">
            <el-form-item label="Email">
                <el-input v-model="accountForm.email" ></el-input>
            </el-form-item>
            <el-form-item label="Username">
                <el-input v-model="accountForm.username"></el-input>
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
    return {
      accountForm: {
        email: this.user.email,
        username: this.user.username
      }
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
