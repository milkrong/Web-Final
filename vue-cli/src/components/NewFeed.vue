<template>
    <div class="new-feed-form mt-5 shadow-sm p-3 ">
        <div class="new-feed">
            <textarea class="feed-text" rows="3" placeholder="Share Somthing Interesting..." v-model="text"></textarea>
            <div class="feed-upload">
                <el-upload
                action="#"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :http-request="upload"
                :file-list="uploadImgList"
                :limit = "3"
                accept="image/*">
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
        </div>
        <div class="post-options text-right mt-3">
            <el-button type="primary" @click="submit" round><i class="far fa-paper-plane"></i></el-button>
        </div>
    </div>
</template>

<style scoped>
    .new-feed-form {
        background-color: #EAF5FC;
    }

    .new-feed {
        background: #ffffff;
        padding: 20px 20px;
        border: 1px solid #eeeeee;
        border-radius: 10px;
        margin: 10px;
    }

    .new-feed .feed-text {
        width: 100%;
        border: none;
        resize: none;
        border-bottom: 1px solid #EAF5FC;
        
    }

    .new-feed .feed-text::placeholder {
        color: #eeeeee
    }

    .new-feed .feed-text:focus {
        outline: none
    }
</style>


<script>
    export default {
      name: 'new-feed-form',
      props: ['user'],
      data: function () {
        return {
          text: '',
          tags: 'All',
          dialogImageUrl: '',
          dialogVisible: false,
          uploadImgList: []
        }
      },
      methods: {
        handlePictureCardPreview: function (file) {
          this.dialogImageUrl = file.url
          this.dialogVisible = true
        },
        handleRemove (file, fileList) {
          this.uploadImgList = fileList
        },
        upload (item) {
          const fd = new FormData()
          fd.append('file', item.file, item.file.name)
          this.$axios.post('/api/feeds/upload', fd)
            .then(res => {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              this.uploadImgList.push({ url: res.data.img })
            })
        },
        submit () {
          const feed = {}
          feed.user_id = this.user.id
          feed.name = this.user.name
          feed.tags = this.tags
          feed.text = this.text
          feed.imgs = this.uploadImgList.map(e => e.url).join('|')

          this.$axios.post('/api/feeds/create', feed)
            .then(res => {
              this.$message({
                message: 'Post Success',
                type: 'success'
              })
            })
        }
      }
    }
</script>