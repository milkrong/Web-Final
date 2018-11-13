<template>
<div class="nav">
    <nav class="top-nav navbar navbar-expand-lg bg-white shadow-sm">
        <div class="brand">   
            <a href="/" class="mx-sm-3">
                <img src="@/assets/icons/facebook.svg" alt="brand" width="30px" height="30px">
            </a>
        </div> 
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="fa fa-bars"></span>
        </button>
        
        <form class="form-inline my-2 my-lg-0 mr-sm-4">
                <div class="input-group">
                    <input class="form-control" type="search" placeholder="Search..." aria-label="Search">
                    <div class="input-group-append">
                        <button type="button" class="btn btn-outline-secondary my-2 my-sm-0"><i class="fa fa-search"></i></button>
                    </div>
                </div>
        </form>

        <div class="navigation-group collapse navbar-collapse" id="navbarSupportedContent">
            <div class="navigation mr-auto">    
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <router-link to="/home" class="nav-link">
                            <i class="fas fa-home mr-1"></i>Home
                        </router-link>
                    </li>
                </ul>
            </div>
            <template v-if="logged">
                <div class="profile-navigation">
                    <ul class="navbar-nav mr-sm-5">
                        <li class="nav-item mr-2">
                            <a href="#" class="nav-link">
                                <i class="far fa-comment"></i>
                                Notice
                            </a>
                        </li>
                        <li class="profile-dropdown nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                                <img :src="user.avatar" alt="avatar" class="rounded-circle">
                                {{user.name}}
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <ul class="list-group list-group-flush profile-list">
                                    <li class="list-group-item">
                                        About Me
                                        <div class="list-group profile-link-group">
                                            <router-link to="/profile" class="list-group-item py-1">My page</router-link>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        Notifications
                                        <div class="list-group">
                                            <a href="" class="list-group-item py-1">New Friends</a>
                                            <a href="" class="list-group-item py-1">Comments</a>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        Settings
                                        <div class="list-group">
                                            <router-link to="/settings" class="list-group-item py-1">Account</router-link>
                                            <a href="#" @click="logout" class="list-group-item py-1">Logout</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </template>
            <template v-else>
                <div class="profile-navigation">
                    <ul class="navbar-nav mr-sm-5">
                        <router-link to="/login" class="mr-2">Login</router-link> 
                        <router-link to="/register">Register</router-link> 
                    </ul>
                </div>
            </template>
        </div>
    </nav>
</div>
</template>

<script>
export default {
  name: 'nav-bar',
  computed: {
    user () {
      return this.$store.getters.user
    },
    logged () {
      return this.$store.getters.isAutnenticated
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('postifyToken')
      this.$store.dispatch('clearCurrentState')

      this.$router.push('/home')
    }
  }
}
</script>

<style>
.top-nav,nav {
    width: 100%
}

nav .navigation-group .profile-navigation img {
    position: relative;
    bottom: 4.5px;
    margin-right: 4px;
    float: left;
    height: 30px;
    width: 30px;
}

.profile-navigation .profile-list .profile-link-group {
    font-size: 14px;
}
</style>

