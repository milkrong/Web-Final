<template>
    <div class="profile-following">
        <div class="container">
            <div class="row justify-content-center" v-if="loaded"> 
                <user-card 
                v-for="result in results" 
                :key="result.email" 
                :user="result"
                :main-user = "userData"
                class="col-lg-6"></user-card>
            </div>
        </div>
    </div>
</template>

<script>
import UserCard from '@/components/UserCard'

export default {
  name: 'profile-followings',
  components: {
    'user-card': UserCard
  },
  props: ['userData'],
  data () {
    return {
      results: [],
      loaded: false
    }
  },
  mounted () {
    this.$axios.get('/api/follow/followings/' + this.userData._id)
      .then(res => {
        this.results = res.data
        this.loaded = true
      })
  }
}
</script>

