<template>
  <v-main>
    <template v-if="loaded">
      <ListOfWeather :items="finalResult" v-if="finalResult.length > 0"/>
      <NoResult v-else/>
    </template>
  </v-main>
</template>

<script>
import {WeatherMethods} from "@/mixins/WeatherMixins";
import ListOfWeather from "@/components/ListOfWeather";
import NoResult from "@/components/NoResult";

export default {
  name: "SearchPage",
  components: {NoResult, ListOfWeather},
  mixins: [WeatherMethods],
  data: () => ({
    queryResult: [],
    finalResult: [],
    loaded: false,
  }),
  methods: {},
  mounted() {
    this.search(this.$router.currentRoute.params.keyword)
        .then(resp => this.$set(this, 'queryResult', resp))
        .then(() => {
          const items = []
          this.queryResult.forEach(c => {
            items.push(this.location(c.woeid))
          })
          Promise.all(items).then(resp => {
            this.$set(this, 'finalResult', resp)
            this.$set(this, 'loaded', true)
          })
        })
  }
}
</script>

<style scoped>

</style>
