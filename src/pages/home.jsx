import React, { Component } from 'react';
import './styles/style.css'
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import slide from '../slide.jpg'

const styles =(theme)=>({

homeImageSection:{
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  // backgroundColor:'black',
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
homeSlideHeading1:{
  fontSize:'4vmin',
  textTransform:'uppercase',
},
homeSlideHeading2:{
  fontWeight:'normal',
  fontSize:'3vmin'
},
homeBloodSection:{
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  flexWrap:'wrap',
  width:'100%',
  overflow:'hidden',
  backgroundColor:'#f3f3f3',
  
},
homeBloodHeading1:{
  fontSize:'4vmin',
  textTransform:'uppercase',
  flexGrow:1
},
homeBloodInformation:{
  textAlign:'left',
  fontSize:'2.3vmin',
  padding:"0px 10px",
  lineHeight:2,
  color:'#232323'
}
})

class Home extends Component {

  render() {
    const {classes}=this.props
    return (
      <div className="App">
        <Header history={this.props.history} value={0}/>

        <div className="container">
          <div className={classes.homeImageSection}>
            <div classes={classes.homeSlideImg}>
            <img src={slide} alt="slider Image" width="100%" height="auto" className="homeSlideImg"/>
            </div>

            <div className={classes.homeSlideText}>
              <h1 className={classes.homeSlideHeading1}>
                DONATE BLOOD AND GET REAL BLESSINGS.
              </h1>
              <h2 className={classes.homeSlideHeading2}>
                Blood is the most precious gift that anyone can give to another person.
                Donating blood not only saves the life also save donor's lives.
              </h2>
              <Button color="secondary" margin="normal" variant="contained" style={{backgroundColor:'#ff1818',fontSize:'2vmin'}}>Register as Donor</Button>
            </div>
          </div>
          <div className={classes.homeBloodSection}>
              <h1 className={classes.homeBloodHeading1}>blood Information</h1>
              <div className={classes.homeBloodInformation}>
                <p>Although all blood is made of the same basic elements, not all blood is alike. In fact, there are eight different common blood types, which are determind by the presence or absece of certain antigens - substances that can trigger an immune response if they are foreign to the body. Since some antigens can trigger a patient's immnune system to attack the transfused blood, safe transfusions depend on careful blood typing and cross-matching.</p>
                <p>There are four major blood groups determined by the presence or absence of two antigens -A and -B on the surface of red blood cells:
                <ul>
                  <li>Group A - has only the A antigen on red cells and B antibody in the plasma.</li>
                  <li>Group B - has only the B antigen on red cells and A antibody in the plasma.</li>
                  <li>Group AB - has both A and B antigens on red cells but neither A nor B antibody in the plasma.</li>
                  <li>Group O - has neither A nor B antigens on red cells but both A and B antibody are in the plasma. </li>
                </ul>
                </p>
              </div>
          </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Home));

