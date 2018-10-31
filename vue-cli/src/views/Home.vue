<template>

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="left-area col-lg-2 col-md-9 mr-lg-2">
            <profile-card></profile-card>
        </div>
        <div class="main-area col-lg-5 col-md-9">
            <new-feed-form></new-feed-form>
        </div>
         <div class="right-area col-lg-3 col-md-9 ml-lg-2">
         </div>
      </div>
  </div>
</template>

<script>
import ProfileCard from "@/components/ProfileCard";
import NewFeed from "@/components/NewFeed";

export default {
    components: {
        "profile-card": ProfileCard,
        "new-feed-form": NewFeed
    }
}
</script>
