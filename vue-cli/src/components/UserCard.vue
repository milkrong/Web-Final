<template>
    <div class="user-cards-container mt-5">   
        <div class="user-card">
            <div class="card-front">
                <div class="user-card-img">
                    <img :src="user.avatar" alt="friend" class="rounded-circle">
                </div>
                <div class="user-content">
                    <div class="user-main">
                        <h3 class="user-name">{{ user.name }}</h3>
                        <p class="text-center">{{ user.motto }}</p>
                    </div>
                    <div class="footer text-center">
                        <a href="" @click="$router.push('/user/profile')">View Page</a>
                    </div>
                </div>
            </div>
            <div class="card-back">
                <div class="user-card-header">
                    <h5 class="motto">{{ user.motto }}</h5>
                </div>
                <div class="user-content">
                    <div class="user-main">
                        <h4 class="text-center">{{ user.name }}</h4>
                        <div class="user-stats-container">
                            <div class="user-stats">
                                <h4>{{ user.follower_number }}</h4>
                                <p>
                                    Followers
                                </p>
                            </div>
                            <div class="user-stats">
                                <h4>{{ user.following_number }}</h4>
                                <p>
                                    Following
                                </p>
                            </div>
                            <div class="user-stats">
                                <h4>{{ user.feeds_number}}</h4>
                                <p>
                                    Feeds
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <div class="follow-button">
                        <el-button type="info" v-if="user.isfollowing" plain>Unfollow</el-button>
                        <el-button type="success" else plain>Follow</el-button>
                    </div>
                    <div class="friend-button">
                        <el-button type="info" v-if="user.isfriend">Delete Friend</el-button>
                        <el-button type="primary" else>Add Friend</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'user-card',
  props: ['user', 'main-user']
}
</script>

<style scoped>
.user-cards-container {
    -webkit-perspective: 800px;
    -moz-perspective: 800px;
    -o-perspective: 800px;
    perspective: 800px;
    margin-bottom: 30px;
}

.user-cards-container:hover .user-card {
    -webkit-transform: rotateY( 180deg );
    -moz-transform: rotateY( 180deg );
    -o-transform: rotateY( 180deg );
    transform: rotateY( 180deg );
}

.user-card {
    -webkit-transition: -webkit-transform .5s;
    -moz-transition: -moz-transform .5s;
    -o-transition: -o-transform .5s;
    transition: transform .5s;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -o-transform-style: preserve-3d;
    transform-style: preserve-3d;
    position: relative;
}

.card-front, .card-back {
	-webkit-backface-visibility: hidden;
   -moz-backface-visibility: hidden;
     -o-backface-visibility: hidden;
        backface-visibility: hidden;
	position: absolute;
	top: 0;
	left: 0;
	background-color: #FFF;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.14);
}

.card-front {
	z-index: 2;
}

/* back, initially hidden pane */
.card-back {
	-webkit-transform: rotateY( 180deg );
   -moz-transform: rotateY( 180deg );
     -o-transform: rotateY( 180deg );
        transform: rotateY( 180deg );
        z-index: 3;
}

.user-card {
    background: none repeat scroll 0 0 #FFFFFF;
    border-radius: 4px;
    color: #444444;
}

.user-cards-container, .card-front, .card-back {
    width: 16rem;
	height: 24rem;
	border-radius: 4px;
}

.user-card .user-card-img{
    border-radius: 50%;
    display: block;
    height: 120px;
    margin: 35px auto 0;
    overflow: hidden;
    width: 120px;
}
.user-card .user-card-img img{
    background: none repeat scroll 0 0 #FFFFFF;
    border: 4px solid #FFFFFF;
    width: 100%;
    height: 100%
}

.user-card .user-card-header {
    padding: 15px 20px;
    height: 90px;
}

.user-card .user-content{
    background-color: rgba(0, 0, 0, 0);
    box-shadow: none;
    padding: 10px 20px 20px;
}

.user-card .user-content .user-main {
    min-height: 110px;
}

.user-card .card-back .user-content .user-main {
    min-height: 110px;
}

.user-card .user-name {
    font-size: 22px;
    line-height: 28px;
    margin: 10px 0 0;
    text-align: center;
    text-transform: capitalize;
}

.user-card .footer {
    border-top: 1px solid #EEEEEE;
    margin: 30px 0 0;
    padding: 10px 0 0;
}

.user-card .card-back .footer {
    border-top: 1px solid #EEEEEE;
    margin: 30px 0 0;
    padding: 10px 0 0;
    display: flex;
    justify-content: space-evenly;
}

.user-card .motto{
    border-bottom: 1px solid #EEEEEE;
    color: #999999;
    font-size: 14px;
    font-weight: 400;
    padding-bottom: 10px;
    text-align: center;
}

.user-card .user-stats-container{
	width: 100%;
	margin-top: 50px;
}
.user-card .user-stats{
	display: block;
	float: left;
	width: 33.333333%;
	text-align: center;
}

.user-card .user-stats:first-child{
	border-right: 1px solid #EEEEEE;
}
.user-card .user-stats:last-child{
	border-left: 1px solid #EEEEEE;
}
.user-card .user-stats h4{
	font-weight: 300;
	margin-bottom: 5px;
}
.user-card .user-stats p{
	color: #777777;
    font-size: 13px
}
</style>
