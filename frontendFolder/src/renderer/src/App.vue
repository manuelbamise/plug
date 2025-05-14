<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import TopBar from './components/TopBar.vue'
import ContentModels from './assets/contentModels.json'

const appName = ref('plug')
const drawerVisible = ref(true) // Or based on screen size initially
const rail = ref(false)

onMounted(() => {
  drawerVisible.value = true // Or false, depending on your desired initial state
  rail.value = true // Or true, if you want it in rail mode initially
})

const handleToggleDrawer = () => {
  if (drawerVisible.value) {
    // Ensure drawer is conceptually "on"
    rail.value = !rail.value
  } else {
    // If it was completely off, open it fully
    drawerVisible.value = true
    rail.value = false
  }
}

const prompt = ref('this is a test prompt')
const selectedModel = ref(null)
const contentModels = ref(ContentModels)
</script>

<template>
  <v-app>
    <TopBar :app-name="appName" @toggle-drawer="handleToggleDrawer" />

    <v-navigation-drawer
      v-model="drawerVisible"
      app
      :permanent="true"
      :rail="rail"
      color="grey-darken-3"
      width="256"
      @update:rail="(newRailState) => (rail = newRailState)"
    >
      <v-list>
        <v-list-item prepend-icon="mdi-home">
          <v-btn variant="text"> Generate text</v-btn>
        </v-list-item>
        <v-list-item prepend-icon="mdi-cog">
          <v-btn variant="text"> Generate text</v-btn>
        </v-list-item>
      </v-list>
      <template #append>
        <div class="pa-2">
          <v-btn block @click="rail = !rail">
            <v-icon v-if="rail" icon="mdi-arrow-expand-right"></v-icon>
            <v-icon v-else icon="mdi-arrow-expand-left"></v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main class="bg-grey-darken-2">
      <v-container fluid>
        <h2>This is the text place</h2>

        <v-textarea
          v-model="prompt"
          variant="outlined"
          label="What idea do you need more context on ?"
        ></v-textarea>
        <v-select
          v-model="selectedModel"
          label="Content model"
          :items="contentModels"
          item-value="id"
          item-title="model"
          variant="outlined"
        ></v-select>
        <v-btn>Plug it</v-btn>

        <p>{{ selectedModel }}</p>
      </v-container>
    </v-main>
  </v-app>
</template>
