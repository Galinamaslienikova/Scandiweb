import React from "react";
import { withRouter } from 'react-router-dom';
import { getProduct } from "../api/query";
import HeaderTest from "../components/header/HeaderTest";
import { getCounts } from "../components/helpers";

import OneProduct from "../components/OneProduct";
export class ProductDetailsPage extends React.Component{
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
        return(
            <div className="container">
                    <HeaderTest renderParent={this.rendParent}  counts={this.state.counts} symbol={this.props.currency.symbol} currency={this.props.currency.label}  changeCurrensy={this.props.changeCurrensy}/>
                {this.state.product?<OneProduct 
                    rendParent={this.rendParent}
                    id={this.props.match.params.id}
                    label={this.props.currency.label}
                    symbol={this.props.currency.symbol}
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
