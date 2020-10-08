<template>
  <div>
    <v-layout wrap>
      <Weather :item="item"/>
    </v-layout>
  </div>
</template>

<script>
import Weather from "@/components/Weather";
import {WeatherMethods} from "@/mixins/WeatherMixins";

export default {
  name: 'WeatherPage',
  components: {
    Weather
  },
  mixins: [WeatherMethods],
  data: () => ({
    item: {}
  }),
  mounted() {
    const item = this.$router.currentRoute.params.woeid
    this.location(item).then(resp => this.$set(this, 'item', resp))
  }
}
</script>
