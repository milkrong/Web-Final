<template>
  <div id="app">
    <router-view :user="user"/>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  name: "App",
  created() {
    if (localStorage.adminToken) {
      const decode = jwt_decode(localStorage.adminToken);
      this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
      this.$store.dispatch("setUser", decode);
      this.user = this.$store.getters.user;
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  },
  data() {
    return {
      user: this.$store.getters.user
    };
  }
};
</script>
