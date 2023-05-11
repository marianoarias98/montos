import { defineStore } from 'pinia'

const useColegio = defineStore('ColegioStore', {
  state: () => {
    return {
      uriServer: 'http://127.0.0.1:8000/api'
    }
  },
  actions: {
    async getColegios() {
      const url = `${this.uriServer}/colegios`
      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      const response = await rawResponse.json()
      return response
    },

    async getColegioById(id) {
      const url = `${this.uriServer}/colegio`
      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "id": id
        })
      })
      const response = await rawResponse.json()
      return response
    }
  }
})

export default useColegio