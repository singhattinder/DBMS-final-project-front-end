import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Inputs from "../SearchField";



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
class AppBarHome extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        let isLogged = localStorage.getItem("logged") === 'true';

        return (
            <div className={classes.root}>
                <MuiThemeProvider theme={theme}>
                    <AppBar position="sticky"  color="primary">

                        <Toolbar>

                            <Typography variant="title" color="inherit" className={classes.flex}>
                                {this.props.title}
                            </Typography>

                            <div>
                                <Inputs classes={this.props}
                                        handleChange = {this.props.handleChange}
                                />
                            </div>


                            { !isLogged && <Button onClick={this.props.loginClick} color="inherit">Login</Button>}

                            {!isLogged && <Button onClick={this.props.registerClick} color="inherit">Register</Button>}


                            { isLogged && <div onClick={() => this.props.profile()}>
                                <Button color="inherit">Profile</Button>
                            </div> }
                            {
                                isLogged &&
                                <div onClick={() => this.props.logout()}>
                                    <Button color="inherit">Logout</Button>
                                </div>
                            }

                        </Toolbar>
                    </AppBar>
                </MuiThemeProvider>
            </div>
        );
    }
}

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#31a25e',
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


AppBarHome.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBarHome);