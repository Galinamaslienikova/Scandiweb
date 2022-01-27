import React from "react";
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import CategoryPage from "./pages/CategoryPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import './styles/mainPage.scss'
import './styles/oneProduct.scss'
import './styles/header.scss'
import './styles/cart.scss'
import Cart from "./pages/Cart";

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      currency:{
        symbol:'$',
        label:"USD"
    }
    }
  }
  changeCurrensy=(symbol,label)=>{
    this.setState({
        currency:{
            symbol:symbol,
            label:label
        }
    })
  }
  render(){
  return (
     <Router currency={this.state.currency}>
        <Switch  currency={this.state.currency} >
          <Route  exact path='/' render={(props)=><CategoryPage changeCurrensy={this.changeCurrensy} currency={this.state.currency}/>}/>
          <Route path="/cart" render={(props)=><Cart changeCurrensy={this.changeCurrensy} currency={this.state.currency}/>}/>
          <Route path="/cats/:idcat/:id" render={(props)=><ProductDetailsPage changeCurrensy={this.changeCurrensy} currency={this.state.currency}/>}/>
          <Route path="/cats/:id" render={(props)=><CategoryPage changeCurrensy={this.changeCurrensy} currency={this.state.currency}/>}/>
        </Switch>
    </Router>
  )};
}

export default App;
