// const http = 'https://my-json-server.typicode.com/alex1-w/jsonplaceholder-demo';
const http = axios.create({
    baseURL: 'http://localhost:3000',
})  