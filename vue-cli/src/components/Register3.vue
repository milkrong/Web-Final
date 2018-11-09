<template>
    <div class="register">
        <el-form>
            <el-input type="text" placeholder="Enter 6 digits code" maxlength="6" v-model="code" clearable></el-input>
            <div class="text-center mt-4">
                <el-button type="primary" @click="confirm" :disabled = "isDisabled">Confirm</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "register-step3",
    methods: {
        confirm: function () {
        },
    },
    data: function () {
        return {
            code:''
        }
    },
    computed: {
            isDisabled() {
                if (this.code) return false;
                else return true;
            }
        }
}
</script>

