<template>
    <div class="register">
        <el-form>
            <el-input placeholder="Enter the code"></el-input>
            <div class="text-center mt-4">
                <el-button type="primary" @click="confirm">Confirm</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "register-step3",
    methods: {
        confirm () {
        }
    }
}
</script>

