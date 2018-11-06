<template>
    <div class="login">
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-4 col-md-5 col-sm-8 login-form">
                    <el-card class="py-lg-3 px-lg-3 login-form">
                        <div class="text-muted text-center mb-3">
                            <small>Sign in with</small>
                        </div>
                        <div class="btn-wrapper text-center">
                            <el-button>
                                <img slot="icon" src="img/icons/common/github.svg">
                                Github
                            </el-button>

                            <el-button>
                                <img slot="icon" src="img/icons/common/google.svg">
                                Google
                            </el-button>
                        </div>
                        <div class="text-center text-muted mb-4">
                            <small>Or sign in with credentials</small>
                        </div>
                        <el-form>
                            <el-form-item label-width="0">
                                <el-input placeholder="Email"></el-input>
                            </el-form-item>
                            <el-form-item label-width="0">
                                <el-input placeholder="Password"></el-input>
                            </el-form-item>
                            <el-form-item label-width="0">
                                <el-checkbox label="remember me"></el-checkbox>
                            </el-form-item>
                            <div class="text-center">
                                <el-button type="primary">Sign In</el-button>
                            </div>
                        </el-form>

                        <div class="row mt-3">
                            <div class="col-6">
                                <a href="#">
                                    <small>Forgot password?</small>
                                </a>
                            </div>
                            <div class="col-6 text-right">
                                <a href="#">
                                    <small>Create new account</small>
                                </a>
                            </div>
                        </div>
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

<script>
    export default {
        name: 'login',
        components: {}
    }
</script>

<style>
.login {
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

.login-form {
    position: relative;
    z-index: 100;

    margin: 10% 0;
}

</style>
