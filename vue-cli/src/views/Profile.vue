<template>
    <div class="container-fluid fill">
        <div class="profile-cover">
            <img :src="landImg" alt="" class="img-fluid">
        </div>
        <div class="profile-content">
            <div class="avatar-container d-none d-lg-block">
                <img :src="user.avatar" alt="">
            </div>
            <div class="sub-nav row">
                <div class="col-md-9 offset-md-3">
                    <el-menu :default-active="activeIndex" mode="horizontal">
                        <el-menu-item index="1">Feeds</el-menu-item>
                        <el-menu-item index="2">Followers</el-menu-item>
                        <el-menu-item index="3">Following</el-menu-item>
                        <el-menu-item index="4">Friends</el-menu-item>
                    </el-menu>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <profile-info class="profile-info" :user-data="user"></profile-info>
                </div>
                <div class="profile-main col-lg-5">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.profile-cover {
    width: 100%;
    height: 300px;
    overflow: hidden;
}
.profile-cover img {
    width: 100%;
    height: 300px;
}

.profile-content {
    position: relative;
}

.avatar-container {
    position: absolute;
    top: -150px;
    left: 50px;
    width: 200px;
    height: 200px;
    overflow: hidden;
}

.avatar-container img {
    width: 198px;
    height: 198px;

    border: 2px solid #fff;
    border-radius: 50%;
}

.sub-nav {
    background-color: #fff;
}

.profile-info{
    position: relative;
    left: 50px;
    padding-top: 20px;
}
</style>

<script>
import ProfileInfo from '@/components/ProfileInfo'

export default {
  data () {
    return {
      activeIndex: '1',
      landImg: 'http://www.placehold.it//1800x400'
    }
  },
  components: {
    'profile-info': ProfileInfo
  },
  props: ['user']
}
</script>