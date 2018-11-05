<template>
    <div class="feed-card">
        <el-card>
            <div slot="header">
                <div class="user-avatar">
                    <img src="http://placehold.it/45x45" alt="" class="rounded-circle">
                </div>
                <div class="user-name ml-2">   
                    <h3>Eirc</h3>
                    <span><i class="far fa-clock mr-1"></i>3 mins ago</span>
                </div> 
                <div class="feed-option float-right">
                    <a href="#"><i class="fas fa-ellipsis-v"></i></a>
                </div>
            </div>
            <div class="feed-content"></div>
            <div class="feed-info mb-2">
                <span class="badge badge-pill badge-primary">Music Comment</span>
            </div>
            <div class="feed-footbar">
                <a href="#"><i class="far fa-heart"></i></a>
                <a href="#"><i class="far fa-thumbs-up mx-md-1"></i>12</a>
                <a href="" class="float-right"><i class="far fa-comment-dots mr-md-2"></i>15 comments</a>
            </div>
        </el-card>
    </div>
</template>

<style>
.user-avatar, .user-name, .feed-option {
    display: inline-block;
}
</style>

