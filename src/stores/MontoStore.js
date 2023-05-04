import { defineStore } from 'pinia'

const useMonto = defineStore('MontoStore',
  {
    state: () => {
      return {
        uriServer: 'http://127.0.0.1:8000/api'
      }
    },
    actions: {
      async crearMonto(concepto_id, personal, patronal, total, mes, año) {
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

      async getMontos(mes, anio) {
        const url = `${this.uriServer}/montos`
        const rawResponse = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            "mes": mes,
            "anio": anio
          })
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
      },

      async getMontoByID(id) {
        const url = `${this.uriServer}/monto`
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
      },

      async updateMonto (id, concepto_id, personal, patronal, total) {
        
        const url = `${this.uriServer}/monto/update`
        const rawResponse = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            "id": id,
            "concepto_id": concepto_id,
            "personal": personal,
            "patronal": patronal,
            "total": total,
            "mes": 3,
            "año": 2023
          })
        })
        const response = await rawResponse.json()
        return response.message
      }
    }

    
  })

export default useMonto