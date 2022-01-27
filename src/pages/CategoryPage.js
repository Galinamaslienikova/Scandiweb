
import React from "react";
import { withRouter } from "react-router-dom";
import { getCats } from "../api/query";
import HeaderTest  from "../components/header/HeaderTest";
import { getCounts } from "../components/helpers";
import ProductMain from "../components/ProductMain";


export class CategoryPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            cats:[],
            activCategory:false,
            counts:0
        }
        
    }
    componentDidMount(){
        getCats()
        .then(result => {
            let cats=this.props.match.params.id?result.data.categories.filter((item)=>{
                return this.props.match.params.id===item.name
            }):""
            this.setState({
            cats:result.data.categories,
            activCategory:cats===""?result.data.categories[0]:cats[0],
            counts:getCounts(),
        })
    })
    }
    changeCategory=(e)=>{
        let arr=this.state.cats.filter((item)=>{
            return item.name===e
        })
        this.setState({
            activCategory:arr[0]
        })
    }
    render(){
        let products=this.state.activCategory?this.state.activCategory.products.map((item)=>{
            let carrent=item.prices.filter((label)=>{
                return label.currency.label===this.props.currency.label
            })
            return <ProductMain category={item.category} id={item.id} instock={item.inStock} currency={this.props.currency.label} key={item.id} name={item.name} image={item.gallery[0]} price={carrent[0].amount}/>
        }):""
        return(
            <div className="container">
                <HeaderTest counts={this.state.counts} activCategory={this.state.activCategory} changeCategory={this.changeCategory} symbol={this.props.currency.symbol} currency={this.props.currency.label}  changeCurrensy={this.props.changeCurrensy} />
                <p className="categoryName">{this.state.cats.length<1?"":this.state.activCategory.name.toUpperCase()}</p>
                <div className="mainPage">
                    {products}
        </div>
               
            </div>
        )
    }
}
export default withRouter(CategoryPage )