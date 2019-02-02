import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Loader from './Loader'


const styles = theme => ({
  root: {
    width: '100%',
    marginTop:10
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 'bold',
  },
  panel:{
    backgroundColor:'rgba(210, 210, 210, 0.6)',
    
  },
 
});

function DetailedExpansionPanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root} >
      <ExpansionPanel className={classes.panel} style={props.color && {backgroundColor:props.color}} defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{props.text}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails >
          <div style={{textAlign:'left'}}>
            <p >Blood Group: {props.obj.blood}</p>
            <p >Gender: {props.obj.gender}</p>
            <p >Age: {props.obj.age}</p>
            <p >Email: {props.obj.email}</p>
            <p >Contact: {props.obj.contact}</p>
            <p >Address: {props.obj.address}</p>
            {props.buttons &&
              <div>
                {!props.loader ?
                <div>
                  <Button variant="contained" style={{backgroundColor:'green', color:'white'} } onClick={props.accept}>Accept</Button>
                  <Button variant="contained" onClick={props.ignore}>Ignore</Button> 
                </div>:<div><Loader size={30} color='gray'/></div>}
              </div>
            }
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailedExpansionPanel);