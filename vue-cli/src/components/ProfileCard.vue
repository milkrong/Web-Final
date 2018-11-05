<template>
    <!-- Profile Card -->
    <div class="card mt-5 shadow-sm profile-card">
        <div class="personal-card">
            <div class="personal-card-header">
                <h5 class="motto">"To be or not to be, this is my awesome motto!"</h5>
            </div>
            <div class="personal-content">
                <div class="personal-main">
                    <div class="personal-media">
                        <div class="media-img-container">
                            <div class="media-img">
                                <img src="http://placehold.it/64x64" alt="">
                            </div>
                        </div>
                        <div class="media-content">
                            <h4>Zhijian Li</h4>
                            <p>@milkrong</p>
                        </div>
                    </div>
                    <div class="personal-stats-container">
                        <div class="personal-stats">
                            <h4>235</h4>
                            <p>
                                Followers
                            </p>
                        </div>
                        <div class="personal-stats">
                            <h4>114</h4>
                            <p>
                                Following
                            </p>
                        </div>
                        <div class="personal-stats">
                            <h4>35</h4>
                            <p>
                                Posts
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <a href="#">View Profile</a>
            </div>
        </div>
    </div>
    <!-- End Profile Card -->
</template>

<script>
    export default {
        name: "profile-card"
    }
</script>

<style scoped>
.personal-card {
    background: none repeat scroll 0 0 #FFFFFF;
    border-radius: 4px;
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

