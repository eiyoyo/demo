'use strict'

import Vue from 'vue'
import axios from 'axios'

let config = {
  timeout: 60 * 1000 // Timeout
}

const _axios = axios.create(config)
_axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    if (response.status === 200) {
      return Promise.resolve(response)
    } else if (response.status !== 200) {
      return Promise.reject(response)
    }
  },
  function (error) {
    // Do something with response error
    if (error.response) {
      if (error.response.status) {
        switch (error.response.status) {
        }
      }
    }
    return Promise.reject(error)
  }
)

Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
