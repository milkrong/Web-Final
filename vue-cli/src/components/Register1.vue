<template>
<div class="register-step-1">
    <div class="text-center text-muted mb-4">
        <span>Welcome to postify music</span>
    </div>
    <el-form>
        <el-form-item label-width="0">
            <el-input placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
            <el-input placeholder="Password"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
            <el-input placeholder="Confirm Password"></el-input>
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
                    path: '/register/step2'
                });
                this.$emit('next-step');
            }
        }
    }
</script>

<style scoped>

</style>

