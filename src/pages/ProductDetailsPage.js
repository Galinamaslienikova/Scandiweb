import React from "react";
import { withRouter } from 'react-router-dom';
import { getProduct } from "../api/query";
import HeaderTest from "../components/header/HeaderTest";
import { getCounts } from "../components/helpers";

import OneProduct from "../components/OneProduct";
export class ProductDetailsPage extends React.PureComponent{
    constructor(props){
        super(props)
        this.state={
            product:false,
            counts:0
        }
    }
    componentDidMount(){
        getProduct(this.props.match.params.id)
        .then(result=>{
            this.setState({
                product:result.data.product,
                counts:getCounts()
            })
        })  
    }
    rendParent=()=>{
        this.setState({
            counts:getCounts()
        })
    }
    render(){
        const{currency,changeCurrensy}=this.props
        return(
            <div className="container">
                    <HeaderTest renderParent={this.rendParent}  counts={this.state.counts} symbol={currency.symbol} currency={currency.label}  changeCurrensy={changeCurrensy}/>
                {this.state.product?<OneProduct 
                    rendParent={this.rendParent}
                    id={this.props.match.params.id}
                    label={currency.label}
                    symbol={currency.symbol}
                    gallery={this.state.product.gallery} 
                    name={this.state.product.name} 
                    brand={this.state.product.brand} 
                    atributes={this.state.product.attributes} 
                    description={this.state.product.description}
                    price={this.state.product.prices}
                    inStock={this.state.product.inStock}
                />:''}
            </div>
        )
    }
}
export default withRouter(ProductDetailsPage)
