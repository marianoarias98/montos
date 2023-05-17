import { defineStore } from 'pinia'

const useMonto = defineStore('MontoStore',
  {
    state: () => {
      return {
        uriServer: 'http://127.0.0.1:8000/api'
      }
    },
    actions: {
      async crearMonto(concepto_id, colegio_id, personal, patronal, total, mes, año) {
        const url = `${this.uriServer}/montos/crear`
        const rawResponse = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            "concepto_id": concepto_id,
            'colegio_id': colegio_id,
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

      async getMontos(mes, anio, colegio_id) {
        const url = `${this.uriServer}/montos`
        const rawResponse = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            "mes": mes,
            "anio": anio,
            "colegio_id": colegio_id
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

      async updateMonto (id, concepto_id, colegio_id, personal, patronal, total, mes, año) {
        
        const url = `${this.uriServer}/monto/actualizar`
        const rawResponse = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            "id": id,
            "concepto_id": concepto_id,
            "colegio_id": colegio_id,
            "personal": personal,
            "patronal": patronal,
            "total": total,
            "mes": mes,
            "año": año
          })
        })
        const response = await rawResponse.json()
        return response.message
      }
    }
  })

export default useMonto