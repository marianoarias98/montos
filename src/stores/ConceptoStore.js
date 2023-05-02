import { defineStore } from 'pinia'

const useConcepto = defineStore('ConceptoStore',
  {
    state: () => {
      return {
        uriServer: 'http://127.0.0.1:8000/api'
      }
    },
    actions: {
      async getConceptos() {
        const url = `${this.uriServer}/conceptos`
        const rawResponse = await fetch(url,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        const response = await rawResponse.json()
        return response

      }
    }
  })

  export default useConcepto