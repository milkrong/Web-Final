<template>
    <div class="search">
        <!-- <div class="col-lg-3 col-md-4 col-sm-6" v-for="user in users" :key="user"> -->
            <user-card v-for="user in users" :key="user.email" :user="user" class="col-lg-3"></user-card>
        <!-- </div> -->
    </div>
</template>

<script>
import UserCard from '@/components/UserCard'

export default {
  name: 'search-result',
  components: {
    'user-card': UserCard
  },
  data () {
    return {
      users: []
    }
  },
  created () {
    this.$axios.get('/api/profiles/search/' + this.$route.query.searchInput)
      .then(res => {
        this.users = res.data
      })
  }
}
</script>

