<template>
  <v-main>
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
            {{ roundTemp(todayInfo.the_temp) }}&deg;C
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
      <template v-if="!toGenerator">
        <v-slider
            v-model="time"
            :max="tickLabels.length-1"
            :tick-labels="tickLabels"
            class="mx-4"
            ticks
        />

        <v-list class="transparent">
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                  :src="iconGenerator(selectedItem.weather_state_abbr)"
                  :alt="selectedItem.weather_state_name"
                  width="80"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-subtitle class="text-right">
              {{ roundTemp(selectedItem.min_temp) }} &deg;C
              /
              {{ roundTemp(selectedItem.max_temp) }} &deg;C
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </template>
    </v-card>
  </v-main>

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
    now: moment().format('YYYY-MM-DD'),
    time: 0
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
      return this.$router.currentRoute.name !== 'WeatherPage' ? {
        name: 'WeatherPage',
        params: {woeid: this.item.woeid}
      } : null
    },
    nextDays() {
      const consolidated_weather = [...this.item.consolidated_weather]
      consolidated_weather.shift()
      return consolidated_weather
    },
    tickLabels() {
      const labels = []
      this.nextDays.forEach(c => {
        labels.push(moment(c.applicable_date).format('dd'))
      })
      return labels
    },
    selectedItem() {
      return this.item.consolidated_weather[this.time + 1]
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
