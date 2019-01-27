import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as firebase from 'firebase';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {saveUserId,getProfile,getRequest} from '../store/action/action'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Panel from'../components/Panel'


const styles =(theme)=>({
  notificationsHeading:{
    color:'white',
    backgroundColor:'rgba(100,0,0,0.8)',
    padding:10,
    fontSize:30,
  },
  notificationsBox:{
    backgroundColor:'rgba(255,255,255,0.9)',
    padding:10,
    minHeight:'50vh'
  },
  emptyBox:{
    display:'flex',
    minHeight:'50vh',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(255,255,255,0.9)',
    padding:10,
  }
})

class Notifications extends Component {
  constructor(){
    super();
    this.state={
      page:true
    }
  }

 getData(){
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
          this.props.saveUserId(user.uid);
          this.props.getProfile(user.uid);
          this.props.getRequest(user.uid);
        }  
        else{
          this.props.history.replace('/');
        }
    })
  }

  changePage=()=>{
    this.setState({ page:!this.state.page});
  }
  componentDidMount(){
    this.getData();
  } 
value
  render() {
    const {classes}= this.props;
    return (
      <div className="App">
        <Header history={this.props.history} value={2}/>
        <div className="container" >
        {this.state.page ?
          <section>
              <article>
                  <Button  style={{backgroundColor:'green',color:'white',width:'30%'}} variant="contained" onClick={this.changePage}>See Notifications</Button>
                  <h1 className={classes.notificationsHeading}>Requests</h1>
                  <div className={classes.notificationsBox}>
                    {this.props.requests ?
                    <div>
                      {this.props.requests.map((val,ind)=>
                        <Panel key={ind} obj={val}/>
                      )}
                    </div>:
                    <div className={classes.emptyBox}>

                    </div>}
                  </div>
              </article>
          </section>      
           :  
          <section>
              <article>
                  <Button  style={{backgroundColor:'green',color:'white',width:'30%'}} variant="contained" onClick={this.changePage}>See Requests</Button>
                  <h1 className={classes.notificationsHeading}>Notifications</h1>
                  <div className={classes.notificationsBox}>
                    {/* <Panel/> */}
                  </div>
              </article>
          </section>
         }
        </div>
       <Footer/>
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    requests:state.root.requests
  }
}
function mapDispatchToProps(dispatch){
  return {
    saveUserId:(id)=>dispatch(saveUserId(id)),
    getProfile: (id)=>dispatch(getProfile(id)),
    getRequest:(id)=>dispatch(getRequest(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Notifications));