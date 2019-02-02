import React, { Component } from 'react';
import './styles/style.css';
import * as firebase from 'firebase';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SnackBar from '../components/Snackbars'
import {bloods} from '../components/BloodTypes'
import {getDonors,saveUserId,getProfile,request,cancelRequest} from '../store/action/action'
 import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';





const styles =(theme)=>({
donorsHeading:{
    color:'white',
    backgroundColor:'rgba(0,0,0,0.8)',
    padding:10,
    fontSize:30,
},
donorsList:{
  backgroundColor:'rgba(255,255,255,0.9)',
  minHeight:'60vh',
    padding:10,
    marginTop:10,
},
donorsBloodSelect:{
  backgroundColor:'white',
  width:'80%',
},
donorsSelectBox:{
  backgroundColor:'rgba(0, 0, 0, 0.8)',
  padding:20,
},
emptyBox:{
  display:'flex',
  minHeight:'50vh',
  justifyContent:'center',
  alignItems:'center',
  fontSize:'40px',
  color:'darkgray'


}

})

class Bloods extends Component {
  constructor(){
    super();
    this.state={
      blood:'',
      labelWidth:0,
    }
  }
  
  changeHandler=(event)=>{
    const blood=bloods.find((val,ind)=>val.group===event.target.value);
    this.props.getDonors(event.target.value,this.props.userId,null)
    if(blood){
      this.setState({
        [event.target.name]:event.target.value,
        bloodDetails:blood.details
      });
    }
    else{
      this.setState({
        [event.target.name]:event.target.value,
      });
    }
  }


  request=(obj,uid,blood,ind)=>{
    obj.request=true
    this.props.request(obj,uid,blood,ind)
  }
  cancelRequest=(obj,uid,blood,ind)=>{
    obj.request=false
    this.props.cancelRequest(obj.uid,uid,blood,ind)
  }

  getData(){
      firebase.auth().onAuthStateChanged((user)=>{
          if(user){
            this.props.saveUserId(user.uid)
            this.props.getProfile(user.uid)
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
          <Header history={this.props.history} value={1}/>
          <div className="container">
            <section>

              <article>
              {/* <h1 className={classes.donorsHeading}>Donors List</h1> */}
                <div className={classes.donorsSelectBox}>
                    <h3 style={{color:'white'}}>Select your blood group:</h3>
                    {this.props.userId ?
                    <FormControl variant="outlined" required className={classes.donorsBloodSelect}>
                          <InputLabel  ref={ref => {this.InputLabelRef = ref; }} htmlFor="outlined-age-native-simple">Blood Group</InputLabel>
                          <Select  value={this.state.blood} name="blood" onChange={this.changeHandler} input={<OutlinedInput name="blood" labelWidth={this.state.labelWidth}/>}>
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {bloods.map((blood,ind)=>
                            <MenuItem key={ind} value={blood.group}>{blood.group}</MenuItem>
                            )}
                          </Select>
                    </FormControl>:<Loader color='#ea0606'/>}<br/>
                    {this.state.blood && <p style={{color:'wheat',fontWeight:'bold'}}>{this.state.bloodDetails}</p>}
                  </div>
              </article>

              <article>
                <div className={classes.donorsList}>
                          
                  {this.state.blood ?          
                  <div style={{maxWidth:'100%', overflow:'auto'}}>
                    {this.props.donors ?
                    <div>
                      {(this.props.donors.length > 0) ?
                        
                        <Table style={{backgroundColor:'rgba(255,255,255,0.5)'}}>
                          <TableHead >
                            <TableRow>
                              <TableCell>Id</TableCell><TableCell>Name</TableCell>
                              <TableCell>Blood Group</TableCell><TableCell>Gender</TableCell>
                              <TableCell>Age</TableCell><TableCell>Email</TableCell><TableCell>Contact</TableCell><TableCell>Address</TableCell>
                              <TableCell>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                          {this.props.donors.map((val,ind)=>{
                            return (  
                            <TableRow key={ind}>
                              <TableCell>{ind+1}</TableCell><TableCell>{val.name}</TableCell>
                              <TableCell>{val.blood}</TableCell><TableCell>{val.gender}</TableCell>
                              <TableCell>{val.age}</TableCell><TableCell>{val.email}</TableCell><TableCell>{val.contact}</TableCell><TableCell>{val.address}</TableCell>
                              {this.props.profile ?
                              <TableCell>
                                {(this.props.profile.uid != val.uid) ?
                                  <span>
                                    {this.props.requestLoaders.length > 0 ?
                                    <span>
                                      {!this.props.requestLoaders[ind] ?
                                      <span>   
                                        {!this.props.checkRequests[ind] ? 
                                        <Button color="secondary" margin="normal" variant="outlined" onClick={()=>this.request(this.props.profile ,val.uid,this.state.blood,ind)}>Request</Button>:
                                        <Button style={{color:'darkorange',border:'1px solid', width:'max-content'}}  margin="normal" variant="outlined" onClick={()=>this.cancelRequest(this.props.profile, val.uid,this.state.blood,ind)}>Cancel Request</Button>
                                          }
                                      </span>:
                                      <span style={{display:'flex',justifyContent:'center'}}><Loader size={20} color="gray"/></span>
                                      } 
                                    </span>:
                                    <span>
                                         {!this.props.checkRequests[ind] ? 
                                        <Button color="secondary" margin="normal" variant="outlined" onClick={()=>this.request(this.props.profile ,val.uid,this.state.blood,ind)}>Request</Button>:
                                        <Button style={{color:'darkorange',border:'1px solid', width:'max-content'}}  margin="normal" variant="outlined" onClick={()=>this.cancelRequest(this.props.profile, val.uid,this.state.blood,ind)}>Cancel Request</Button>
                                         }
                                    </span>
                                    }                  

                                  </span>:
                                  
                                  <span> 
                                    <Button  margin="normal" variant="outlined" disabled>Request</Button>
                                  </span>
                                 
                                  }
                              </TableCell>:
                              <TableCell>
                                <SnackBar  defaultColor="secondary" variant="outlined" text="request" ver="top"  type="error" val="Please register your self in blood bank first for blood donation request" />
                              </TableCell>
                              }
                            </TableRow>
                            )
                          })}
                          </TableBody>
                        </Table>
                        
                        :
                        <div className={classes.emptyBox}>No donor available</div>
                      } 
                    </div>:<div  className={classes.emptyBox}><Loader size={70} color='#ea0606'/></div>
                    }

                  </div>:<div className={classes.emptyBox}>No blood group selceted </div>
                  }

                </div>
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
      userId:state.root.userId,
      donors:state.root.donors,
      profile:state.root.profile,
      checkRequests:state.root.checkRequests,
      requestLoaders:state.root.requestLoaders,
    
    }
  }
  function mapDispatchToProps(dispatch){
    return {
      getDonors: (val,myId,ind)=>dispatch(getDonors(val,myId,ind)),
      saveUserId:(id)=>dispatch(saveUserId(id)),
      getProfile: (id,)=>dispatch(getProfile(id)),
      request:(obj,uid,blood,ind)=>dispatch(request(obj,uid,blood,ind)),
      cancelRequest:(myId,uid,blood,ind)=>dispatch(cancelRequest(myId,uid,blood,ind)),
     

    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Bloods));