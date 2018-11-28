<template>
    <div class="music-card">
        <div class="music-wrapper">
            <div class="top" 
            :style="{'background': 'url('+music.pic+') no-repeat center center'}">
            </div>
            <div class="bottom">
                <div class="left">
                    <h3>{{music.title}}</h3>
                    <p>{{music.artist}}</p>
                </div>
                <div class="right">
                    <el-button @click="play" circle><i class="fas fa-play"></i></el-button>
                </div>
            </div>
            <div class="share">
                <div class="icon" @click="share">
                    <i class="fas fa-share-alt"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'music-card',
  props: ['music'],
  data () {
    return {
      toPlay: {
        title: this.music.title,
        src: this.music.src,
        pic: this.music.pic,
        artist: this.music.artist
      }
    }
  },
  methods: {
    play () {
      this.$emit('play-this', this.toPlay)
    },
    share () {
      this.$prompt(this.music.title, 'Share', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        inputPlaceholder: 'Say something...'
      }).then(({ value }) => {
        const newFeed = {
          music: this.music,
          text: value
        }
        this.$axios.post('/api/feeds/share', newFeed)
          .then(res => {
            console.log(res)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancelled'
        })
      })
    }
  }
}
</script>

<style>
.music-wrapper {
    width: 250px;
    height: 350px;
    background: white;
    margin: auto;
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0;
    transform: scale(0.95);
    transition: box-shadow 0.5s, transform 0.5s;
}

.music-wrapper:hover {
    transform: scale(1);
    box-shadow: 5px 20px 30px rgba(0, 0, 0, 0.2);
}

.music-wrapper .top {
    height: 80%;
    width: 100%;
    -webkit-background-size: 100%;
    -moz-background-size: 100%;
    -o-background-size: 100%;
    background-size: auto;
}

.music-wrapper .bottom {
    display: flex;
    padding: 5px 10px;
    align-content: space-evenly;
}

.bottom .left {
    width: 50%
}

.bottom .right {
    width: 50%;
    text-align: right;
    padding-top: 10px
}

.share {
    z-index: 9;
    position: absolute;
    background: #409EFF;
    width: 100px;
    height: 100px;
    top: -50px;
    right:-50px;
    border-radius: 0 0 100px 100px;
    cursor: pointer;
}

.share .icon {
    position: absolute;
    right: 65px;
    top:60px;
    color: white;
    opacity: 1;
}
</style>
