<template>
    <div class="feed-card">
        <el-card>
            <div slot="header" class="header">
                <div class="user-avatar">
                    <img :src="feed.avatar" alt="" class="rounded-circle">
                </div>
                <div class="user-name ml-2">   
                    <h3>{{ feed.name }}</h3>
                    <span><i class="far fa-clock mr-1"></i>{{feed.created_at}}</span>
                </div> 
                <div class="feed-option">
                    <a href="#"><i class="fas fa-ellipsis-v"></i></a>
                </div>
            </div>
            <div class="feed-content">
                <p class="text-feed" v-if="feed.text">{{feed.text}}</p> 
                <div class="imgs" v-if="feed.imgs">
                    <div class="img-content" v-for="(img, index) in feed.imgs" :key="index">
                        <img :src="img" alt="">
                    </div>
                </div>
                <div class="musics" v-if="feed.music">
                    <aplayer 
                    :music="music" 
                    style="box-shadow: none; margin: 0"/>
                </div>
            </div>
            <div class="feed-info my-2">
                <span class="badge badge-pill badge-primary" v-for="(tag,index) in feed.tag" :key="index">{{tag}}</span>
            </div>
            <div class="feed-footbar">
                <a href="#"><i class="far fa-thumbs-up mx-md-1"></i>{{feed.likes}}</a>
                <a href="" class="float-right"><i class="far fa-comment-dots mr-md-2"></i></a>
            </div>
        </el-card>
    </div>
</template>

<script>
import Aplayer from 'vue-aplayer'

export default {
  name: 'feed',
  props: ['feed'],
  components: {
    Aplayer
  },
  data () {
    return {
      music: {
        title: this.feed.music.title,
        src: this.feed.music.src,
        pic: this.feed.music.pic,
        artist: this.feed.music.artist
      }
    }
  }
}
</script>

<style scoped>
.header {
    display: flex;
    height: 40px;
    width: 100%;
}

.user-avatar {
    height: 100%;
    margin-right: 1rem;
    width:10%;
}

.user-avatar img {
    height: 30px;
    width: 30px;
}

.user-name {
    width:50%
}

.user-name h3 {
    font-size: 1.3rem
}

.user-name span {
    font-size: 0.8rem;
    color: #c2bfbf;
    position: relative;
    bottom: 8px
}

.feed-option {
    width: 40%;
    text-align: right;
}

.imgs {
    width: 100%;
    display: flex
}

.img-content {
    max-width: 100%
}

.img-content img {
    width: 100%;
    max-height: 500px;
}
</style>
