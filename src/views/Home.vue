<template>
  <div class="home">
    <v-layout wrap>
      <template v-for="item in items">
        <v-flex xs12 sm6 md3 lg2 :key="item.woeid" px-1>
          <Weather :item="item"/>
        </v-flex>
      </template>
    </v-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Weather from "@/components/Weather";
import {WeatherMethods} from "@/mixins/WeatherMixins";

export default {
  name: 'Home',
  components: {
    Weather
  },
  mixins: [WeatherMethods],
  data: () => ({
    items: [],
    woeids: [560743, 2344116, 638242, 44418, 565346, 9807]
  }),
  mounted() {
    const items = []
    this.woeids.forEach(c => {
      items.push(this.location(c))
    })
    Promise.all(items).then(resp => {
      this.items = resp
    })
  }
}
</script>
