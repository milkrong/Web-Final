<template>
    <div class="register">
        <div class="container fill">
            <div class="row justify-content-center">
                <div class="col-lg-4 col-md-5 col-sm-8 register-form">    
                    <el-card class="p-lg-3">
                        <el-steps :active="$store.state.rstep.step" class="mb-4" align-center>
                            <el-step title="Register"></el-step>
                            <el-step title="Hobbies"></el-step>
                            <el-step title="Confirm"></el-step>
                        </el-steps>

                        <router-view></router-view>
                    </el-card>
                </div>
                <vue-particles 
                color="#409EFF"
                linesColor="#409EFF"
                class="particles"
                hoverMode="repulse">
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

    height: 100%
}

.fill {
    min-height: 100vh;
}
</style>

<script>
    import RegisterStep1 from '@/components/Register1'
    export default {
      name: 'register',
      components: {
        'register-step-1': RegisterStep1
      },
      data () {
        return {
          user: {}
        }
      }
    }
</script>