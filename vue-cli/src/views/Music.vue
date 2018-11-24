<template>
    <div class="musics">

    </div>
</template>

<script>
export default {
    name: 'music',
    data () {
        return {
            musics: []
        }
    },
    created () {
        this.$axios.get('/api/musics/all')
            .then(res => {
                this.musics = res.data
                console.log(res.data.musics)
            })
    }
}
</script>

