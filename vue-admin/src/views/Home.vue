<template>
  <div class="home fill">
    <el-container>
      <el-aside width="200px">
        <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        default-active="1"
        router
        >
          <el-menu-item index="1" :route="{path:'dashboard'}">
            <i class="fas fa-tachometer-alt mr-1"></i>
            <span slot="title">Dashboard</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="fas fa-user mr-1"></i>
              <span slot="title">Users</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1"  :route="{path:'admin'}">Admin</el-menu-item>
              <el-menu-item index="2-2"  :route="{path:'users'}">Users</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="3" :route="{path:'upload'}">
            <i class="fas fa-upload mr-1"></i>
            <span slot="title">Upload Music</span>
          </el-menu-item>
          <el-menu-item index="4" :route="{path: 'location'}">
            <i class="fas fa-map-marker mr-1"></i>
            <span slot="title">Location</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <div class="avatar">
            <img :src="user.avatar" alt="">
          </div>
          <div class="name">
            {{ user.email }}
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "home",
  props: ["user"]
};
</script>

<style>
.fill {
  min-height: 100vh;
}

.el-container {
  height: 100%;
}

.el-aside {
  height: 100%;
}

.el-header {
  background-color: #545c64;
  color: white;
  text-align: right;
  line-height: 50px;
  display: flex;
  justify-content: flex-end;
}

.avatar img {
  height: 36px;
  width: 36px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
