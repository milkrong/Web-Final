<template>
    <div class="user-setting mt-5">
        <h3>User</h3>
        <el-form ref="userForm" :model="userForm" label-width="100px" class="form">
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-form-item label="Favorites">
                <el-checkbox-group v-model="userForm.hobbies">
                    <el-checkbox v-for="hobby in userForm.hobbies" :label="hobby" :key="hobby">{{hobby}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="Introduct yourself">
                <el-input type="textarea" :autosize="{ minRows:3, maxRows: 4}" v-model="userForm.motto"></el-input>
            </el-form-item>
            <el-button type="primary">Save Changes</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
  name: 'user-setting',
  data () {
    return {
      imageUrl: this.user.avatar,
      userForm: {
        motto: this.user.motto,
        hobbies: this.user.hobbies
      }
    }
  },
  props: ['user'],
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
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