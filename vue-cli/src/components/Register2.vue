<template>
    <div class="register">
        <el-form>
            <el-checkbox-group v-model="checkedHobby">
              <el-checkbox v-for="hobby in hobbyList" :label="hobby" :key="hobby">{{hobby}}</el-checkbox>
            </el-checkbox-group>
            <div class="text-center">
              <el-button @click="skip">Skip</el-button>
              <el-button @click="submit" type="primary">Submit</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    export default {
      name: 'register-step2',
      props: ['user'],
      methods: {
        skip: function () {
          this.$router.push({
            path: 'step3'
          })
          this.$store.state.rstep.step = 3
        },
        submit: function () {
          if (this.checkedHobby) {
            this.user = this.$store.getters.register
            this.user.hobbies = this.checkedHobby
            this.$axios.post('/api/users/register/step2', this.user)
              .then((res) => {
                this.$message({
                  message: 'Submit Successfully',
                  type: 'success'
                })
                this.$router.push({
                  path: 'step3'
                })
                this.$store.state.rstep.step = 3
                console.log(this.user)
              })
          }
          this.$router.push({
            path: 'step3'
          })
          this.$store.state.rstep.step = 3
          console.log(this.checkedHobby)
        }
      },
      data () {
        return {
          hobbyList: ['Hip-hop', 'Pop', 'Classical', 'Jazz'],
          checkedHobby: []
        }
      },
      computed: {
        isDisabled () {
          if (this.checkedHobby !== []) return false
          else return true
        }
      }
    }
</script>
