<template>
    <div class="music-rank mt-5">
        <div class="rank-head shadow-sm">
            <span>Top Music</span>
        </div>
        <div class="rank-body" v-if="musics[0]">
            <aplayer 
            :music="musics[0]"
            :list="musics"
            style="margin:0"
            />
        </div>
    </div>
</template>

<style>
.right-area .music-rank {
    width: 90%;
}

.music-rank .rank-head {
    background: #fff;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
    padding: 10px 20px;
}

.rank-body {
    padding: 10px 0;
}

</style>

<script>
import Aplayer from 'vue-aplayer'

export default {
  name: 'top-music',
  components: {
    Aplayer
  },
  data () {
    return {
      musics: []
    }
  },
  created () {
    this.$axios.get('/api/musics/top')
      .then(res => {
        this.musics = res.data
      })
  }
}
</script>
