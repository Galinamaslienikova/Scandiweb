import React from "react";
import Attributes from "./Atribbutes";
import { adToCart, changeActive } from "./helpers";
import PictureCarusel from "./PictureCarusel";


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
        let gallery=this.props.gallery.map((item)=>{
            return <img alt={'Oops!something went wrong'} onClick={(e)=>{this.changePicture(e)}} className="pictr" key={item} src={item}/>
        })
        let price=this.props.price.filter((item)=>{
            return item.currency.label===this.props.label
        })
        return(
            <div className="oneProduct">
                <div className="gallery">
                    {gallery}
                </div>
                <div className={this.state.showModal?"modalGallery":'none'}>
                    <p onClick={this.showModal} className="close"></p>
                    <PictureCarusel picture={this.state.picture} gallery={this.props.gallery}/>
                </div>
                <div className="mainPicture">
                    <div className={this.props.inStock?'none':'stock'}>
                         <p>OUT OF STOCK</p>
                    </div>
                    <img onClick={this.showModal} className={this.props.inStock?'':'opac'} alt={'Oops!something went wrong'} src={this.state.picture}/>
                </div>
                <div className="about">
                    <p className="name">{this.props.name}</p>
                    <p className="brand">{this.props.brand}</p>
                    <div className="atributes">
                      <Attributes active={this.state.active} changeActive={this.changeActive} attr={this.props.atributes}/>
                    </div>
                    <div>
                        <p className="price">PRICE</p>
                        <p className="cost">{this.props.symbol} {price[0].amount}</p>
                    </div>
                    {this.props.inStock?<button onClick={this.adToCart}>ADD TO CART</button>:<button style={{cursor:'auto'}}>You can not buy this position now ;(</button>}
                    <div className="description" dangerouslySetInnerHTML={{ __html: this.props.description}}/>
                </div>
            </div>
        )
    }
}