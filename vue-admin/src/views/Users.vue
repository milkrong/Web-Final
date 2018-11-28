<template>
    <div class="users" v-if="loaded">
        <el-table :data="tableData" class="col-12">
            <el-table-column prop="name" label="Name"></el-table-column>
            <el-table-column prop="username" label="Username"></el-table-column>
            <el-table-column prop="email" label="E-mail"></el-table-column>
            <el-table-column prop="created_at" label="Registered"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      loaded: false,
      tableData: []
    };
  },
  mounted() {
    this.$axios.get("/api/admin/alluser").then(res => {
      if (res) {
        this.tableData = res.data;
        this.loaded = true;
      }
    });
  }
};
</script>
