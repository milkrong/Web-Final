<template>
    <div class="music-rank mt-5 shadow-sm">
        <div class="rank-head">
            <span>Top Music</span>
        </div>
        <div class="rank-body">
            <aplayer autoplay
            :music="{
                title: 'secret base~君がくれたもの~',
                artist: 'Silent Siren',
                src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
                pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
            }"
            />
        </div>
    </div>
</template>

<style>
.right-area .music-rank {
    background: #fff;
    width: 90%;
}

.music-rank .rank-head {
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
    padding: 10px 20px;
}

.rank-body {
    padding: 10px 0;
}

</style>

<script>
import Aplayer from "vue-aplayer";

export default {
    name: "top-music",
    components: {
        Aplayer
    }
}
</script>
