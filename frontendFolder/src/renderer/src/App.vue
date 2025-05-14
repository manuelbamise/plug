<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import TopBar from './components/TopBar.vue'

const appName = ref('plug')
const drawerVisible = ref(true) // Or based on screen size initially
const rail = ref(false)

onMounted(() => {
  drawerVisible.value = true // Or false, depending on your desired initial state
  rail.value = false // Or true, if you want it in rail mode initially
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
        <v-list-item prepend-icon="mdi-home" title="Dashboard"></v-list-item>
        <v-list-item prepend-icon="mdi-cog" title="Settings"></v-list-item>
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

    <v-main>
      <v-container fluid>
        <p>This is your main content area.</p>
        <p>
          It should start below the App Bar and be pushed by the Navigation Drawer when it's open on
          desktop.
        </p>
        <div style="height: 1500px; background: lightblue">Scrollable Content Block</div>
      </v-container>
    </v-main>
  </v-app>
</template>
