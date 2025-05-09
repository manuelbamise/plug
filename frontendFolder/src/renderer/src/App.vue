<script setup lang="ts">
import { ref } from 'vue'

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
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 p-4 font-sans">
    <div class="w-full max-w-2xl bg-gray-800 shadow-2xl rounded-lg p-6 md:p-8">
      <header class="mb-8 text-center">
        <h1 class="text-4xl font-bold text-sky-400">{{ appName }}</h1>
        <p class="text-gray-400 mt-1">Your AI-Powered Content Structuring Assistant</p>
      </header>

      <main class="space-y-6">
        <div>
          <label for="prompt" class="block text-sm font-medium text-gray-300 mb-1">
            Your Primary Prompt
          </label>
          <textarea id="prompt" v-model="prompt" rows="4"
            placeholder="Enter your main topic or question for the internet scrape..."
            class="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 text-gray-200 placeholder-gray-500 transition duration-150"></textarea>
        </div>

        <div>
          <label for="idea" class="block text-sm font-medium text-gray-300 mb-1">
            Your Core Idea/Angle (Optional)
          </label>
          <input type="text" id="idea" v-model="idea" placeholder="Add a specific angle or idea to focus on..."
            class="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 text-gray-200 placeholder-gray-500 transition duration-150" />
        </div>

        <div>
          <label for="model" class="block text-sm font-medium text-gray-300 mb-1">
            Information Structuring Model
          </label>
          <select id="model" v-model="selectedModel"
            class="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 text-gray-200 appearance-none pr-8 bg-no-repeat transition duration-150"
            style="background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%239ca3af%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E'); background-position: right 0.75rem center; background-size: 1.5em 1.5em;">
            <option disabled value="">Select a model</option>
            <option v-for="modelItem in models" :key="modelItem.id" :value="modelItem.id">
              {{ modelItem.name }}
            </option>
          </select>
        </div>

        <button @click="handleGenerate" :disabled="isLoading"
          class="w-full flex items-center justify-center py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 transition duration-150 disabled:opacity-70 disabled:cursor-not-allowed">
          <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          {{ isLoading ? 'Generating...' : 'Generate Content' }}
        </button>
      </main>

      <footer v-if="generatedContent || isLoading" class="mt-8 pt-6 border-t border-gray-700">
        <h3 class="text-lg font-semibold text-gray-300 mb-2">Generated Output:</h3>
        <div v-if="isLoading && !generatedContent"
          class="w-full p-4 bg-gray-700 border border-gray-600 rounded-md min-h-[100px] flex items-center justify-center text-gray-400">
          Processing your request...
        </div>
        <div v-if="generatedContent"
          class="w-full p-4 bg-gray-700 border border-gray-600 rounded-md min-h-[100px] text-gray-200 whitespace-pre-wrap">
          {{ generatedContent }}
        </div>
      </footer>
    </div>
    <div class="text-center mt-8 text-xs text-gray-500">
      <p>&copy; {{ new Date().getFullYear() }} {{ appName }}. All rights reserved.</p>
      <p>Nigeria | Current Time: {{ new Date().toLocaleTimeString('en-NG', { timeZone: 'Africa/Lagos' }) }}</p>
    </div>
  </div>
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
