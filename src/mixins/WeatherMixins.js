import {LOCATION_PATH, SEARCH_PATH} from "@/contants/config";

export const WeatherMethods = {
    methods: {
        search(search) {
            return new Promise((resolve => {
                this.$axios.get(`${SEARCH_PATH}${search}`)
                    .then(({data}) => {
                        resolve(data)
                    })
            }))
        },
        location(woeid) {
            return new Promise((resolve => {
                this.$axios.get(`${LOCATION_PATH}${woeid}`).then(({data}) => {
                    resolve(data)
                })
            }))
        }
    }
}
