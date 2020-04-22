import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Person from '@material-ui/icons/Person';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListItem from '@material-ui/core/ListItem';

const styles = {
    list: {
        width: 5,
    },
    fullList: {
        width: 'auto',
    },
};

class UsersDrawer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            top: this.props.show,
            users: []
        };
        this.listRender = this.listRender.bind(this);

    }

    componentWillReceiveProps(newProps) {
        this.setState({top: newProps.show,
                        users: newProps.users
        })
    }






    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    listRender() {
        return this.state.users.map((users) => {
            return <div>


                        <ListItem button>
                            <ListItemIcon>
                                <Person />
                            </ListItemIcon>
                            <ListItemText primary={users.username} />
                            <PersonAdd onClick={() => {this.props.followuser(users._id, users.username)}}/>
                        </ListItem>

            </div>
        });
    }

    render() {
        const { classes } = this.props;
        const sideList = (
            <div className={classes.list}>
                <List>"will"</List>
            </div>
        );

        const fullList = (
            <div className={classes.fullList}>
                <List>

                    {this.listRender()}
                </List>
            </div>
        );

        return (
            <div>

                <SwipeableDrawer
                    anchor="top"
                    width="50%"
                    open={this.state.top}
                    onClose={this.toggleDrawer('top', false)}
                    onOpen={this.toggleDrawer('top', true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('top', false)}
                        onKeyDown={this.toggleDrawer('top', false)}
                    >
                        {fullList}
                    </div>
                </SwipeableDrawer>

            </div>
        );
    }
}

UsersDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersDrawer);
