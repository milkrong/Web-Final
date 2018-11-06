<template>
    <div class="register-step-2">
        <el-form>
            <el-tag
                v-for="tag in tags"
                :key="tag.name"
                closable
                class="mr-3">
            <el-button type="text" size="small">{{ tag.name }}</el-button> 
            </el-tag>
        </el-form>
    </div>
</template>

<script>
    export default {
       name: 'register-step2',
       data () {
           return {
               tags: [
                   {name: 'Pop'},
                   {name: 'Rock'},
                   {name: 'Hip-hop'}
               ]
           }
       },
       props: ['step'], 
    }
</script>
