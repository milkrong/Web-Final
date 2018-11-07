<template>
    <div class="register">
        <el-form>
            <el-tag
                v-for="hobby in user.hobbies"
                :key="hobby"
                closable
                class="mr-3 my-2">
                <el-button type="text" size="small">{{ hobby }}</el-button> 
            </el-tag>
            <div class="text-center mt-4">
                <el-button @click="skip">Skip</el-button>
                <el-button type="primary" @click="submit">Submit</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    export default {
       name: 'register-step2', 
       methods: {
           skip: function () {
               this.$emit('next-step');
               this.$router.push({
                   path: 'step3'
               });
           },
           submit: function () {
               this.$router.push({
                   path: 'step3'
               });
               this.$emit('next-step');
           }
       },
       data () {
           return {
               user: {
                   hobbies:['Pop', 'Hiphop', 'R&B', 'Classical']
               }
           }
       }
    }
</script>
