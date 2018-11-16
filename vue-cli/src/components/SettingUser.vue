<template>
    <div class="user-setting mt-5">
        <h3>User</h3>
        <el-form ref="userForm" :model="userForm" label-width="100px">
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
                <el-input v-model="passForm.hobbies" ></el-input>
            </el-form-item>
            <el-form-item label="Introduct yourself">
                <el-input type="textarea" :autosize="{maxRows: 4}" v-model="passForm.motto"></el-input>
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
      imageUrl: '',
      passForm: {
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

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-top: 10px;
    margin-left: 50px;
    margin-bottom: 30px;
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