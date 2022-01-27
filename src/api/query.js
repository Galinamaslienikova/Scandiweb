import {ApolloClient,InMemoryCache,gql} from "@apollo/client";
import { datas } from "./datas";


const defaultOptions={
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  }
}
  const client = new ApolloClient({
    uri:'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions

  });

    export function getCats(){
       return  client
            .query({
                query: gql`
                query GetCats ${ datas('GET_CATS')}
                `
            })     
    }
    export function getCurrencies(){
      return  client
           .query({
               query: gql`
               query GetCurrencies ${ datas('GET_CURRENCIES')}
               `
           })     
   }

   export function getProduct(id){ 
    return  client
    .query({
      query: gql`
      query GetCurrencies ${ datas('GET_PRODUCT').replace('myId','"'+id+'"')}
      `
  })
 }