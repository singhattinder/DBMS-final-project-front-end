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
import RegistrationDialogSelect from '../RegistraionDialog';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
});

class RegistrationPageComponent extends Component{
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            showPassword: false,
            username: '',
            verifyPassword: '',
            firstName: '',
            lastName: '',
            email: '',
            userType: 'user'

        };
    }



    handleFirstNameChange = (e) =>  {

        this.setState({
            firstName: e.target.value
        });
    }
    handleLastNameChange = (e) =>  {

        this.setState({
            lastName: e.target.value
        });
    }
    handleUserNameChange = (e) => {

        this.setState({
            username: e.target.value
        });
    }
    handlePasswordChange = (e) =>  {

        this.setState({
            password: e.target.value
        });
    }
    handleVerifyPasswordChange = (e) => {

        this.setState({
            verifyPassword: e.target.value
        });
    }

    handleEmailChange = (e) =>  {

        this.setState({
            email: e.target.value
        });
    }

    handleUserType = (type) => {
        this.setState({userType: type})
    }


    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div className="row margin-container-20">

                    <div className="col-centered">
                        <div className="margin-top-5">

                            <TextField onChange={this.handleUserNameChange}
                                       style={{width: 400}}
                                       id="input-with-icon-grid"
                                       label="Username" />

                        </div>
                        <br/>
                        <div className="margin-top-5">

                            <TextField onChange={this.handlePasswordChange}
                                       style={{width: 400}}
                                       id="input-with-icon-grid"
                                       label="Password" />

                        </div>
                        <br/>
                        <div className="margin-top-5">

                            <TextField onChange={this.handleVerifyPasswordChange}
                                       style={{width: 400}}
                                       id="input-with-icon-grid"
                                       label="Confirm Password" />

                        </div>
                        <br/>
                        <div className="margin-top-5">

                            <TextField onChange={this.handleFirstNameChange}
                                       style={{width: 400}}
                                       id="input-with-icon-grid"
                                       label="First Name" />

                        </div>
                        <br/>
                        <div className="margin-top-5">

                            <TextField onChange={this.handleLastNameChange}
                                       style={{width: 400}}
                                       id="input-with-icon-grid"
                                       label="Last Name" />

                        </div>
                        <br/>
                        <div className="margin-top-5">

                            <TextField onChange={this.handleEmailChange}
                                       style={{width: 400}}
                                       id="input-with-icon-grid"
                                       label="Email" />

                        </div>
                        <br/>
                        <RegistrationDialogSelect select={this.handleUserType}/>


                        <br/>

                        <div className="margin-top-5" onClick={() => this.props.handleRegister(this.state)}>
                            <Button  style={{width: 400}} variant="contained" color="primary">
                                Register
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

RegistrationPageComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegistrationPageComponent);
