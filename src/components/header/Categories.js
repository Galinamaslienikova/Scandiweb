import React from "react";
import { Link } from "react-router-dom";
import { getCats } from "../../api/query";

export default class Categories extends React.Component{
    constructor(props){
        super(props)
        this.state={
            cats:[]
        }
    }

    componentDidMount(){
        getCats()
        .then(result => this.setState({
            cats:result.data.categories
        }))
    }
    render(){
        let categories=this.state.cats.length<1?"":this.state.cats.map((item,index)=>{
            return <Link className={this.props.activCategory?this.props.activCategory.name===item.name?'isActive':'':""} key={index} onClick={this.props.changeCategory?()=>this.props.changeCategory(item.name):()=>{}}  to={`/cats/${item.name}`}>
                         <p>{item.name.toUpperCase()}</p>
                    </Link>
        })
        return(<>
            {categories}
        </>)
    }
}