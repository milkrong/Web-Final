<template>
    <div class="upload">
      <div class="musics-table" v-if="loaded">
        <el-table
          :data="musics"
          border
          style="width: 100%">
          <el-table-column
            prop="title"
            label="Title">
          </el-table-column>
          <el-table-column
            prop="artist"
            label="Artist">
          </el-table-column>
          <el-table-column
            prop="src"
            label="Source">
          </el-table-column>
        </el-table>
      </div>
      <div class="upload"></div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      musics: [],
      loaded: false
    };
  },
  created() {
    this.$axios.get("/api/musics/all").then(res => {
      this.musics = res.data;
      this.loaded = true;
    });
  }
};
</script>
