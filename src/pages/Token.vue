<template>
    <v-container class="align-center ">
    <v-row class="pt-30">
      <v-col>
        <h1 class="display-2 text-center">YOUR TOKEN IS:</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1 class="display-2 text-center">{{ token }}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue'
import VueCookies from 'vue-cookies'
import axios from 'axios'

export default {
  setup() {
    const token = ref('')

    onMounted(async () => {
        let data = null;

        if ( VueCookies.get('token') ) {
            data = VueCookies.get('token')
        } else {
            data = await axios.get(`http://localhost:3000/api/v1/token`)
            data = data.data.token;
            VueCookies.set('token', data, "40m")
        }
        
        token.value = data
    })

    return {
      token
    }
  }
}
</script>

<style>
.pt-30 {
    padding-top: 30px;
}
h1 {
  word-wrap: break-word;
}
</style>