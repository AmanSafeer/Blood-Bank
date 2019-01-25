import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as firebase from 'firebase';
import { withStyles } from '@material-ui/core/styles';
import Header from '../components/Header'
import Footer from '../components/Footer'


const styles =(theme)=>({
  notificationsHeading:{
    color:'white',
    backgroundColor:'rgba(0,0,0,0.8)',
    padding:10,
    fontSize:30,
  },
  notificationsBox:{
    backgroundColor:'rgba(255,255,255,0.9)',
    padding:10,
  }
})

class Notifications extends Component {

 getData(){
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            console.log("did mount")
        }  
        else{
          this.props.history.replace('/')
        }
    })
  }

  componentDidMount(){
    this.getData();
  } 

  render() {
    const {classes}= this.props
    return (
      <div className="App">
        <Header history={this.props.history} value={2}/>
        <div className="container">
          <section>
              <article>
                  <h1 className={classes.notificationsHeading}>Notifications & Requests</h1>
                  <div className={classes.notificationsBox}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam suscipit ab dolorum harum omnis? Officia, mollitia nemo tenetur dolore eligendi error, praesentium, alias hic accusantium doloribus consectetur aspernatur illum aliquid.</div>
              </article>
          </section>        
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

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Notifications));