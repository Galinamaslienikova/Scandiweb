import React from "react";
import { Link } from "react-router-dom";

export default class ProductMain extends React.Component{
    render(){
     
        return(
            <Link to={`/cats/${this.props.category}/${this.props.id}`}>
            <div className={this.props.instock?'producrMain inHover':'producrMain'}>
                <div className="picture">
                    <div className={this.props.instock?'none':'stock'}>
                        <p>OUT OF STOCK</p>
                    </div>
                    <img className={this.props.instock?'':'opac'} src={this.props.image} alt={'Oops!something went wrong'}/>
                    <div className="iconCartOnProd"></div>
                </div>
                <p className={this.props.instock?'':'colorStock'} >{this.props.name}</p>
                <p className={this.props.instock?'cost':'colorStock'} >{this.props.price} <span className="currency">{this.props.currency}</span></p>
            </div>
            </Link>
        )
    }
}