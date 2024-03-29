import React, { Component } from 'react';
import './styles/style.css'
import * as firebase from 'firebase';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BloodCard from '../components/BloodCards';
import {bloods} from '../components/BloodTypes';
import {saveUserId,getProfile} from '../store/action/action'
import slide from '../images/slide.jpg';
import bloodImg from '../images/bloodImg.png';

const styles =(theme)=>({

homeImageSection:{
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#252525',
  minHeight:500,
  width:'100%',
  overflow:'hidden',
  position:'relative',
},
homeSlideImg:{
 flexGrow:1,
},
homeSlideText:{
  position:'absolute',
  color:'white',
  padding:10
 
},
homeBloodSection:{
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  flexWrap:'wrap',
  width:'100%',
  overflow:'hidden',
  backgroundColor:'rgba(255,255,255,0.85)'
},
homeBloodHeading1:{
  flexGrow:1,
  fontSize:50,
  color:'#d80909'
},
homeBloodHeading2:{
  color:'white',
  backgroundColor:'#7b0101',
  padding:5
},
homeBloodInformation:{
  textAlign:'justify',
  wordSpacing:-1,
  fontWeight:'normal',
  flexGrow:1,
  padding:10,
  lineHeight:2,
  // color:'#5f5f5f',
  fontSize:18
},
homeBloodCards:{
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  flexWrap:'wrap',
  flexGrow:1,
  padding:10,
  backgroundColor:'#fafafa'
}
})


class Home extends Component {

  getData(){
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
          this.props.saveUserId(user.uid);
          this.props.getProfile(user.uid);
        }  
        else{
          this.props.history.replace('/')
        }
    })
  }

  componentDidMount(){
    this.getData();
    this.props.saveUserId()
  }
  
  render() {
    const {classes}=this.props
    return (
      <div className="App">
        <Header history={this.props.history} value={0}/>

        <div className="container">

          <section className={classes.homeImageSection}>

            <div classes={classes.homeSlideImg}>
              <img src={slide} alt="slider" width="100%" height="auto" className="homeSlideImg"/>
            </div>

            <div className={classes.homeSlideText}>
              <h1>
                DONATE BLOOD AND GET REAL BLESSINGS.
              </h1>
              <h2 style={{fontWeight:'normal'}}>
                Blood is the most precious gift that anyone can give to another person.
                Donating blood not only saves the life also save donor's lives.
              </h2>
              <Button color="secondary" margin="normal" variant="contained" style={{backgroundColor:'#ff1818'}} onClick={()=>this.props.history.push('/profile')}>Register yourself in blood bank</Button>
            </div>
          </section>

          <section className={classes.homeBloodSection} >

              <h1 className={classes.homeBloodHeading1}>Blood Information</h1>

              <article className={classes.homeBloodInformation}>
                <p>Although all blood is made of the same basic elements, not all blood is alike. In fact, there are eight different common blood types, which are determind by the presence or absece of certain antigens - substances that can trigger an immune response if they are foreign to the body. Since some antigens can trigger a patient's immnune system to attack the transfused blood, safe transfusions depend on careful blood typing and cross-matching.</p>
              </article>

              <article className={classes.homeBloodInformation}>
                <h2 className={classes.homeBloodHeading2}>Blood Groups:</h2>
                <p>There are four major blood groups determined by the presence or absence of two antigens -A and -B on the surface of red blood cells: </p>
                <ul>
                  <li>Group A - has only the A antigen on red cells and B antibody in the plasma.</li>
                  <li>Group B - has only the B antigen on red cells and A antibody in the plasma.</li>
                  <li>Group AB - has both A and B antigens on red cells but neither A nor B antibody in the plasma.</li>
                  <li>Group O - has neither A nor B antigens on red cells but both A and B antibody are in the plasma. </li>
                </ul>
              </article>

              <article className={classes.homeBloodInformation}>
                <h2 className={classes.homeBloodHeading2}>RH factor:</h2>
                <p>In addition to the A and B antigens, there is a protein called the Rh factor, which can be either present (+) or absent (–), creating the 8 most common blood types (O+, O-, A+, A-, B+, B-, AB+, AB-).Rh-negative blood is given to Rh-negative patients, and Rh-positive or Rh-negative blood may be given to Rh-positive patients.</p>
                <div className={classes.homeBloodCards}>
                  {bloods.map((blood,ind)=>
                  <BloodCard key={ind} image={bloodImg} group={blood.group} details={blood.details}/>
                  )}
                </div>
              </article>

              <Button  color="secondary" margin="normal" variant="contained" style={{backgroundColor:'#ff1818', margin:10}} onClick={()=>this.props.history.push('/donors')}>Request For Blood</Button>

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
    saveUserId:(id)=>dispatch(saveUserId(id)),
    getProfile: (id)=>dispatch(getProfile(id)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Home));

