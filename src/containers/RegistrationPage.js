import React, {Component} from 'react';
import RegistrationPageComponent from '../components/pagecomponents/RegistrationPageComponent';
import AppBarLogin from '../components/appbars/AppBarLogin';
import AlertDialog from '../components/AlertDialog';
import PropTypes from "prop-types";
import UserServices from "../services/UserServices";

export  default class RegistrationPage extends Component{

    static contextTypes = {
        router: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            title: 'Register',
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            userType: 'user',
            verifyPassword: '',
            dialogOpen: false,
            dialogText: '',
            dialogTitle: ''
        };

        this.handleRegister = this.handleRegister.bind(this);
        this.homeButtonHandler = this.homeButtonHandler.bind(this);
        this.loginService = UserServices.instance;
        this.dialogHandle = this.dialogHandle.bind(this);
    }

    homeButtonHandler() {
        this.context.router.history.push("/home");
    }

    handleRegister(object) {
        this.setState({
            username: object.username,
            password: object.password,
            firstName: object.firstName,
            lastName: object.lastName,
            email: object.email,
            verifyPassword: object.verifyPassword,
            userType: object.userType
        });

        if(this.state.username !== '' && this.state.password !== '') {
               if(this.state.password === this.state.verifyPassword) {

                   this.loginService.registerUser(this.state)
                       .then((res) => this.context.router.history.push("/home"));
               }
               else {
                   this.setState({dialogOpen: true});
                   this.setState({dialogText: 'Please Enter Passwords carefully'});
                   this.setState({dialogTitle: 'Passwords Do not match'});

               }
        }
        else {
            console.log("username " , this.state.username);
            console.log("password " , this.state.password);
            console.log("verify " , this.state.verifyPassword);

            this.setState({dialogOpen: true});
            this.setState({dialogText: 'Click again on register and proceed'});
            this.setState({dialogTitle: 'Thanks for Registering'});

        }

    }

    dialogHandle() {
        this.setState({dialogOpen: true})
    }



    render() {

        return (
            <div className="back-color">
                <AppBarLogin title={this.state.title}
                             home={this.homeButtonHandler}
                />
                <AlertDialog open={this.state.dialogOpen}
                             dialog={this.state.dialogHandle}
                             text={this.state.dialogText}
                             title={this.state.dialogTitle}
                />
                <RegistrationPageComponent handleRegister={this.handleRegister}/>
            </div>
        );
    }

}