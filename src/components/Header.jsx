import React, { Component } from 'react';
import './styles/styles.css'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import logoImg from '../blood.png'
import Menu from './Menu'


const styles =(theme)=>({
  header: {
    flexGrow: 1,
  },
  appBar:{
    display:'inline-flex',
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'white',
    padding:10
  },
  heading:{
    fontFamily:"fantasy"
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
    this.media= window.matchMedia("(max-width: 800px)")
    this.state = {
      value: props.value,
      screenBreak:false
    };
  }
  

  handleChange = (event, value) => {
    this.setState({ value });
  };

  pageChange=(page)=>{
    // event.preventDefault();
    this.props.history.push(page)
  }
  screenChange=(screen)=>{
    if (screen.matches) { 
      this.setState({
        screenBreak:true
      })
      console.log(true)
    } else {
      this.setState({
        screenBreak:false
      })
      console.log(false)
    }
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
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h4" color="inherit" className={classes.heading}>
            <img src={logoImg} className="logoImg"/> <span className="heading">Blood </span>Bank
            </Typography>
          </Toolbar>
          { 
          <div >  
            {!this.state.screenBreak ?
            <div value={value} onChange={this.handleChange} classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }} >
                <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Home"  onClick={() =>this.pageChange('/home')} />
                <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Avaiable Bloods"  onClick={() =>this.pageChange('/bloods')}/>
                <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Your Profile" onClick={() =>this.pageChange('/profile')}/> 
                <Button  variant="contained" color="secondary" margin="normal" style={{backgroundColor:'#ff1818'}}>Logout</Button> 
            </div>
            :
              <Menu navigation={this.pageChange}/>
            }
          </div>
          }
        </AppBar>
      </header>
    );
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default  withStyles(styles)(Header);