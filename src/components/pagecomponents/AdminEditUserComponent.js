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

class AdminEditUserComponent extends Component{
    constructor(props) {
        super(props);

        this.state = {
            username: 'Username',
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email',
            _id: '',
        };

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);


    }

    componentWillReceiveProps(newProps) {
        if(newProps.user.username != "")
        {
            this.setState({
                username: newProps.user.username,
                firstName: newProps.user.firstName,
                lastName: newProps.user.lastName,
                email: newProps.user.email,
                _id: newProps.user._id
            })
        }
    }



    handleFirstNameChange(e)  {

        this.setState({
            firstName: e.target.value
        });
    }
    handleLastNameChange(e)  {

        this.setState({
            lastName: e.target.value
        });
    }
    handleUserNameChange(e)  {

        this.setState({
            username: e.target.value
        });
    }

    handleEmailChange(e)  {

        this.setState({
            email: e.target.value
        });
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
                                       label={this.state.username}
                                       helperText="Username"

                            />

                        </div>
                        <br/>

                        <div className="margin-top-5">

                            <TextField onChange={this.handleFirstNameChange}
                                       style={{width: 400}}
                                       id="input-with-icon-grid"
                                       label={this.state.firstName}
                                       helperText="First Name"
                            />

                        </div>
                        <br/>
                        <div className="margin-top-5">

                            <TextField onChange={this.handleLastNameChange}
                                       style={{width: 400}}
                                       id="input-with-icon-grid"
                                       label={this.state.lastName}
                                       helperText="Last Name"
                            />

                        </div>
                        <br/>
                        <div className="margin-top-5">

                            <TextField onChange={this.handleEmailChange}
                                       style={{width: 400}}
                                       id="input-with-icon-grid"
                                       label={this.state.email}
                                       helperText="Email"
                            />

                        </div>
                        <br/>


                        <br/>

                        <div className="margin-top-5" onClick={() => this.props.handleUpdate(this.state)}>
                            <Button  style={{width: 400}} variant="contained" color="primary">
                                Update
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

AdminEditUserComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminEditUserComponent);
