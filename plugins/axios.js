import Vue from 'vue';
import axios from 'axios';

let service = axios.create({
  baseURL: '/api'
})

service.interceptors.response.use(
  async response => { 
    let { data } = response;


    return data
  }
)

Vue.prototype.$http = service;

export const http = service;