<template>
  <v-card
      :to="toGenerator"
      class="mx-auto"
      max-width="400"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{ title }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ todayTime }},
          {{ todayInfo.weather_state_name }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row align="center">
        <v-col
            class="display-3"
            cols="8"
        >
          {{ roundTemp(todayInfo.the_temp) }}
          <span class="column">
            <sup><small>{{ roundTemp(todayInfo.max_temp) }}</small></sup>
            <sub><small>{{ roundTemp(todayInfo.min_temp) }}</small></sub>
          </span>
        </v-col>
        <v-col cols="4">
          <v-img
              :src="iconGenerator(todayInfo.weather_state_abbr)"
              :alt="todayInfo.weather_state_name"
              width="80"
          ></v-img>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'
import {ICONS_BASE_URL} from "@/contants/config";

export default {
  name: "Weather",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    now: moment().format('YYYY-MM-DD')
  }),
  computed: {
    title() {
      return _.get(this, 'item.title', "")
    },
    todayInfo() {
      return this.item.consolidated_weather[0]
    },
    todayTime() {
      return moment(this.item.time).format('dddd')
    },
    toGenerator() {
      return this.$router.currentRoute.name !== 'WeatherPage' ? {name: 'WeatherPage', params: {woeid: this.item.woeid}} : null
    }
  },
  methods: {
    iconGenerator(weather_state_abbr) {
      return `${ICONS_BASE_URL}${weather_state_abbr}.svg`
    },
    roundTemp(temp) {
      return Math.round(temp)
    }
  }
}
</script>

<style scoped>
::v-deep span.column {
  flex-direction: column;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  vertical-align: text-top;
}
::v-deep sup,
sub {
  top: 0;
  bottom: 0;
  line-height: 1;
  font-size: .5em;
}
</style>
