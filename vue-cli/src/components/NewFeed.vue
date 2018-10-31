<template>
    <div class="new-feed-form mt-5 shadow-sm p-3 ">
        <el-tabs>
            <el-tab-pane>
                <span slot="label"><i class="fas fa-bullhorn mr-1"></i>Share</span>
                <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 4}"
                placeholder="请输入内容"
                v-model="textarea">
                </el-input>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label"><i class="fab fa-algolia mr-1"></i>Media</span>
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
            </el-tab-pane>
        </el-tabs>
        <div class="post-options text-right mt-3">
            <el-button type="primary" round><i class="far fa-paper-plane"></i></el-button>
        </div>
    </div>
</template>

<style>
    .new-feed-form {
        background-color: #EAF5FC
    }
</style>


<script>
    export default {
        name: "new-feed-form",
        data: function () {
            return {
                textarea: "",
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        handlePictureCardPreview: function (file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
      }
    }
</script>