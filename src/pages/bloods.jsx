import React, { Component } from 'react';
import './styles/style.css';
import * as firebase from 'firebase';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {bloods} from '../components/BloodTypes'
import Header from '../components/Header';
import Footer from '../components/Footer';


const styles =(theme)=>({
donorsHeading:{
    color:'white',
    backgroundColor:'rgba(0,0,0,0.8)',
    padding:10,
    fontSize:30,
},
donorsList:{
  backgroundColor:'rgba(255,255,255,0.9)',
    padding:10,
},
donorsBloodSelect:{
  backgroundColor:'white',
  width:'80%',
},
donorsSelectBox:{
  backgroundColor:'rgba(222, 222, 222, 0.8)',
  padding:5,
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
    this.setState({
      [event.target.name]:event.target.value,
      bloodDetails:blood.details
    });
  }

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
      console.log(this.state.blood)
      return (
        <div className="App">
          <Header history={this.props.history} value={1}/>
          <div className="container">
            <section>
              <article>
              <h1 className={classes.donorsHeading}>Donors List</h1>
              <div className={classes.donorsSelectBox}>
              <h3>Select your blood group:</h3>
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
              </FormControl><br/>
                {this.state.blood && <p style={{color:'darkred',fontWeight:'bold'}}>{this.state.bloodDetails}</p>}
              </div>
              <div className={classes.donorsList}>
                {/* {(this.state.users.length > 0) ?
                <Table style={{fontSize:'20px'}}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell><TableCell>Name</TableCell>
                      <TableCell>Email</TableCell><TableCell>Gender</TableCell>
                      <TableCell>Contact No</TableCell><TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {this.state.users.map((val,ind)=>{
                    return (
                    <TableRow key={ind}>
                      <TableCell>{val.id}</TableCell><TableCell>{val.name}</TableCell>
                      <TableCell>{val.email}</TableCell><TableCell>{val.gender}</TableCell>
                      <TableCell>{val.contact}</TableCell>
                      <TableCell>
                        <Button color="primary" margin="normal" variant="outlined" onClick={()=>this.edit(val)}>Edit</Button>
                        <Button color="secondary" margin="normal" variant="outlined" onClick={()=>this.delete(val.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                    )
                  })}
                  </TableBody>
                </Table>
                :
                <h2>No donor available</h2>} */}
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
  
    }
  }
  function mapDispatchToProps(dispatch){
    return {
      
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Bloods));