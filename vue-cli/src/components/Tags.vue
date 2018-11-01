<template>
    <div class="tags shadow-sm">
        <div class="tags-head">
            <span>Categories</span>
        </div>
        <div class="tags-body">
            <a href="#Posts"><span class="badge badge-pill badge-primary">#Posts</span></a>
            <a href="#MV"><span class="badge badge-pill badge-primary">#MV</span></a>
            <a href="#Music"><span class="badge badge-pill badge-primary">#Music</span></a>
            <a href="#Pop"><span class="badge badge-pill badge-success">#Pop Music</span></a>
            <a href="#Hip"><span class="badge badge-pill badge-success">#Hip Hop</span></a>
        </div>
    </div>
</template>

<style>
.tags {
    margin-top: 20px;
    background: #fff;
    width: 90%;
}

.tags .tags-head {
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
    padding: 10px 20px;
}

.tags .tags-body {
    text-align: center;
    padding: 10px;
}

.tags .badge {
    margin: 0 2px;
}

</style>

<script>
export default {
    name: "tags"
}
</script>


