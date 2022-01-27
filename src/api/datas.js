
export function datas(data){
    switch (data){
        case 'GET_CATS' :
            return  `{
              categories{
                name
              products{
                     id
                    name
                    gallery
                    inStock
                    category
                    prices{
                      currency{
                        label
                      }
                      amount
                    }
              }
              }
              }`
          case 'GET_CURRENCIES':
            return `{
              currencies{
                label
                symbol
              }
            }`
          case 'GET_PRODUCT':
            return`{
              product(id:myId){
               name
                inStock
                gallery
                description
                category
                attributes {
                  id
                  name
                  type
                  items{
                    displayValue
                    value
                    id
                  }
                  
                }
                prices{
                  currency{
                    label
                    symbol
                  }
                  amount
                }
                brand
              }
            }`
              default:
                return ""
    }
        
    
}