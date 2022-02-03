import React from "react";
import { Link } from "react-router-dom";

export default class ProductMain extends React.PureComponent{
    render(){
     const{category,instock,id,image,name,price,currency}=this.props
        return(
            <Link to={`/cats/${category}/${id}`}>
            <div className={instock?'producrMain inHover':'producrMain'}>
                <div className="picture">
                    <div className={instock?'none':'stock'}>
                        <p>OUT OF STOCK</p>
                    </div>
                    <div className="imgDiv"><img className={instock?'':'opac'} src={image} alt={'Oops!something went wrong'}/></div>
                    <div className="iconCartOnProd"></div>
                </div>
                <p className={instock?'':'colorStock'} >{name}</p>
                <p className={instock?'cost':'colorStock'} >{price.toFixed(2)} <span className="currency">{currency}</span></p>
            </div>
            </Link>
        )
    }
}