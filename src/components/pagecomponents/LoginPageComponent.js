import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Save from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import {createMuiTheme} from "@material-ui/core/styles/index";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
});

class LoginPageComponent extends Component{
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            username: '',
            showPassword: false
        };
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    handleUserNameChange(e)  {

        this.setState({
            username: e.target.value
        });
    }


    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
            <div className="row margin-container-100">

                <div className="col-centered">
                    <div className={classes.margin}>

                                <TextField  style={{width: 400}}
                                           id="input-with-icon-grid"
                                           label="Username"
                                            onChange={this.handleUserNameChange}
                                />

                    </div>
                    <br/>

                    <FormControl className="col-centered">
                        <InputLabel className="margin-left-8" htmlFor="adornment-password">Password</InputLabel>
                        <Input
                            className="margin-left-8"
                            id="adornment-password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.password}
                            style={{width: 400}}
                            onChange={this.handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                    >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <br/>

                    <div className="margin-top-20 margin-left-8" onClick={() => this.props.login(this.state)}>
                    <Button style={{width: 400}} variant="contained" color="primary">
                        Login
                    </Button>



                    </div>


                </div>
            </div>
            </MuiThemeProvider>
        );
    }




}

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#2196F3',
            dark: '#2196F3',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#ffffff',
        },
    },

});

LoginPageComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPageComponent);
