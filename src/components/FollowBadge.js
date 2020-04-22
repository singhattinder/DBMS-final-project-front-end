import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: `0 ${theme.spacing.unit * 2}px`,
    },
});

function FollowBadge(props) {
    const { classes } = props;
    return (
        <div>


            <Badge color="primary" badgeContent={props.count} className={classes.margin}>
                <Typography className={classes.padding}>{props.title}</Typography>
            </Badge>
        </div>
    );
}

FollowBadge.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FollowBadge);
