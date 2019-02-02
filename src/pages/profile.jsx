import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as firebase from 'firebase';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {bloods} from '../components/BloodTypes'
import PaperSheet from '../components/PaperSheet'
import Loader from '../components/Loader';
import {registerDonor,saveUserId,getProfile,editProfile,updateProfile,cancelUpdation} from '../store/action/action'
import SnackBar from '../components/Snackbars'




const styles =(theme)=>({
 
  profileFormHeading:{
    color:'white',
    backgroundColor:'rgba(0,0,0,0.8)',
    padding:10,
    fontSize:30,
  },
  profileForm:{
    backgroundColor:'rgba(255,255,255,0.9)',
    padding:10,
  },
  profileFormField:{
    width:'80%',
  },
  profileFormRegister:{
    backgroundColor:'green',
    color:'white'
  },
  profileFormEdit:{
    backgroundColor:'brown',
    color:'white'
  },
  profileFormUpdate:{
    backgroundColor:'darkOrange',
    color:'white'
  },
  emptyBox:{
    display:'flex',
    minHeight:'80vh',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(255,255,255,0.9)',
    padding:10,
  }

})

class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
        name:'',
        email:'',
        age:'',
        contact:'',
        address:'',
        blood:'',
        gender:'',
        lastDate:'',
        lastDonation: false,
        avaiable:true,
        updated:false,
        vaildDate:false
       
    }
  }
  
  changeForm=()=>{
      this.setState({signIn:!this.state.signIn});
  }
  changeHandler=(event)=>{
      this.setState({
        [event.target.name]:event.target.value,
        updated:true
      });
  }
  checkBoxHandle=(event)=>{
    this.setState({
      [event.target.name]:event.target.checked,
      updated:true
    });
  }
  
  checkDateHandler=(event)=>{
    const date = event.target.value;
    const todayDate= new Date();
      const donationDate = new Date(date)
      const milliseconds= (todayDate.getTime())-(donationDate.getTime())
      const days = parseInt(milliseconds/(1000*60*60*24))
      console.log(days)
      if(days < 50){
        this.setState({
          [event.target.name]:event.target.value,
          validDate:false,
          updated:true
        })
      }
      else{
        this.setState({
          [event.target.name]:event.target.value,
          validDate:true,
          updated:true
        })
      } 


  }

  register=(event)=>{
    event.preventDefault();
    const donor =this.state;
    donor.uid=this.props.userId
    this.props.registerDonor(donor)

    this.setState({name:'',email:'',age:'',contact:'',address:'', blood:'',gender:'',lastDate:'',lastDonation: false,avaiable:false, updated:false, validDate:false})
  }

  edit=()=>{
    this.props.editProfile();
    const {name,email,age,contact,address,blood,gender,lastDate,lastDonation,key,uid,avaiable} = this.props.profile

      const date=lastDate
      const todayDate= new Date();
      const donationDate = new Date(date)
      const milliseconds= (todayDate.getTime())-(donationDate.getTime())
      const days = parseInt(milliseconds/(1000*60*60*24))
      if(days < 50){
        this.setState(
          {name:name ,email:email ,age:age ,contact:contact ,address:address, blood:blood, gender:gender, lastDate:lastDate, lastDonation: lastDonation,avaiable:avaiable, updated:false, validDate:false, key:key, uid:uid }
          )
      } 
      else{
        this.setState(
          {name:name ,email:email ,age:age ,contact:contact ,address:address, blood:blood, gender:gender, lastDate:lastDate, lastDonation: lastDonation,avaiable:avaiable, updated:false, validDate:true, key:key, uid:uid }
          )
      }
    

    

  }
  update=()=>{
    const profile =this.state;
    this.props.updateProfile(profile)
    this.setState({name:'',email:'',age:'',contact:'',address:'', blood:'',gender:'',lastDate:'',lastDonation: false, avaiable:false, updated:false, validDate:false, key:'', uid:''})
   
  }

  cancelForm=()=>{
    this.props.cancelUpdation()
    this.setState({
      updated:false
    })
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
    const {classes}=this.props
    return (
      <div className="App">
        <Header history={this.props.history} value={3}/>
        <div className="container">
          {(this.props.profileLoader || this.props.registrationLoader || this.props.updateLoader)?
          <div className={classes.emptyBox}><Loader size={70} color='#ea0606'/></div>
          :
          <div>
          {!this.props.registered ?
          <section >
            <article>
                <h1 className={classes.profileFormHeading}>Blood Bank Registration</h1>

                <form className={classes.profileForm} onSubmit={this.register}>
                  <TextField className={classes.profileFormField} label="Name"  margin="normal" type="text" name="name" value={this.state.name} onChange={this.changeHandler} required={true}/><br/>
                  <TextField className={classes.profileFormField} label="Email"  margin="normal" type="email" name="email" value={this.state.email} onChange={this.changeHandler} required={true}/><br/>
                  <TextField className={classes.profileFormField} label="Age"  margin="normal" type="number" name="age" value={this.state.age} onChange={this.changeHandler} required={true}/><br/>
                  <TextField className={classes.profileFormField} label="Contact No"  margin="normal" type="number" name="contact" value={this.state.contact} onChange={this.changeHandler} required={true}/><br/>
                  <TextField className={classes.profileFormField} label="Address"  margin="normal" type="text" name="address" value={this.state.address} onChange={this.changeHandler} required={true}/><br/>
                  <div>
                    <FormControl required className={classes.profileFormField}>
                      <InputLabel>Blood Group</InputLabel>
                      <Select style={{textAlign:'left'}} value={this.state.blood} onChange={this.changeHandler} inputProps={{ name: 'blood',}}>
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {bloods.map((blood,ind)=>
                        <MenuItem key={ind} value={blood.group}>{blood.group}</MenuItem>
                        )}
                      </Select>
                    </FormControl><br/>
                  </div>
                         
                  <FormControlLabel control={<Checkbox checked={this.state.lastDonation} name="lastDonation" onChange={this.checkBoxHandle} value="lastDonation"/> } label="Did you ever donate before this?"/><br/>
                  {this.state.lastDonation && <span><TextField className={classes.profileFormField} label="Last time donation Date"  margin="normal" type="date" name="lastDate" value={this.state.lastDate} onChange={this.checkDateHandler} required={true}/><br/></span>}

                  <FormControl component="fieldset" margin="normal">
                    <FormLabel  component="legend">Gender:</FormLabel>
                      <RadioGroup style={{flexDirection:'row'}} name="gender" value={this.state.gender} onChange={this.changeHandler}>
                        <FormControlLabel value="male" control={<Radio color="secondary" required={true}/>}  label="Male" />
                        <FormControlLabel value="female" control={<Radio color="secondary" required={true}/>}  label="Female" />
                      </RadioGroup>
                  </FormControl><br/>

                  <FormControlLabel control={<Switch checked={this.state.avaiable} name="avaiable" onChange={this.checkBoxHandle} value="avaiable"/>} label="Avaiable In Donors List"/><br/>       

                  {!this.props.editing ?       
                  <Button className={classes.profileFormRegister} color="secondary" variant="contained" type="submit" value="submit">Register</Button>
                  :
                  <span>
                  {this.state.updated ?
                  <span>
                    {this.state.validDate ?
                    <Button className={classes.profileFormUpdate} color="secondary" variant="contained" onClick={this.update}>Update Profile</Button>:
                    <SnackBar background="darkorange" color="white" variant="contained" text="Update Profile" ver="top" type="error" val="last blood donation must be at least 50 days ago" />}
                  </span>
                  :
                      
                  <SnackBar background="darkorange" color="white" variant="contained" text="Update Profile" ver="bottom" type="warning" val="Nothing changed in profile" />
          
                  }
                  <Button variant="contained" onClick={this.cancelForm}>Cancel</Button>
                  </span>
                  }
                  
               </form>
              </article> 
           </section>
            :
           <section >
               <article>     
                <h1 className={classes.profileFormHeading}>Your Profile</h1>
                <div className={classes.profileForm}>   
                  <PaperSheet  property="Name" val={this.props.profile.name}/>    
                  <PaperSheet property="Email" val={this.props.profile.email}/>
                  <PaperSheet property="Age" val={this.props.profile.age}/>
                  <PaperSheet property="Contact" val={this.props.profile.contact}/>
                  <PaperSheet property="Address" val={this.props.profile.address}/>
                  <PaperSheet property="Blood Group" val={this.props.profile.blood}/>
                  <PaperSheet property="Gender" val={this.props.profile.gender}/>
                  <PaperSheet property="Last Donation Date" val={this.props.profile.lastDonation ? this.props.profile.lastDate: 'No donation'}/>
                  <PaperSheet property="Avaiable in donors list" val={this.props.profile.avaiable ? 'Yes': 'No'}/>
                  {!this.props.editing  && <Button className={classes.profileFormEdit} color="secondary" variant="contained" onClick={this.edit} >Edit Profile</Button>}
                </div>
              </article> 
          </section> 
          }
          </div>}          
        </div>
       <Footer/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    userId:state.root.userId,
    registered:state.root.registered,
    registrationLoader:state.root.registrationLoader,
    profile:state.root.profile,
    profileLoader:state.root.profileLoader,
    editing:state.root.editing,
    updateLoader:state.root.updateLoader,

  }
}
function mapDispatchToProps(dispatch){
  return {
    saveUserId:(id)=> dispatch(saveUserId(id)),
    registerDonor: (obj)=> dispatch(registerDonor(obj)),
    getProfile: (id)=>dispatch(getProfile(id)),
    editProfile:()=>dispatch(editProfile()),
    updateProfile:(obj)=>dispatch(updateProfile(obj)),
    cancelUpdation: ()=>dispatch(cancelUpdation()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Profile));

