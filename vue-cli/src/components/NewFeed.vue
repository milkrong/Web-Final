<template>
    <div class="new-feed-form mt-5 shadow-sm p-3 ">
        <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 5}"
        placeholder="Share somthing you like"
        v-model="textarea">
        </el-input>
        <div class="feed-img">
            <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            accept="video/*">
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>
        <div class="post-options text-right mt-3">
            <el-button type="primary" round><i class="far fa-paper-plane"></i></el-button>
        </div>
    </div>
</template>

<style scoped>
    .new-feed-form {
        background-color: #EAF5FC
    }
    
    .feed-img {
        margin-top: 20px;
    }
</style>


<script>
    export default {
      name: 'new-feed-form',
      data: function () {
        return {
          textarea: '',
          dialogImageUrl: '',
          dialogVisible: false
        }
      },
      handlePictureCardPreview: function (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
  }
    }
</script>