<script lang="ts" setup>
defineProps({
  rail: {
    type: Boolean
  }
})

//defining the event that the component will emit
const emit = defineEmits(['toggle-rail'])

// Method to be called when the nav icon is clicked
const handleToggleRail = (): void => {
  emit('toggle-rail') // Emit the custom event
}
</script>
<template>
  <v-navigation-drawer
    app
    :permanent="true"
    :rail="rail"
    color="grey-darken-3"
    width="256"
    @update:rail="(newRailState) => (rail = newRailState)"
  >
    <v-list>
      <!--TODO: Fix this to be able to navigate between different pages and their icons can be clicked and interacted with-->
      <v-list-item prepend-icon="mdi-home" class="">
        <v-btn variant="text"> Generate text</v-btn>
      </v-list-item>
      <v-list-item prepend-icon="mdi-cog">
        <v-btn variant="text"> Generate text</v-btn>
      </v-list-item>
    </v-list>

    <template #append>
      <div class="pa-2">
        <v-btn block @click="handleToggleRail">
          <v-icon v-if="rail" icon="mdi-arrow-expand-right"></v-icon>
          <v-icon v-else icon="mdi-arrow-expand-left"></v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
