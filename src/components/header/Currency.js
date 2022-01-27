import React from "react";
import { getCurrencies } from "../../api/query";

export default class Currency extends React.Component{
    constructor(props){
        super(props)
        this.state={
            currency:[]

        }
    }
    componentDidMount(){
        getCurrencies()
        .then(result => this.setState({
            currency:result.data.currencies
        }))
    }
    render(){
        let res=this.state.currency.length<0?'':this.state.currency.map((item)=>{
            return <li onClick={()=>{this.props.onclick(item.symbol,item.label)}} key={item.label}>{item.symbol} {item.label}</li>
        })
        return(
            <ul  className={this.props.carencyVizible?"currencyList":'none'}>
                {res}
            </ul>
        )
    }
}