import Vue from 'vue'
import axios from 'axios'
import {BASE_URL} from "@/contants/config";

axios.defaults.baseURL = BASE_URL

Object.defineProperty(Vue.prototype, '$axios', {value: axios})
