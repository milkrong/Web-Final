<template>
    <!-- Profile Card -->
    <div class="card mt-5 shadow-sm profile-card">
        <img class="card-img-top" src="http://placehold.it/30x20" alt="Profile img">
        <div class="card-body">
            <h5 class="card-title">Eric Liu</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <ul class="list-group list-group-flush d-none d-lg-block">
            <li class="list-group-item">22 Followers</li>
            <li class="list-group-item">34 Following</li>
            <li class="list-group-item">34 Posts</li>
        </ul>
        <div class="card-body">
            <a href="personal.html" class="card-link">View Page</a>
        </div>
    </div>
    <!-- End Profile Card -->
</template>

<script>
    export default {
        name: "profile-card"
    }
</script>
