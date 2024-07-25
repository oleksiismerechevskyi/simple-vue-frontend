<template>
  <div class="pt-30">
    <h1>Positions</h1>
    <v-row class="pt-30">
      <v-col v-for="position in positions" :key="position.id" cols="12" md="3">
        <v-card>
          <v-list-item class="list_item">
            <v-list-item-content>
              <v-list-item-title>{{ position.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ position.id }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const positions = ref([])

    const fetchPositions = async () => {
      const response = await axios.get(`http://localhost:3000/api/v1/positions`)
      positions.value = positions.value.concat(response.data.positions)
    }

    onMounted(fetchPositions)

    return {
      positions,
      fetchPositions
    }
  }
}
</script>


<style>
.pt-30 {
    padding-top: 30px;
}

.list_item {
    padding: 20px;
}
</style>
