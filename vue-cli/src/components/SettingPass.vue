<template>
    <div class="pass-setting mt-5">
        <h3>Password</h3>
        <el-form ref="passForm" :model="passForm" label-width="150px">
            <el-form-item label="Old Password">
                <el-input v-model="passForm.oldPassword" ></el-input>
            </el-form-item>
            <el-form-item label="New Password">
                <el-input v-model="passForm.newPassword"></el-input>
            </el-form-item>
            <el-form-item label="Confirm Password">
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
    return {
      passForm: {
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
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

