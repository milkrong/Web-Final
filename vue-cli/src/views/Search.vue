<template>
    <div class="search fill">
    <div class="container">
      <div class="row justify-content-center"> 
        <user-card 
        v-for="result in results" 
        :key="result.email" 
        :user="result"
        :main-user = "user"
        class="col-lg-3"></user-card>
      </div>
    </div>
    </div>
</template>

<script>
import UserCard from '@/components/UserCard'

export default {
  name: 'search-result',
  components: {
    'user-card': UserCard
  },
  props: ['user'],
  data () {
    return {
      results: []
    }
  },
  created () {
    this.$axios.get('/api/profiles/search/' + this.$route.query.searchInput)
      .then(res => {
        this.results = res.data
      })

    this.$axios.get('/api/friends/search/' + this.$route.query.searchInput)
      .then(res => {
        this.results.isfriend = res.data.isfriend
      })
  }
}
</script>

<style>
.fill {
    min-height: 100vh;
}
</style>


