import axios from 'axios'

const productId = 1

axios.post('http://localhost:3001/graphql', {
  data:{
    query: `
      query {
        Product(productId: ${productId}){
          id
          title
          price
          description
          img_url
        }
      }
    `
  }
})

