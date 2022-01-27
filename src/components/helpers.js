
export const adToCart=(id,name,arrAtr,price)=>{
    let arr=JSON.parse(localStorage.getItem('myCart'))
    if(arr===null){
        localStorage.setItem("myCart",JSON.stringify([{
                'id':id,
                'name':name,
                'attributes':arrAtr,
                'counts':1,
                'price':price
            
        }]))
    } else{
        let same=true
        arr.forEach((elm)=>{
            if(elm.id===id){
                let a=elm.attributes.filter((item,index)=>{
               return Object.values(item)[0]===Object.values(arrAtr[index])[0]} ) 
             if(a.length===arrAtr.length){
                 same=false
                 elm.counts=elm.counts*1+1
             }
            }        
        })
        if(same){
            arr.push({
                'id':id,
                'name':name,
                'attributes':arrAtr,
                'counts':1,
                'price':price
            }) 
        }
      localStorage.setItem('myCart',JSON.stringify(arr))
    } 
}

export const minusFromCart=(id,name,arrAtr)=>{
    let arr=JSON.parse(localStorage.getItem('myCart'))
    arr.forEach((elm,index)=>{
        if(elm.id===id){
            let a=elm.attributes.filter((item,index)=>{
           return Object.values(item)[0]===Object.values(arrAtr[index])[0]} ) 
         if(a.length===arrAtr.length){
             elm.counts=elm.counts*1-1
             
         }
        } 
        if(elm.counts<=0){
            arr.splice(index,1)
        }       
    })
    localStorage.setItem('myCart',JSON.stringify(arr))
}

export const  changeActive=(name,value,active)=>{
    let number=active.findIndex((item)=>{
        return item[name]
    })
    let arr=active
     arr.splice(number,1,{[name]:value})
     return arr
}

export const changePicture=(arr,picture)=>{
    let num=arr.findIndex((item)=>{
        return item===picture
    })
    return num
}

export const getCounts=()=>{
    let arr=JSON.parse(localStorage.getItem("myCart"))
    let count=0
    if (arr){
      arr.forEach((item)=>{
          count+=item.counts
      })}
    return count
}