<template>
  <v-main>
    <v-card
        class="mx-auto"
        max-width="700"
    >
      <v-list-item two-line>
        <v-list-item-content>
            <v-list-item-title class="headline text-center">
            No results were found. Try changing the keyword!
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-main>

</template>

<script>
export default {
  name: "NoResult"
}
</script>

<style scoped>
</style>
