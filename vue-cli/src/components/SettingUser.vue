<template>
    <div class="user-setting mt-5">
        <h3>User</h3>
        <el-form ref="userForm" :model="userForm" label-width="100px" class="form">
            <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :http-request = "upload"
                :before-upload="beforeAvatarUpload">
                <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-form-item label="Favorites">
                <el-checkbox-group v-model="userForm.hobbies">
                    <el-checkbox v-for="hobby in hobbies" :label="hobby" :key="hobby">{{hobby}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="Introduct yourself">
                <el-input type="textarea" :autosize="{ minRows:3, maxRows: 4}" v-model="userForm.motto"></el-input>
            </el-form-item>
            <el-button type="primary" @click="save">Save Changes</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
  name: 'user-setting',
  data () {
    return {
      userForm: {
        avatar: this.user.avatar,
        motto: this.user.motto,
        hobbies: this.user.hobbies
      },
      hobbies: ['Hip-hop', 'Pop', 'Classical', 'Jazz']
    }
  },
  props: ['user'],
  methods: {
    upload (item) {
      const fd = new FormData()
      fd.append('avatar', item.file, item.file.name)
      this.$axios.post('/api/setting/upload', fd)
        .then(res => {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.userForm.avatar = res.data.avatar
        })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('Only JPG Format!')
      }
      if (!isLt2M) {
        this.$message.error('Not greater than 20MB!')
      }
      return isJPG && isLt2M
    },
    save () {
      this.user.avatar = this.userForm.avatar
      this.user.motto = this.userForm.motto
      this.user.hobbies = this.userForm.hobbies
      this.$axios.post('/api/setting/user', this.user)
        .then(res => {
          this.$message({
            message: res.data,
            type: 'success'
          })
        })
    }
  }
}
</script>


<style>
.user-setting {
    background-color: #ffffff;
    padding: 30px 30px;
    border-radius: 5px
}

.user-setting h3 {
    margin-bottom: 30px;
    border-bottom: 2px solid #eeeeee;
}

.form {
    padding: 10px 30px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-left: 25px;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 64px;
    height: 64px;
    line-height: 64px;
    text-align: center;
}
.avatar {
    width: 64px;
    height: 64px;
    display: block;
}
</style>