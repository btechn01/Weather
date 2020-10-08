<template>
  <v-layout wrap>
    <template v-for="item in items">
      <v-flex xs12 sm6 md4 :key="item.woeid" pa-1>
        <Weather :item="item"/>
      </v-flex>
    </template>
  </v-layout>
</template>
<script>
import Weather from "@/components/Weather"

export default {
  name: 'ListOfWeather',
  components: {Weather},
  props: {
    items: {}
  }
}
</script>