<template>
    <div class="container-fluid">
        <div class="profile-cover">
            <img src="http://placehold.it/1800x400" alt="" class="img-fluid">
        </div>
        <div class="profile-content">
            <div class="avatar-container">
                <img src="http://placehold.it/300x300" alt="">
            </div>
            <div class="sub-nav row">
                <el-menu :default-active="1" mode="horizontal" class="col-lg-9 offset-lg-3">
                    <el-menu-item index="1">Posts</el-menu-item>
                    <el-menu-item index="2">Followers</el-menu-item>
                    <el-menu-item index="3">Following</el-menu-item>
                    <el-menu-item index="4">Friends</el-menu-item>
                </el-menu>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <profile-info class="profile-info"></profile-info>
                </div>
                <div class="profile-main col-lg-5">

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
    import ProfileInfo from "@/components/ProfileInfo";

    export default {
        components: {
            "profile-info": ProfileInfo
        }
    }
</script>