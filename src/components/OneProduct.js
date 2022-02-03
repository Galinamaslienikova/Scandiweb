import React from "react";
import Attributes from "./Atribbutes";
import { adToCart, changeActive } from "./helpers";
import PictureCarusel from "./PictureCarusel";
import parse from "html-react-parser"


export default class OneProduct extends React.Component{
    constructor(props){
        super(props)
        this.state={
            picture:'',
            active:[],
            showModal:false
        }
    }
    componentDidMount(){
        let arr=this.props.atributes.map((item)=>{
            return  {[item.name]:item.items[0].id}
          })
       this.setState({
        picture:this.props.gallery[0],
        active:arr
       }) 
    }
    changePicture=(e)=>{
        this.setState({
            picture:e.target.src
           }) 
    }
    changeActive=(name,value)=>{
        let arr=changeActive(name,value,this.state.active)
        this.setState({
            active:arr
        })

    }
    adToCart=()=>{
        adToCart(this.props.id,this.props.name,this.state.active,this.props.price)
        this.props.rendParent()
    }
    showModal=()=>{
        this.setState({
            showModal: !this.state.showModal
        })
    }
    render(){
        const{price,label,gallery,inStock,name,brand,atributes,symbol,description}=this.props
        const galleri=gallery.map((item)=>{
            return   <div  key={item} className="pictr"><img alt={'Oops!something went wrong'} onClick={(e)=>{this.changePicture(e)}} className="pictr" src={item}/></div>
        })
        const pric=price.filter((item)=>{
            return item.currency.label===label
        })
        return(
            <div className="oneProduct">
                <div className="gallery">
                    {galleri}
                </div>
                <div className={this.state.showModal?"modalGallery":'none'}>
                    <p onClick={this.showModal} className="close"></p>
                    <PictureCarusel picture={this.state.picture} gallery={gallery}/>
                </div>
                <div className="mainPicture">
                    <div className={inStock?'none':'stock'}>
                         <p>OUT OF STOCK</p>
                    </div>
                    <img onClick={this.showModal} className={inStock?'':'opac'} alt={'Oops!something went wrong'} src={this.state.picture}/>
                </div>
                <div className="about">
                    <p className="name">{name}</p>
                    <p className="brand">{brand}</p>
                    <div className="atributes">
                      <Attributes active={this.state.active} changeActive={this.changeActive} attr={atributes}/>
                    </div>
                    <div>
                        <p className="price">PRICE</p>
                        <p className="cost">{symbol} {pric[0].amount.toFixed(2)}</p>
                    </div>
                    {inStock?<button onClick={this.adToCart}>ADD TO CART</button>:<button style={{cursor:'auto'}}>You can not buy this position now ;(</button>}
                    <div className="description">{parse(description)}</div>
                </div>
            </div>
        )
    }
}