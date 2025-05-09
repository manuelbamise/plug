<script setup lang="ts">
//import { ref } from 'vue'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'


const appName = "plug"
const prompt = ref('')
const idea = ref('') // Added separate field for 'idea' as per your prompt

const models = ref([
  { id: '3-2-1', name: '3-2-1 Model' },
  { id: 'heros_journey', name: "The Hero's Journey Model" },
  { id: 'but_then_so', name: 'The But, Then, So Model' },
  { id: 'aida', name: 'AIDA Model' },
  { id: 'pas', name: 'Problem-Agitate-Solve (PAS) Model' },
])

const selectedModel = ref(models.value[0].id) // Default to the first model
const isLoading = ref(false)
const generatedContent = ref('')

const handleGenerate = async () => {
  if (!prompt.value.trim() && !idea.value.trim()) {
    alert('Please enter a prompt or an idea.')
    return
  }
  if (!selectedModel.value) {
    alert('Please select a structuring model.')
    return
  }

  isLoading.value = true
  generatedContent.value = '' // Clear previous content

  // Simulate API call
  console.log('Generating content with:', {
    prompt: prompt.value,
    idea: idea.value,
    model: selectedModel.value,
  })

  await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate delay

  generatedContent.value = `Generated content for:\nPrompt: "${prompt.value}"\nIdea: "${idea.value}"\nModel: "${models.value.find(m => m.id === selectedModel.value)?.name}".\n\nThis is where the structured content from the LLM will appear. It will be formatted based on the chosen model. For example, if the 3-2-1 model was chosen, you'd see 3 key takeaways, 2 supporting details, and 1 call to action here.`
  isLoading.value = false
}

// Reactive variable to control the drawer's visibility
const drawerVisible = ref(true) // Or false if you want it closed by default on desktop

// Reactive variable to control the "rail" state (mini-variant) for desktop
const rail = ref(false) // Start with full drawer or mini, as you prefer

// For handling mobile/desktop behavior
const windowWidth = ref(window.innerWidth)

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  drawerVisible.value = true;
  rail.value = false;
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

// Function to toggle the drawer's main visibility
const toggleDrawer = () => {
  if (rail.value) {
    rail.value = false; // Expand from rail
    drawerVisible.value = true; // Ensure it's visible
  } else {
    rail.value = true; // Collapse to rail
    drawerVisible.value = true; // Still "visible" in rail mode
  }
}

// If you allow expand-on-hover, you might want to update rail state
const handleRailUpdate = (newRailState: boolean) => {
  rail.value = newRailState
}
</script>

<template>
  <v-app>

    <v-app-bar color="grey">
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ appName }}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawerVisible" app :temporary="isMobile" :permanent="!isMobile && drawerVisible"
      :expand-on-hover="!isMobile && !drawerVisible && rail" :rail="!isMobile && rail" @update:rail="handleRailUpdate"
      color="grey-darken-3">
      <v-list>
        <v-list-item>
          <v-btn>Generating tab</v-btn>
        </v-list-item>
      </v-list>

      <template v-if="!isMobile" v-slot:append>
        <div class="pa-2">
          <v-btn block @click="rail = !rail">
            {{ rail ? 'Expand' : 'Collapse' }}
          </v-btn>
        </div>
      </template>

    </v-navigation-drawer>



    <v-main class="bg-gray-700">
      main content
    </v-main>
  </v-app>
</template>

<style scoped>
/* Scoped styles can be added here if needed, but Tailwind handles most of it. */
/* Make the select arrow visible on dark backgrounds (Tailwind sometimes needs help here) */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
