import React from "react";
import Categories from "./Categories";
import Currency from "./Currency";
import Cart from "../../pages/Cart"


export default class HeaderTest extends React.Component{
    constructor(props){
        super(props)
        this.state={
            carencyVizible:false,
            cartVisible:false
        }
    }
    arrowClick=()=>{
        this.setState({
            carencyVizible:!this.state.carencyVizible
        })
    }
    showCart=()=>{
        this.setState({
            cartVisible:!this.state.cartVisible
        })
    }
    render(){
        return(
            <div className="header">
                <div className="categories"> 
                   <Categories activCategory={this.props.activCategory} changeCategory={this.props.changeCategory}/>
                </div>
                <p className="shop"></p>
                <div  className="cartPrice">  
                    <Currency  carencyVizible={this.state.carencyVizible}  onclick={this.props.changeCurrensy}/>
                    <p onClick={this.arrowClick}  className="price">{this.props.symbol}<span className={this.state.carencyVizible?"arrow up":"arrow down"}></span></p>
                   <p onClick={this.showCart} className="cart"><span className="counts">{this.props.counts}</span></p>
                </div>
               {this.state.cartVisible? <div className="smallCart">
                    <Cart countsSmall={this.props.counts} renderParent={this.props.renderParent} hideCart={this.showCart} currency={{'label':this.props.currency,'symbol':this.props.symbol}} small={true}/>
                </div>:''}
            </div>
        )
    }
}