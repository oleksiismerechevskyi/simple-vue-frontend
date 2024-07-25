<template>
      <v-toolbar flat>
    <v-toolbar-title>Vuetify + Laravel</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-for="item in menuItems" :key="item.text" @click="navigateTo(item.route, item.redirect)" text>
      {{ item.text }}
    </v-btn>
  </v-toolbar>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    console.log(process.env.FOO)
    const router = useRouter()
    const menuItems = [
      { text: 'Home', route: '/' },
      { text: 'Users', route: '/users' },
      { text: 'Positions', route: '/positions' },
      { text: 'Token', route: '/token' },
      { text: 'Open API', redirect: 'http://2986536.mn550465.web.hosting-test.net/api/v1/documentation' },
      { text: 'Create User', route: '/create-user' }
    ]

    const navigateTo = (route, redirect) => {
        if(redirect !== undefined) {
            window.location = redirect
        }
      router.push(route)
    }

    return {
      menuItems,
      navigateTo
    }
  }
}
</script>
