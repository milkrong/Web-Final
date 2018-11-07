<template>
<div class="register">
    <div class="text-center text-muted mb-4">
        <span>Welcome to postify music</span>
    </div>
    <el-form>
        <el-form-item label-width="0">
            <el-input placeholder="Email" v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
            <el-input placeholder="Username" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
            <el-input placeholder="Password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
            <el-input placeholder="Confirm Password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
            <el-checkbox>I Agree with Privacy Policy</el-checkbox>
        </el-form-item>
        <div class="text-center">
            <el-button type="primary" @click="signup">Sign up</el-button>
        </div>
    </el-form>
</div>
</template>

<script>
    export default {
        name: 'register-step1',
        methods: {
            signup () {
                this.$router.push({
                    path: 'register/step2'
                });
                this.$emit('next-step');
            }
        },
        data () {
            return {
                user: {
                    username: "",
                    email: "",
                    password: ""
                }
            }
        }
    }
</script>

<style scoped>

</style>

