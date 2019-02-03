import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as firebase from 'firebase';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {saveUserId,getProfile,getRequest,acceptRequest,ignoreRequest,getNotifications} from '../store/action/action'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Panel from'../components/Panel'
import Loader from '../components/Loader'
import Refresh from '../images/refresh.png'


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
    minHeight:'60vh'
  },
  pageButton:{
    display:'flex',
    justifyContent:'flex-end'
  },
  emptyBox:{
    display:'flex',
    minHeight:'60vh',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(255,255,255,0.9)',
    padding:10,
    fontSize:'40px',
    color:'darkgray'
  },
  refresh:{
    backgroundColor:'white',
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
          this.props.getRequest(user.uid,null);
          this.props.getNotifications(user.uid)
        }  
        else{
          this.props.history.replace('/');
        }
    })
  }

  changePage=()=>{
    this.setState({ page:!this.state.page});
    this.props.getRequest(this.props.userId,null)
    this.props.getNotifications(this.props.userId)
    
  }
  refresh=()=>{
    this.props.getRequest(this.props.userId,null)
    this.props.getNotifications(this.props.userId)
  }
  accept=(myId,uid,obj)=>{
    this.props.acceptRequest(myId,uid,obj)
  }
  ignore=(myId,uid)=>{
    this.props.ignoreRequest(myId,uid)
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
                  <h1 className={classes.notificationsHeading}>Requests</h1>
                  <div className={classes.pageButton}>
                  <Button  variant="contained" className={classes.refresh} onClick={this.refresh}><img src={Refresh} alt="refresh" height="25px" width="25px" title="refresh"/></Button>
                  <Button  style={{backgroundColor:'darkorange',color:'white'}} variant="contained" onClick={this.changePage}>See Notifications</Button>
                  </div>
                    {this.props.requests ?
                    <div className={classes.notificationsBox}>
                      {this.props.requests.length > 0 ?
                        <div>
                        {this.props.requests.map((val,ind)=>
                          <Panel text={`${val.name} requested you for blood donation`} key={ind} obj={val} buttons={true} color='rgba(249, 137, 137, 0.3)' accept={()=>this.accept(this.props.userId,val.uid,this.props.profile)} ignore={()=>this.ignore(this.props.userId,val.uid)} loader={this.props.acceptLoader}/>
                        )}
                        </div>:<div className={classes.emptyBox} style={{backgroundColor:'transparent'}}>No Requests</div>
                      }  
                    </div>:<div className={classes.emptyBox}><Loader size={70} color='#ea0606'/></div>
                    }
                  
              </article>
          </section>      
           :  
          <section>
              <article>
                  <h1 className={classes.notificationsHeading}>Notifications</h1>
                  <div className={classes.pageButton}>
                  <Button  variant="contained" className={classes.refresh} onClick={this.refresh}><img src={Refresh} alt="refresh" height="25px" width="25px" title="refresh"/></Button>
                  <Button  style={{backgroundColor:'brown',color:'white'}} variant="contained" onClick={this.changePage}>See Requests</Button>
                  </div>
                  {this.props.notifications ?
                    <div className={classes.notificationsBox}>
                      {this.props.notifications.length > 0 ?
                        <div>
                        {this.props.notifications.map((val,ind)=>
                          <Panel text={`${val.name} accepted your request & ready to donate blood`} key={ind} obj={val} buttons={false} color='rgba(245, 158, 0, 0.2)' loader={this.props.acceptLoader}/>
                         
                        )}
                        </div>:<div className={classes.emptyBox} style={{backgroundColor:'transparent'}}>No Notifications</div>
                      }  
                    </div>:<div className={classes.emptyBox}><Loader size={70} color='#ea0606'/></div>
                    } 
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
    requests:state.root.requests,
    userId:state.root.userId,
    profile:state.root.profile,
    notifications:state.root.notifications,
    acceptLoader:state.root.acceptLoader
  }
}
function mapDispatchToProps(dispatch){
  return {
    saveUserId:(id)=>dispatch(saveUserId(id)),
    getProfile: (id)=>dispatch(getProfile(id)),
    getRequest:(id,uid)=>dispatch(getRequest(id,uid)),
    acceptRequest:(myId,uid,obj)=>dispatch(acceptRequest(myId,uid,obj)),
    ignoreRequest:(myId,uid)=>dispatch(ignoreRequest(myId,uid)),
    getNotifications:(myId)=>dispatch(getNotifications(myId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Notifications));