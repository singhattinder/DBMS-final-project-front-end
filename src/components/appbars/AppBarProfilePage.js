import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import blue from '@material-ui/core/colors/blue';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {Link } from 'react-router-dom';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

const col = blue[500];
function AppBarProfilePage(props) {
    const { classes } = props;
    let title = props.title;
    return (
        <div className={classes.root}>
            <MuiThemeProvider theme={theme}>
                <AppBar  position="sticky" color="primary">

                    <Toolbar>

                        <Typography variant="title" color="inherit" className={classes.flex}>
                            {title}
                        </Typography>
                        <div onClick={props.post}>
                            <Button color="inherit">Posts</Button>
                        </div>
                        <div onClick={props.users}>
                            <Button color="inherit">Users</Button>
                        </div>
                        <div onClick={props.myProfile}>
                            <Button color="inherit">Edit profile</Button>
                        </div>
                        <div onClick={props.home}>
                            <Button color="inherit">Home</Button>
                        </div>

                    </Toolbar>
                </AppBar>
            </MuiThemeProvider>
        </div>
    );
}

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#31a25e',
            dark: '#31a25e',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});


AppBarProfilePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBarProfilePage);