import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { ImdbProfile } from '../fontawesome/ImdbProfile';
import { Like } from '../fontawesome/like';
import StarRatingComponent from 'react-star-rating-component';
import DeleteIcon from '@material-ui/icons/Delete';

import EditIcon from '@material-ui/icons/Edit';


const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },

};

function ProfileCards(props) {
    const { classes } = props;
    return (
        <div className="margin-card">

            <Card className={classes.card} style={cardStyle}>


                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                            M
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <DeleteIcon onClick={() => props.delete(props.id)} />
                        </IconButton>
                    }

                    title={props.title}
                    subheader={props.releaseDate}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.content}
                    </Typography>
                </CardContent>

                <CardActions disableSpacing>
                    <IconButton aria-label="edit">
                        <EditIcon onClick={() => props.edit(props.id)} />
                    </IconButton>
                </CardActions>

            </Card>


        </div>
    );
}
var cardStyle = {
    display: 'block',
    position: 'relative',
    width: '20vw',
    transitionDuration: '0.3s',
    height: '20vw',
    fontFamily: 'Open Sans'
}

ProfileCards.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileCards);