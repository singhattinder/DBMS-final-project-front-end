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
function AppBarLoggerUser(props) {
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
                        <div>
                            <Button href={'/login'} color="inherit">Profile
                            </Button>
                        </div>
                        <div>
                            <Button href={'/register'} color="inherit">Logout</Button>
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
            main: '#2196F3',
            dark: '#2196F3',
            contrastText: '#fff',
            primaryTextColor: '#ffffff'

        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#fff',
            primaryTextColor: '#ffffff'
        },
    },
    overrides: {
        MuiButton: {
            raisedPrimary: {
                textColor: '#fff',
                primaryTextColor: '#ffffff'
            },
        },
    }
});


AppBarLoggerUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBarLoggerUser);