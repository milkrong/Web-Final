<template>
    <div class="concern-feed">
        <div class="feed" v-for="feed in feeds" :key="feed._id">
            <feed-card v-if="loaded" :feed="feed"></feed-card>
        </div>
    </div>
</template>

<script>
import FeedCard from '@/components/FeedCard'
export default {
  name: 'concern',
  props: ['user-data'],
  components: {
    'feed-card': FeedCard
  },
  data () {
    return {
      feeds: [],
      loaded: false
    }
  },
  mounted () {
    this.$axios.get('/api/feeds/recommend/latest/' + this.userData._id)
      .then(res => {
        this.feeds = res.data
        this.loaded = true
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style>
.feed {
    padding: 20px 0 0;
}
</style>
