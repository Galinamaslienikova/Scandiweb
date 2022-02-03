import React from "react";
import { Link } from "react-router-dom";
import CartProduct from "../components/CartProduct";
import HeaderTest  from "../components/header/HeaderTest";
import { adToCart, getCounts, minusFromCart } from "../components/helpers";


export default class Cart extends React.PureComponent{
    constructor(props){
    super(props)
    this.state={
        products:[],
        counts:0
    }
    }
    loadPage=()=>{
        let arr=JSON.parse(localStorage.getItem("myCart"))
          this.setState({
            counts:getCounts(),
            products:arr
          }) 
    }
    componentDidMount(){
        this.loadPage()
    }
   
    static getDerivedStateFromProps( state) {
        let count=getCounts()
        if(count!==state.counts){
            let arr=JSON.parse(localStorage.getItem("myCart"))
           return {
            counts:getCounts(),
            products:arr
           }
        }
        return null;
      }
    addToCart=(d,name,arrAtr,price)=>{
        adToCart(d,name,arrAtr,price)
        this.loadPage()
        if(this.props.renderParent){this.props.renderParent()}
    }
    minus=(id,name,arrAtr)=>{
        minusFromCart(id,name,arrAtr)
        this.loadPage()
        if(this.props.renderParent){this.props.renderParent()}
    }
    render(){
        const{currency,small,changeCurrensy,hideCart}=this.props
        let total=0
        const result=this.state.products?this.state.products.map((item,ind)=>{
            const price=item.price.filter((item)=>{
                return item.currency.symbol===currency.symbol
             })
             total+=price[0].amount*item.counts
            return <CartProduct small={small} remove={this.minus} adToCart={this.addToCart} key={item.name+ind} product={item} symbol={currency.symbol} />
        }):<p>There are no products in the cart</p>
        return(
            <>
            <div className={small?"containerSmall":''}>
            </div>
                <div className="container">
                    {small?"":<HeaderTest renderParent={this.loadPage} symbol={currency.symbol} counts={this.state.counts} changeCurrensy={changeCurrensy}/>}
                    {small?<p className="smallCartTitle"><span>My bag</span>, {this.state.counts} items</p>:<p className="cartName">Cart</p>}
                    <div className="cartPage">
                        {result}
                    </div>
                    <p className="cartName"><span>Total:</span> <span>{currency.symbol}{total.toFixed(2)}</span></p>
                    {small?<div className="buttons"><Link  to='/cart'><button>VIEW BAG</button></Link><button onClick={hideCart}>CHEK OUT</button></div>:""}
                </div>
            </>
        )
    }
}