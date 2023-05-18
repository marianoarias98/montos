import { defineStore } from 'pinia'

const useIngreso = defineStore('IngresoStore', {
  state:() => {
    return {
      uriServer: 'http://127.0.0.1:8000/api'
    }
  },
  actions: {
    async getIngresos(mes, año, colegio_id) {
      const url = `${this.uriServer}/ingreso`
      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "mes": mes,
          "anio": año,
          "colegio_id": colegio_id
        })
      })
      const response = await rawResponse.json()
      return response
    }
  }
})

export default useIngreso