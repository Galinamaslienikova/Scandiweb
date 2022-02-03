import React from "react";
import Categories from "./Categories";
import Currency from "./Currency";
import Cart from "../../pages/Cart"


export default class HeaderTest extends React.PureComponent{
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
        const{activCategory,changeCategory,renderParent,counts,currency,symbol}=this.props
        return(
            <div className="header">
                <div className="categories"> 
                   <Categories activCategory={activCategory} changeCategory={changeCategory}/>
                </div>
                <p className="shop"></p>
                <div  className="cartPrice">  
                    <Currency  carencyVizible={this.state.carencyVizible}  onclick={this.props.changeCurrensy}/>
                    <p onClick={this.arrowClick}  className="price">{this.props.symbol}<span className={this.state.carencyVizible?"arrow up":"arrow down"}></span></p>
                   <p onClick={this.showCart} className="cart"><span className="counts">{counts}</span></p>
                </div>
               {this.state.cartVisible? <div className="smallCart">
                    <Cart countsSmall={counts} renderParent={renderParent} hideCart={this.showCart} currency={{'label':currency,'symbol':symbol}} small={true}/>
                </div>:''}
            </div>
        )
    }
}