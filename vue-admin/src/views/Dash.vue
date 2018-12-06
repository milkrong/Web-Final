<template>
    <div class="dash-board">
        <div class="container-fluid" v-if="loaded">
            <div class="row">
                <div class="col-xl-3 col-md-4">
                    <stats-card>
                        <div slot="header">
                        <i class="fas fa-users text-primary"></i>
                        </div>
                        <div slot="content">
                        <p class="card-category">Users</p>
                        <h4 class="card-title">{{userCount}}</h4>
                        </div>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-md-4">
                    <stats-card>
                        <div slot="header">
                        <i class="fas fa-vote-yea text-info"></i>
                        </div>
                        <div slot="content">
                        <p class="card-category">Feeds</p>
                        <h4 class="card-title">{{feedCount}}</h4>
                        </div>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-md-4">
                    <stats-card>
                        <div slot="header">
                        <i class="fas fa-volume-up text-warning"></i>
                        </div>
                        <div slot="content">
                        <p class="card-category">Musics</p>
                        <h4 class="card-title">{{musicCount}}</h4>
                        </div>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-md-4">
                    <stats-card>
                        <div slot="header">
                        <i class="far fa-surprise text-danger"></i>
                        </div>
                        <div slot="content">
                        <p class="card-category">Crash</p>
                        <h4 class="card-title">N/A</h4>
                        </div>
                    </stats-card>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">User's New Feeds This Week</div>
                        <div class="card-body">
                            <chart-card :chart-data="chartData"></chart-card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import StatsCard from "@/components/Cards/StatsCard.vue";
import ChartCard from "@/components/Cards/ChartCard";

export default {
  name: "dash",
  components: {
    "stats-card": StatsCard,
    "chart-card": ChartCard
  },
  data() {
    return {
      chartData: {},
      userCount: 0,
      musicCount: 0,
      feedCount: 0,
      loaded: false
    };
  },
  mounted() {
    this.$axios("/api/users/count").then(res => {
      this.userCount = res.data;
    });

    this.$axios.get("/api/musics/count").then(res => {
      this.musicCount = res.data;
    });

    this.$axios.get("/api/feeds/count").then(res => {
      this.feedCount = res.data;
    });

    this.$axios.get("/api/feeds/countHours").then(res => {
      this.chartData = res.data;
    });

    this.loaded = true;
  }
};
</script>

<style>
.card-title {
  margin: 10px 0 20px 0;
  color: #252422;
  font-weight: 300;
}

p {
  margin: 0;
}
</style>
