<template>
    <div class="container setting fill">
        <div class="row">
            <div class="side-bar col-3 mt-5">
                <el-menu 
                default-active="1"
                class="el-menu-vertical-demo">
                    <el-menu-item index="1" @click="$router.push('account')">
                        <i class="el-icon-menu"></i>
                        <span slot="title">Account</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="$router.push('pass')">
                        <i class="el-icon-menu"></i>
                        <span slot="title">Password</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="$router.push('user')">
                        <i class="el-icon-menu"></i>
                        <span slot="title">User</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="setttings col-6">
                <router-view :user="user"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'setting',
  props: ['user']
}
</script>

<style>
.fill {
    min-height: 100vh
}
</style>


