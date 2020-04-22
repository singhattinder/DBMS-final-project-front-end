import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },

};

function SimpleMediaCard(props) {

const { classes } = props;
const arr = props.title.split("");


  return (
  <div className="margin-card">
                  <div className="col-centered">
    <Card   className={classes.card} style={cardStyle}>
      <CardHeader onClick={ () => !props.deleteBool && props.cardClick(props.actualId)}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            { arr && arr[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
          {props.deleteBool ? <DeleteIcon onClick={() => props.deleteRecipe(props.id)}/> :  <MoreVertIcon />}

          </IconButton>
        }
        title={props.title}
//         subheader={ "Ready In minutes: " + props.time}

      />
      <CardMedia onClick={ () => !props.deleteBool && props.cardClick(props.actualId)}
        className={classes.media}
        image={"https://spoonacular.com/recipeImages/" + props.poster  }
        title={props.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.minutes}
          {" "}
          {props.servings}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>


      {props.bool &&  <div className="like-margin" onClick={() => props.addRecipe(props)}>

                                    <IconButton  aria-label="add to favorites">
                                              <FavoriteIcon  />
                                            </IconButton>
                                </div>

     }
      </CardActions>

    </Card>
    </div>
    </div>
  );
}

var cardStyle = {
    display: 'block',
    position: 'relative',
    width: '30vw',
    transitionDuration: '0.3s',
    avatar: {
        backgroundColor: red[500],
      }
};

SimpleMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);