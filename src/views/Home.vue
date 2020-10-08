<template>
  <v-main>
    <ListOfWeather :items="items"/>
  </v-main>
</template>

<script>
// @ is an alias to /src
import {WeatherMethods} from "@/mixins/WeatherMixins";
import ListOfWeather from "@/components/ListOfWeather";

export default {
  name: 'Home',
  components: {
    ListOfWeather
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
