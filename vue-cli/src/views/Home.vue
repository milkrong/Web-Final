<template>

<div class="container-fluid fill">
    <div class="row justify-content-center">
        <div class="left-area col-lg-2 col-md-9 mr-lg-2">
            <profile-card :userData="user"></profile-card>
        </div>
        <div class="main-area col-lg-4 col-md-9">
            <template v-if="logged">
                <new-feed-form :user='user'></new-feed-form>
                <div class="sub-nav">
                    <el-menu :default-active="activeIndex" router mode="horizontal">
                        <el-menu-item index="1" :route="{path: 'concern'}">
                            <el-badge>My Concern</el-badge>
                        </el-menu-item>
                        <el-menu-item index="2" :route="{path: 'recommend'}">
                            <el-badge>Recommendation</el-badge>
                        </el-menu-item>
                    </el-menu>
                </div>
                <div class="feeds">
                    <router-view :userData="user"></router-view>
                </div>
            </template>
        </div>
        <div class="right-area col-lg-3 col-md-9 ml-lg-2">
             <top-music></top-music>
             <tags></tags>         
        </div>
        <div class="chat col-lg-2" v-if="logged">
          <chat :userData="user"></chat>
      </div>
      </div>
  </div>
</template>

<script>
import ProfileCard from '@/components/ProfileCard'
import NewFeed from '@/components/NewFeed'
import TopMusic from '@/components/TopMusic'
import Tags from '@/components/Tags'
import Chat from '@/components/Chat'

export default {
  data: function () {
    return {
      activeIndex: '1'
    }
  },
  props: ['user'],
  components: {
    'profile-card': ProfileCard,
    'new-feed-form': NewFeed,
    'top-music': TopMusic,
    'tags': Tags,
    'chat': Chat
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

