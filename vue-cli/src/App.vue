<template>
  <div id="app">
    <nav class="top-nav navbar navbar-expand-lg bg-light">
        <div class="brand">   
            <a href="index.html" class="mx-sm-3">
                <img src="@/assets/icons/facebook.svg" alt="brand" width="30px" height="30px">
            </a>
        </div> 
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="fa fa-bars"></span>
        </button>
        <div class="navigation-group collapse navbar-collapse" id="navbarSupportedContent">
            <form class="form-inline my-2 my-lg-0 mr-sm-4">
                    <div class="input-group">
                        <input class="form-control" type="search" placeholder="Search..." aria-label="Search">
                        <div class="input-group-append">
                            <button type="button" class="btn btn-outline-secondary my-2 my-sm-0"><i class="fa fa-search"></i></button>
                        </div>
                    </div>
            </form>
            <div class="navigation">    
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a href="index.html" class="nav-link">
                            <i class="fas fa-home"></i>
                            Home
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <i class="far fa-kiss"></i>
                            Friends
                        </a>
                    </li>
                </ul>
            </div>
    
            <div class="profile-navigation ml-md-auto">
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
                            <img src="http://placehold.it/30x30" alt="avatar" class="rounded-circle">
                            Eric Liu
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <ul class="list-group list-group-flush profile-list">
                                <li class="list-group-item">
                                    About Me
                                    <div class="list-group profile-link-group">
                                        <a href="#" class="list-group-item py-1">My Page</a>
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
                                        <a href="" class="list-group-item py-1">Account</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        
    </nav>

    <router-view></router-view>
  </div>
</template>

<style scoped>
#app {
  background-color: #e8e8e8;
  font-family: "Pangolin", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app i {
  margin-right:2px;
}

nav .navigation-group .profile-navigation img {
    position: relative;
    bottom: 4.5px;
    margin-right: 4px;
    float: left;
}

.profile-navigation .profile-list .profile-link-group {
    font-size: 14px;
}
</style>
