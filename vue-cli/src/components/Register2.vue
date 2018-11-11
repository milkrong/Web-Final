<template>
    <div class="register">
        <el-form :model="hobbyForm">
            <el-tag
                v-for="hobby in hobbies"
                :key="hobby.name"
                class="mx-2 my-2">
                <el-checkbox :label="hobby.name" @change="addHobby"></el-checkbox>
            </el-tag>
            <div class="text-center mt-4">
                <el-button @click="skip">Skip</el-button>
                <el-button type="primary" @click="submit"  :disabled="isDisabled">Submit</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    export default {
      name: 'register-step2',
      methods: {
        skip: function () {
          this.$emit('next-step')
          this.$router.push({
            path: 'step3'
          })
        },
        submit: function () {
          this.$router.push({
            path: 'step3'
          })
          this.$emit('next-step')
        },
        addHobby: function (value) {
          this.hobbyForm.hobbies.push({
            name: value
          })
        }
      },
      data () {
        return {
          hobbies: [
            { name: 'Hiphop' },
            { name: 'Pop' },
            { name: 'Classical' },
            { name: 'Jazz' }
          ],
          hobbyForm: {
            hobbies: []
          }
        }
      },
      computed: {
        isDisabled () {
          if (this.hobbyForm.hobbies !== []) return false
          else return true
        }
      }
    }
</script>
