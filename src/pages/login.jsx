import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import * as firebase from 'firebase';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import {loginErrorClose, loginError, loaderOpen, loaderClose} from '../store/action/action';

const styles =(theme)=>({
  form:{
    background:' rgba(255,255,255,0.9)',
    padding:10
  },
  formHeading:{
    backgroundColor:'brown',
    color:'white',
    padding:10
  },
  changeForm:{
    fontWeight:'bold',
    textDecoration:'underline',
    cursor:'pointer'
  },
  formOption:{
    color:'brown'
  },
  error:{
    color:'red',
    fontWeight:'bold',

  }

})

class Login extends Component {
  constructor(){
    super();
    this.state={
        email:'',
        password:'',
        signIn:true
    }
  }

  changeHandler=(event)=>{
      this.setState({[event.target.name]:event.target.value});
  }

  changeForm=()=>{
      this.setState({signIn:!this.state.signIn});
      this.props.loginErrorClose();
  }

  signUp=(event)=>{
    event.preventDefault();
    this.props.loaderOpen()
    const email = this.state.email;
    const password = this.state.password;
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(res=>{
        this.props.loginErrorClose();
        this.props.loaderClose();
        this.props.history.replace('/home');

    })
    .catch(err=>{
      this.props.loaderClose();
      this.props.loginError(err.message);
    })
  }
  signIn=(event)=>{
      event.preventDefault();
      this.props.loaderOpen()
      const email = this.state.email;
      const password = this.state.password;
      firebase.auth().signInWithEmailAndPassword(email,password)
      .then(res =>{
          this.props.loginErrorClose();
          this.props.loaderClose();
          this.props.history.replace('/home');
      })
      .catch(err=>{
        this.props.loaderClose();
        this.props.loginError(err.message);
      })

  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            this.props.history.replace('/home');
        }
    })
  }
  render() {
    const {classes}=this.props
    return (
      <div className="App">
        <Header menu={true} value={0}/>  

        <div className="container login">
          {this.state.signIn ?
           <div className={classes.form}>

               <form onSubmit={this.signIn}>

                  <h1 className={classes.formHeading}>Login</h1>
                  <p className={classes.error}>{this.props.loginError && this.props.error}</p>
                  <TextField  label="Email" variant="outlined" margin="normal" type="email" name="email" value={this.state.email} onChange={this.changeHandler} onClick={this.props.loginErrorClose}/><br/>
                  <TextField label="Password" variant="outlined" margin="normal" type="password" name="password" value={this.state.password} onChange={this.changeHandler} onClick={this.props.loginErrorClose}/><br/>
                  {!this.props.loader ?
                  <Button variant="contained" color="secondary" type="submit" value="submit">Sign In</Button>:
                  <Loader/>}
               </form>

                <p className={classes.formOption}>Don't have account? | <span className={classes.changeForm} onClick={this.changeForm}>Sign Up</span></p>

           </div>
           :
           <div className={classes.form}>

               <form onSubmit={this.signUp}>

                  <h1 className={classes.formHeading}>Registration</h1>
                  {this.props.loginError && <p className={classes.error}>{this.props.error}</p>}
                  <TextField label="Email" variant="outlined" margin="normal"  type="email" name="email" value={this.state.email} onChange={this.changeHandler} onClick={this.props.loginErrorClose}/><br/>
                  <TextField label="Password" variant="outlined" margin="normal" type="password" name="password" value={this.state.password} onChange={this.changeHandler} onClick={this.props.loginErrorClose}/><br/>
                  {!this.props.loader ?
                  <Button variant="contained" color="secondary" type="submit" value="submit">Sign Up</Button>:
                  <Loader/>}
               </form>

               <p className={classes.formOption}>Already have account | <span className={classes.changeForm} onClick={this.changeForm}>Sign In</span></p>
        
           </div>}
        </div>

        <Footer/>
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
      error: state.root.loginError,
      loader: state.root.loader
  }
}
function mapDispatchToProps(dispatch){
  return{
    loginErrorClose : ()=> dispatch(loginErrorClose()),
    loginError : (err)=> dispatch(loginError(err)),

    loaderOpen: ()=>dispatch(loaderOpen()),
    loaderClose: ()=>dispatch(loaderClose())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Login));
// export default Login
