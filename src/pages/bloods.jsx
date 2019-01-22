import React, { Component } from 'react';
import './styles/style.css'
import {connect} from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'

class Bloods extends Component {
    render() {
      return (
        <div className="App">
          <Header history={this.props.history} value={1}/>
          <div className="container">
            <h1>Available bloods</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, velit. Eaque libero eveniet quam obcaecati itaque similique assumenda labore delectus, modi, deleniti minima animi eligendi laborum neque et. Velit, quidem!</p>
         </div>
         <Footer/>
        </div>
      );
    }
  }
  
  function mapStateToProps(state){
    return {
  
    }
  }
  function mapDispatchToProps(dispatch){
    return {
      
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Bloods);