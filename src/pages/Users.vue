<template>
  <div class="pt-30">
    <h1>Users</h1>
    <v-row class="pt-30">
      <v-col v-for="user in users" :key="user.id" cols="12" md="2">
        <v-card class="list_card">
          <v-list-item class="list_item">
            <v-list-item-avatar>
              <v-img :src="`${user.photo}`"></v-img>
            </v-list-item-avatar>
            <v-list-item-group class="list_item__content">
              <v-list-item-title>{{ user.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.position }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ user.phone }}</v-list-item-subtitle>
            </v-list-item-group>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-btn class="show-more__btn" @click="fetchMoreUsers">Show More</v-btn>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const users = ref([])
    const page = ref(1)

    const fetchUsers = async () => {
      const response = await axios.get(`http://2986536.mn550465.web.hosting-test.net/api/v1/users?page=${page.value}&count=6`)
      if( response.data.links.next_url == null ) {
        page.value = undefined;
      }
      users.value = users.value.concat(response.data.users)
    }

    const fetchMoreUsers = () => {
        if(page.value) {
            page.value++
            fetchUsers()
        }
    }

    onMounted(fetchUsers)

    return {
      users,
      fetchMoreUsers
    }
  }
}
</script>


<style>
.show-more__btn {
    display: block;
    margin: 20px auto;
}
.pt-30 {
    padding-top: 30px;
}
.list_item {
    padding: 20px;
}
.list_item__content {
    margin-top: 20px;
    display: block;
    text-align: center;
}

.list_card {
    min-height: 300px;
}
</style>