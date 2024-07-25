<template>
  <v-container>
  <div >
    <h1>Create user form</h1>
  </div >
    <v-form @submit.prevent="submitForm">
      <v-text-field
        v-model="form.name"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="form.email"
        label="Email"
        required
      ></v-text-field>

      <v-text-field
        v-model="form.phone"
        label="Phone"
        required
      ></v-text-field>

      <v-select
        v-model="form.position"
        :items="positions"
        item-title="name"
        item-value="id"
        label="Position"
        required
      ></v-select>

      <v-file-input
        v-model="form.photo"
        label="Photo"
        accept="image/*"
        required
      ></v-file-input>

      <v-btn type="submit" color="primary">Submit</v-btn>
    </v-form>

    <!-- Popup Dialog -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">API Response</v-card-title>
        <v-card-text>
          {{ apiResponse }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDialog">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import VueCookies from 'vue-cookies'

export default {
  setup() {
    const form = ref({
      name: '',
      email: '',
      phone: '',
      position: null,
      photo: null
    })

    const positions = ref([])
    const dialog = ref(false)
    const apiResponse = ref('')

    const fetchPositions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/positions')  // Adjust the URL to your API endpoint
        positions.value = response.data.positions.map(post => ({ id: post.id, name: post.name }))
      } catch (error) {
        console.error('Error fetching positions:', error)
      }
    }

    const submitForm = async () => {
      const formData = new FormData()
      formData.append('name', form.value.name)
      formData.append('email', form.value.email)
      formData.append('phone', form.value.phone)
      formData.append('position_id', form.value.position)
      formData.append('photo', form.value.photo)

      try {
        let token = null;

        if ( VueCookies.get('token') ) {
            token = VueCookies.get('token')
        } else {
            token = await axios.get(`http://localhost:3000/api/v1/token`)
            token = token.data.token;
            VueCookies.set('token', token, "40m")
        }

        const response = await axios.post('http://localhost:3000/api/v1/users', formData, {
        headers: {
        'Content-Type': 'multipart/form-data',
        'Token': token
        }})
        apiResponse.value = `User created: ${JSON.stringify(response.data.message)}`
      } catch (error) {
        apiResponse.value = `Error creating user: ${error.message}`
      } finally {
        VueCookies.remove('token');
        dialog.value = true
      }
    }

    const closeDialog = () => {
      dialog.value = false
    }

    onMounted(fetchPositions)

    return {
      form,
      positions,
      dialog,
      apiResponse,
      submitForm,
      closeDialog
    }
  }
}
</script>