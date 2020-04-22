import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import UserServices from "../services/UserServices";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class FollowersList extends React.Component {


    constructor(props) {
        super(props);
        this.state ={
            followers: [],
            followersUser: []
        };
        this.getFollowersUserName = this.getFollowersUserName.bind(this);
        this.loginService = UserServices.instance;
        this.loadUsers = this.loadUsers.bind(this);
    }

    componentDidMount() {
        this.setState({followers: this.props.followers});
        this.loadUsers();
    }

    componentWillReceiveProps(newProps) {
        this.setState({followers: newProps.followers})
    }

    getFollowersUserName(userId) {
        this.loginService.getUserById(userId).then((res) => console.log(res));

    }

    loadUsers() {
        this.state.followers.map((value) => this.getFollowersUserName(value));
    }


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <List>
                    {this.state.followers.map(value => (
                        <ListItem key={value.id} dense button className={classes.listItem}>
                            <ListItemText primary={value.user} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

FollowersList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FollowersList);
