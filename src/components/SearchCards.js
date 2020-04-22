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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Imdb } from '../fontawesome/imdb';
import { Like } from '../fontawesome/like';
import StarRatingComponent from 'react-star-rating-component';
import LikeIcon from '../components/LikeIcon';

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
    let po = props.poster;
    console.log("media ", props.poster);
    return (
            <div className="margin-card">
                <div className="col-centered">

            <Card  className={classes.card} style={cardStyle}>

                <CardMedia
                    className={classes.media}
                    image={props.poster}
                />


                <CardHeader
                    title={props.title}
                    subheader={props.releaseDate}
                />
                <CardContent>

                    {/*<div component="h1" className="row">*/}
                    {/*    <Imdb/>*/}

                    {/*    <StarRatingComponent*/}
                    {/*        name="rate1"*/}
                    {/*        starCount={5}*/}
                    {/*        value={stars}*/}
                    {/*        className="star-margin"*/}
                    {/*    />*/}
                    {/*    <div className="like-margin" onClick={() => props.addMovie(props)}>*/}
                    {/*        <LikeIcon/>*/}
                    {/*    </div>*/}

                    {/*</div>*/}

                </CardContent>

            </Card>
                </div>
            </div>

    );
}
var cardStyle = {
    display: 'block',
    position: 'relative',
    width: '30vw',
    transitionDuration: '0.3s'
};

SimpleMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);