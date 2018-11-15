<template>

<div class="container-fluid fill">
    <div class="row justify-content-center">
        <div class="left-area col-lg-3 col-md-9 mr-lg-2">
            <profile-card></profile-card>
        </div>
        <div class="main-area col-lg-5 col-md-9">
            <template v-if="logged">
                <new-feed-form></new-feed-form>
                <div class="sub-nav">
                    <el-menu :default-active="activeIndex" mode="horizontal">
                        <el-menu-item index="1">
                            <el-badge value="new">My Concern</el-badge>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <el-badge>Recommendation</el-badge>
                        </el-menu-item>
                    </el-menu>
                </div>
            </template>
        </div>
        <div class="right-area col-lg-3 col-md-9 ml-lg-2">
             <top-music></top-music>
             <tags></tags>         
        </div>
      </div>
  </div>
</template>

<script>
import ProfileCard from '@/components/ProfileCard'
import NewFeed from '@/components/NewFeed'
import TopMusic from '@/components/TopMusic'
import Tags from '@/components/Tags'

export default {
  data: function () {
    return {
      activeIndex: '2'
    }
  },
  components: {
    'profile-card': ProfileCard,
    'new-feed-form': NewFeed,
    'top-music': TopMusic,
    'tags': Tags
  },
  computed: {
    logged () {
      return this.$store.getters.isAutnenticated
    }
  }
}
</script>

<style>
.fill {
    min-height: 100vh;
}

.sub-nav {
    display: flex;
    justify-content: center;
    background: #fff;
    width: 100%;
}
</style>

