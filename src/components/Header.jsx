import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import './styles/styles.css'
import logoImg from '../blood.png'
import Menu from './Menu'


const styles =(theme)=>({
  header: {
    flexGrow: 0,
  },
  appBar:{
    display:'flex',
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'white',
    padding:5
  },
  appBarLogin:{
    display:'flex',
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    padding:10
  },
  heading:{
    fontFamily:"fantasy",  
  },
 
  tabsRoot: {
    backgroundColor: theme.palette.background.paper,
  },
  
  tabsIndicator: {
    backgroundColor: '#ff1818',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 2,
    fontSize:14,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#ff1818',
      opacity: 1,
      
    },
    '&$tabSelected': {
      color: '#ff1818',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#ff1818',
    },
  },
  tabSelected: {
     color: '#ff1818',
      fontWeight: theme.typography.fontWeightMedium
    },
  typography: {
    padding: theme.spacing.unit * 3,
  },
 
});


class Header extends Component {
  constructor(props){
    super(props)
    this.media= window.matchMedia("(max-width: 750px)")
    this.state = {
      value: props.value,
      screenBreak:false
    };
  }
  

  handleChange = (event, value) => {
    this.setState({ value });
  };

  pageChange=(page)=>{
    this.props.history.push(page)
  }
  screenChange=(screen)=>{
    if (screen.matches) { 
      this.setState({screenBreak:true}) 
    } else {
      this.setState({screenBreak:false})
      
    }
  }
  signOut=()=>{
    firebase.auth().signOut()
    .then(()=>{
      this.props.history.replace('/')
    })
    .catch((err)=>{
      alert(err)
    })
  }
 
  componentDidMount(){
    this.screenChange(this.media)
    this.media.addListener(this.screenChange) 
  }
  componentWillUnmount(){
    this.media.removeListener(this.screenChange)

  }
  render() {
    const { classes } = this.props;
    const { value } = this.props;
    
    return (
      <header className={classes.header}>
        <AppBar position="static" color="default" className={!this.props.menu ? classes.appBar : classes.appBarLogin}>
          <Toolbar>
            <Typography variant="h4" color="inherit" className={classes.heading}>
            <img src={logoImg} alt="logo Image" className="logoImg"/> <span className="heading">Blood </span>Bank
            </Typography>
          </Toolbar>
          {!this.props.menu &&
          <div>  
            {!this.state.screenBreak ?
            <Tabs value={value} onChange={this.handleChange} classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }} >
                <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Home"  onClick={() =>this.pageChange('/home')} />
                <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Donors List"  onClick={() =>this.pageChange('/donors')}/>
                <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Notifications & Requests" onClick={() =>this.pageChange('/notifications')}/> 
                <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Your Profile" onClick={() =>this.pageChange('/profile')}/> 
                <Button  variant="contained" color="secondary" margin="normal" style={{backgroundColor:'#ff1818'}} onClick={this.signOut}>Logout</Button> 
            </Tabs>
            :
              <Menu navigation={this.pageChange} signOut={this.signOut}/>
            }
          </div>}
        </AppBar>
      </header>
    );
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default  withStyles(styles)(Header);