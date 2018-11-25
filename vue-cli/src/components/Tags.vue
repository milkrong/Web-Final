<template>
    <div class="tags shadow-sm">
        <div class="tags-head">
            <span>Categories</span>
        </div>
        <div class="tags-body">
            <div class="tag" v-for="tag in categories" :key="tag">
                <a href="#tag">
                    <span class="badge badge-pill badge-success">#{{tag}}</span>
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
    padding: 10px;
}

.tag {
    display: inline
}

.tags .badge {
    margin: 0 2px;
}

</style>

<script>
export default {
    name: "tags",
    data() {
        return {
            categories:['All','Classical','Country','Jazz','R&B','Rock','Pop']
        }
    }
}
</script>


