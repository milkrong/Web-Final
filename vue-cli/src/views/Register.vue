<template>
    <div class="register">
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-4 col-md-5 col-sm-8 register-form">    
                    <el-card class="py-lg-3 px-lg-3 login-form">
                        <el-steps :active="step" class="mb-4">
                        <el-step title="Register" icon="el-icon-edit"></el-step>
                        <el-step title="Hobbies" icon="el-icon-upload"></el-step>
                        <el-step title="Confirm" icon="el-icon-picture"></el-step>
                        </el-steps>

                        <router-view @next-step="step += 1"></router-view>
                    </el-card>
                </div>
                <vue-particles 
                color="#409EFF"
                linesColor="#409EFF"
                class="particles">
                </vue-particles>
            </div>
        </div>
    </div>
</template>

<style>
.register {
    position: relative;
}

.particles {
    position: absolute;
    width: 100%;
    height: 100%;

    top: 0;
    left: 0;
    z-index: 0;
}

.register-form {
    position: relative;
    z-index: 100;

    margin: 10% 0;
}
</style>

<script>
    import RegisterStep1 from "@/components/Register1"
    export default {
        name: 'register',
        components: {
            'register-step-1': RegisterStep1,
        },
        data () {
            return {
                step: 1
            };
        },
    }
</script>