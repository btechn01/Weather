<template>
  <v-app id="inspire">
    <v-app-bar
        app
        color="white"
        flat
    >
      <v-toolbar-title>
        <v-btn :to="{name: 'HomePage'}" text>Weather</v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-layout wrap>
        <v-flex xs6 offset-xs6>
          <v-form ref="form" lazy-validation class="pt-6" @submit.prevent="searchCall()">
            <v-text-field
                v-model="search_text"
                placeholder="Search"
                solo
                dense
            >
              <template v-slot:append>
                <v-btn text type="submit">
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-form>
        </v-flex>
      </v-layout>
    </v-app-bar>
    <v-main>
      <v-carousel-transition>
        <router-view :key="$route.fullPath"/>
      </v-carousel-transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    search_text: null
  }),
  methods: {
    searchCall() {
      this.$router.push({name: 'SearchPage', params: {keyword: this.search_text}})
    },
  },
};
</script>
