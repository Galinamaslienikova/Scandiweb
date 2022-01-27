import React from "react";

export default class Attributes extends React.Component{
    render(){
        let result=this.props.active.length>0?this.props.attr.map((item)=>{
            let list=item.items.map((it)=>{
               let active=this.props.active.filter((ind)=>{
                    return ind[item.id]
                })
                let str=item.name==='Color'?<p onClick={()=>{this.props.changeActive(item.id,it.id)}} key={it.value} style={{backgroundColor:it.value}}  className={active[0][item.id]===it.id?'color isActiveColor':'color'}></p>
                :<p key={it.value} onClick={()=>{this.props.changeActive(item.id,it.id)}}  className={active[0][item.id]===it.id?"size isActive":"size"}>{it.value}</p>
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