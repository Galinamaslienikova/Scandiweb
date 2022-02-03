import React from "react";
import { getProduct } from "../api/query";
import Attributes from "./Atribbutes";
import PictureCarusel from "./PictureCarusel";
import { changeActive } from "./helpers";
import { Link } from "react-router-dom";

export default class CartProduct extends React.Component{
    constructor(props){
        super(props)
        this.state={
            baseProd:false,
            active:[]
        }
    }
    componentDidMount(){
        getProduct(this.props.product.id)
        .then(result=>{
            this.setState({
                baseProd:result.data.product,
                active:this.props.product.attributes
            })

        })
    }
   static getDerivedStateFromProps(props, state) {
        if(state.active.length>0){
            const a=props.product.attributes.filter((item,index)=>{
                return Object.values(item) !== Object.values(state.active[index])
            })
            if (a.length>0){
                return{
                    active:props.product.attributes
                }  
            }else  return null
        }
        return null
    }
    changeActive=(name,value)=>{
        const arr=changeActive(name,value,this.state.active)
        this.setState({
            active:arr
        })
    }
    render(){
        const{product,symbol,small,adToCart,remove}=this.props
        const price=this.state.baseProd?this.state.baseProd.prices.filter((item)=>{
            return item.currency.symbol===symbol
        }):''
        return(
            <div className="cartProduct">
                <div className="aboutPr">
                    <div className="divCont">
                    <Link to={`/cats/${this.state.baseProd.category}/${product.id}`}><p className="brand">{this.state.baseProd.brand}</p></Link>
                    <Link to={`/cats/${this.state.baseProd.category}/${product.id}`}><p className="nameP">{product.name}</p></Link>
                    <p className="cost">{symbol} {(this.state.baseProd?price[0].amount*product.counts:0).toFixed(2)}</p>
                    </div>
                    <div className="attrInCart">
                        <Attributes changeActive={small?()=>{}:this.changeActive} cart={true} active={this.state.active}  attr={this.state.baseProd.attributes}/>
                    </div>
                </div>
                <div className="divCont2">
                    <div className="plusMinus">
                        <span onClick={()=>adToCart(product.id,this.state.baseProd.name,this.state.active,this.state.baseProd.prices)} className="plus">+</span>
                        <p className="total">{product.counts}</p>
                        <span onClick={()=>remove(product.id,this.state.baseProd.name,this.state.active)} className="plus">-</span>
                    </div>
                    {this.state.baseProd?<PictureCarusel gallery={this.state.baseProd.gallery}/>:''}
                </div>
            </div>
        )
    }
}