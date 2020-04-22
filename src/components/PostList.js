import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from "@material-ui/icons/Delete"

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class PostList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: [0],
        };
    }



    handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
    };

    render() {
        const { classes } = this.props;


        return (
            <div className={classes.root}>
                <List>
                    {
                        <ListItem
                            key={this.props.id}
                            dense
                            button
                            className={classes.listItem}>

                            <ListItemText primary={this.props.title} />
                            <ListItemSecondaryAction>
                                <div onClick={() => this.props.deleteMovie(this.props.id)}>
                                    <IconButton aria-label="Comments" >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </ListItemSecondaryAction>
                        </ListItem>
                    }
                </List>
            </div>
        );
    }
}

PostList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostList);
