import React from "react";
import { changePicture } from "./helpers";
export default class PictureCarusel extends React.PureComponent{
    constructor(props){
        super(props)
        this.state={
            picture:'',
            gallery:[]
        }
    }
    componentDidMount(){
        this.setState({
            picture:this.props.picture?this.props.picture:this.props.gallery[0],
            gallery:this.props.gallery
        })

    }
    changePictureLeft=()=>{
        const num=changePicture(this.state.gallery,this.state.picture)
         if(num<=0){
             this.setState({
                 picture:this.state.gallery[this.state.gallery.length-1]
             })
         }else{
             this.setState({
                 picture:this.state.gallery[num-1]
             }) 
         }
     }
     changePictureRight=()=>{
        const num=changePicture(this.state.gallery,this.state.picture)
         if(num>=this.state.gallery.length-1){
             this.setState({
                 picture:this.state.gallery[0]
             })
         }else{
             this.setState({
                 picture:this.state.gallery[num+1]
             }) 
         }
     }
    render(){
        return(
            <div className="galleryCart">
                {this.state.gallery.length<=1?"":<p onClick={this.changePictureLeft}  className="arrows">{'<'}</p>}
                <img src={this.state.picture} alt="something went wrong:("/>
                {this.state.gallery.length<=1?"":<p onClick={this.changePictureRight} className="arrows" >{'>'}</p>}
            </div>
        )
    }
}