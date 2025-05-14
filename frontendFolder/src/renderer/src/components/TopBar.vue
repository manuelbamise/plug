<script setup lang="ts">
import { ref } from 'vue'

//defining the props that the component will accept
defineProps({
  appName: {
    type: String,
    default: 'My Application'
  }
})

//defining the event that the component will emit
const emit = defineEmits(['toggle-drawer'])

// Method to be called when the nav icon is clicked
const handleNavIconClick = () => {
  emit('toggle-drawer') // Emit the custom event
}
</script>

<template>
  <v-app-bar app color="grey">
    <v-app-bar-nav-icon @click="handleNavIconClick">
      <v-icon icon="mdi-menu"></v-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-title>{{ appName }}</v-toolbar-title>
  </v-app-bar>
</template>
