import axios from 'axios';

const product = {
  title: 'un titulo',
  price: 12,
  description: 'una descripcion',
  img_url: 'http://localhost:3001/graphql.jpg',
  client: {
    name: 'Carlos',
    id: 1,
  },
};

axios.post('http://localhost:3001/graphql', {
  data: {
    query: `
      mutation {
        CreateProduct(title: "${product.title}", price:${product.price}, ){
            id
            title
            price
            description
            img_url
        }
      }
    `,
  },
});
