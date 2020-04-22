import React from 'react';
import { withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Avatar, IconButton} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import DeleteIcon from '@material-ui/icons/Delete';


const styles = {
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },

};

 function OutlinedCard(props) {
    const { classes } = props;
     const arr = props.title && props.title.split("");

    return (
        <Card className="margin-card-outline" variant="outlined">
            <CardContent>
                 <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {arr && arr[0]}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            {!props.title && <DeleteIcon onClick={() => props.delete(props.id)} />}
                        </IconButton>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                />
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {props.post.user && props.post.user.firstName}
                    {" "}
                    {props.post.user && props.post.user.lastName}
                </Typography>

                <Typography variant="body2" component="p">
                    <br />
                    {props.content}
                </Typography>

            </CardContent>
        </Card>
    );
}

export default withStyles(styles)(OutlinedCard);