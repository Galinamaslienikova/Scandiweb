import React from "react";

export default class Attributes extends React.Component{
    render(){
        const{changeActive,active,attr}=this.props
        const result=active.length>0?attr.map((item)=>{
            const list=item.items.map((it)=>{
                const actives=active.filter((ind)=>{
                    return ind[item.id]
                })
               const str=item.name==='Color'?<p onClick={()=>{changeActive(item.id,it.id)}} key={it.value} style={{backgroundColor:it.value}}  className={actives[0][item.id]===it.id?'color isActiveColor':'color'}></p>
                :<p key={it.value} onClick={()=>{changeActive(item.id,it.id)}}  className={actives[0][item.id]===it.id?"size isActive":"size"}>{it.value}</p>
                return str
            })
            return < div key={item.name} >
               <p className="name">{item.name.toUpperCase()}</p>
                <div className="sizeCont">
                    {list}
                </div>   
                </div>
            }):''
        return(
            <>
                {result}
            </>
        )
    }
}