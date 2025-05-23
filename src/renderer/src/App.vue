<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import TopBar from './components/TopBar.vue'
import NavigationDrawer from './components/NavigationDrawer.vue'
import ContentModels from './assets/contentModels.json'

const appName = ref('plug')
const drawerVisible = ref(true)

const rail = ref(false)
const toggleRail = (): void => {
  rail.value = !rail.value
}

onMounted(() => {
  drawerVisible.value = true
  rail.value = true
})

const handleToggleDrawer = (): void => {
  if (drawerVisible.value) {
    rail.value = !rail.value
  } else {
    drawerVisible.value = true
    rail.value = false
  }
}

const prompt = ref('')
const selectedModel = ref(null)
const contentModels = ref(ContentModels)
const sentData = ref(null)

const handleSend = (): void => {
  const dataToSend = {
    prompt: prompt.value,
    selectedModel: selectedModel.value,
    timestamp: new Date().toLocaleString()
  }

  sentData.value = dataToSend

  prompt.value = ''
  selectedModel.value = null
}

const loading = ref(false)
function load(): void {
  loading.value = true
  setTimeout(() => (handleSend(), (loading.value = false)), 3000)
}
</script>

<template>
  <v-app>
    <TopBar :app-name="appName" @toggle-drawer="handleToggleDrawer" />

    <NavigationDrawer v-model="drawerVisible" :rail="rail" @toggle-rail="toggleRail" />
    <v-main class="bg-grey-darken-2">
      <v-container fluid>
        <h2>This is the text place</h2>
        <!--TODO find a better design to add here for the main text generation page-->
        <v-textarea
          v-model="prompt"
          variant="outlined"
          label="What idea do you need more context on ?"
        ></v-textarea>
        <v-select
          v-model="selectedModel"
          label="Content model"
          :items="contentModels"
          item-title="model"
          item-value="id"
          variant="outlined"
        ></v-select>
        <v-btn :loading="loading" @click="load">Plug it</v-btn>

        <!--<div>
          <div v-for="model in ContentModels" :key="model.id">
            <div v-if="selectedModel == model.id">
              {{ model.description }}
            </div>
          </div>
        </div>-->

        <div v-if="sentData">
          <h2>Simulated Database Entry:</h2>
          <p><strong>Prompt:</strong> {{ sentData.prompt }}</p>
          <p><strong>Selected Model:</strong> {{ sentData.selectedModel }}</p>
          <p v-if="sentData.timestamp"><strong>Timestamp:</strong> {{ sentData.timestamp }}</p>
        </div>
        <!--<div v-else>
          <p>No data "sent" yet.</p>
        </div>-->
      </v-container>
    </v-main>
  </v-app>
</template>
