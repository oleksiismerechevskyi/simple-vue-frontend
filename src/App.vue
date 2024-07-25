<template>
<v-app>
    <v-container class="container">
      <div class="header">
        <Menu />
      </div>
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
import Menu from './components/Menu.vue'
export default {
  
  components: {
    Menu
  }
}
</script>

<style>


</style>