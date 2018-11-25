<template>
    <div class="musics fill">
        <div class="list mt-5">
            <div class="container">
                <div class="row justify-content-center">
                    <music-card
                    v-for="music in musics"
                    :key="music._id"
                    :music = "music"
                    @play-this="playThis"
                    class="col-lg-3"
                    >
                    </music-card>
                </div>
            </div>
        </div>
        <div class="player fixed-bottom" v-if="musics[0]">
            <aplayer autoplay
            :music="defaultMusic"
            theme ="#dc3545"
            />
        </div>
    </div>
</template>

<script>
import Aplayer from 'vue-aplayer'
import MusicCard from '@/components/MusicCard'

export default {
  name: 'music',
  data () {
    return {
      musics: [],
      defaultMusic: {}
    }
  },
  created () {
    this.$axios.get('/api/musics/all')
      .then(res => {
        this.musics = res.data
        if (res.data[0]) {
          this.defaultMusic = {
            title: res.data[0].title,
            src: res.data[0].src,
            pic: res.data[0].pic,
            artist: res.data[0].artist
          }
        }
      })
  },
  components: {
    Aplayer,
    'music-card': MusicCard
  },
  methods: {
      playThis (music) {
          this.defaultMusic = music
      }
  }
}
</script>

<style scoped>
.fill {
    min-height: 100hv
}

.player {
    box-shadow: 0 -2px 5px 3px #409EFF;
}
</style>


