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
                        <div class="card-header">User's New Feeds Every Day</div>
                        <div class="card-body">
                            <chart-card :chart-data="lineChart.data"></chart-card>
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
      lineChart: {
        data: {
          labels: [
            "9:00AM",
            "12:00AM",
            "3:00PM",
            "6:00PM",
            "9:00PM",
            "12:00PM",
            "3:00AM",
            "6:00AM"
          ],
          datasets: [
            {
              label: "User",
              backgroundColor: "#f87979",
              data: [287, 385, 490, 492, 554, 586, 698, 695]
            }
          ]
        }
      },
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
