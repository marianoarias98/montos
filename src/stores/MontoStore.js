import { defineStore } from 'pinia'

const useMonto = defineStore('MontoStore',
  {
    state: () => {
      return {
        uriServer: 'http://127.0.0.1:8000/api'
      }
    },
    actions: {
      async crearMonto(concepto_id, personal, patronal, total, mes = 5, año = 2023) {
        const url = `${this.uriServer}/montos/crear`
        const rawResponse = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            "concepto_id": concepto_id,
            "personal": personal,
            "patronal": patronal,
            "total": total,
            'mes': mes,
            'año': año
          })
        })
        const response = await rawResponse.json()
        return response.message
      },

      async getMontos() {
        const url = `${this.uriServer}/montos`
        const rawResponse = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })

        const response = await rawResponse.json()
        return response
      },
      async deleteMontos(id) {
        const url = `${this.uriServer}/montos/borrar`
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
        return response.message
      }
    }

    
  })

export default useMonto