import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 280,
    minWidth: 200,
    margin:5,

  },
  media: {
    height: 140,
  },
};

function BloodCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.group}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.group}
          </Typography>
          <Typography component="p">
            {props.details}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

BloodCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BloodCard);