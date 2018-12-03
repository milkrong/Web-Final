<template>
    <!-- Profile Card -->
    <div class="card mt-5 shadow-sm profile-card">
        <template v-if="logged">
            <div class="personal-card">
                <div class="personal-card-header">
                    <h5 class="motto">{{userData.motto}}</h5>
                </div>
                <div class="personal-content">
                    <div class="personal-main">
                        <div class="personal-media">
                            <div class="media-img-container">
                                <div class="media-img">
                                    <img :src="userData.avatar" alt="">
                                </div>
                            </div>
                            <div class="media-content">
                                <h4>{{userData.name}}</h4>
                                <p>@{{userData.username}}</p>
                            </div>
                        </div>
                        <div class="personal-stats-container">
                            <div class="personal-stats">
                                <h4>{{ userData.follower_number }}</h4>
                                <p>
                                    Followers
                                </p>
                            </div>
                            <div class="personal-stats">
                                <h4>{{ userData.following_number }}</h4>
                                <p>
                                    Following
                                </p>
                            </div>
                            <div class="personal-stats">
                                <h4>{{ userData.feeds_number }}</h4>
                                <p>
                                    Feeds
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <router-link to="/profile">View Profile</router-link>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="log-card">
                <button @click="$router.push('/login')" class="btn btn-primary">Log In</button>
            </div>
        </template>
    </div>
    <!-- End Profile Card -->
</template>

<script>
    export default {
      name: 'profile-card',
      props: ['userData'],
      computed: {
        logged () {
          return this.$store.getters.isAutnenticated
        }
      }
    }
</script>

<style scoped>
.log-card {
    background: none repeat scroll 0 0 #FFFFFF;
    border-radius: 5px;
    color: #444444;
    text-align: center;
    padding: 50px 0;
}

.personal-card {
    background: none repeat scroll 0 0 #FFFFFF;
    border-radius: 5px;
    color: #444444;
}

.personal-card .motto{
    border-bottom: 1px solid #EEEEEE;
    color: #999999;
    font-size: 14px;
    font-weight: 400;
    padding-bottom: 10px;
    text-align: center;
}

.personal-media {
    display: flex;
    justify-content: center;
}

.media-content {
    padding: 5px 15px;
}

.media-content h4 {
    font-size: 18px;
}

.media-content p {
    font-size: 14px;
    color: #777777;
}

.media-img-container {
    border-radius: 50%;
    width: 68px;
    height: 68px;
}

.media-img {
    border-radius: 50%;
    padding: 2px;
    background: #833ab4; 
    background: -webkit-linear-gradient(to bottom, #fcb045, #fd1d1d, #833ab4); 
    background: linear-gradient(to bottom, #fcb045, #fd1d1d, #833ab4);
}

.media-img img {
    border: 2px solid #fff;
    border-radius: 50%;
    width: 64px;
    height: 64px;
}

.personal-card .personal-content{
    background-color: rgba(0, 0, 0, 0);
    box-shadow: none;
    padding: 10px 10px 20px;
}

.personal-card .personal-content .personal-main {
    min-height: 160px;
}

.personal-card .personal-stats-container{
	width: 100%;
	margin-top: 50px;
}

.personal-card .personal-stats{
	display: block;
	float: left;
	width: 33.333333%;
	text-align: center;
}

.personal-card .personal-card-header {
    padding: 15px 20px;
    height: 90px;
}

.personal-card .personal-stats:first-child{
	border-right: 1px solid #EEEEEE;
}

.personal-card .personal-stats:last-child{
	border-left: 1px solid #EEEEEE;
}

.personal-card .personal-stats h4{
	font-weight: 300;
    margin-bottom: 5px;
    font-size: 18px;
}

.personal-card .personal-stats p{
    color: #777777;
    font-size: 13px;
    font-weight: 600;
}

.personal-card .footer {
    border-top: 1px solid #EEEEEE;
    margin: 10px 0 0;
    padding: 10px 0;
    text-align: center;
}
</style>

