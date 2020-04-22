import React, {Component} from 'react';
import RegistrationPageComponent from '../components/pagecomponents/RegistrationPageComponent';
import AppBarAdminCreate from '../components/appbars/AppBarAdminCreate';
import AlertDialog from '../components/AlertDialog';
import PropTypes from "prop-types";
import UserServices from "../services/UserServices";

export  default class AddUserAdmin extends Component{

    static contextTypes = {
        router: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            title: 'Admin Add User',
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            userType: 'user',
            verifyPassword: '',
            dialogOpen: false
        };

        this.handleRegister = this.handleRegister.bind(this);
        this.checkFields = this.checkFields.bind(this);
        this.adminButtonHandler = this.adminButtonHandler.bind(this);
        this.loginService = UserServices.instance;
    }

    adminButtonHandler() {
        this.context.router.history.push("/admin");
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

        if(this.state.username !=='' && this.state.password !== '') {
            if(this.state.password === this.state.verifyPassword) {

                this.loginService.registerUser(this.state)
                    .then((res) => this.context.router.history.push("/admin"));
            }
            else {
                alert("password don't match");
            }
        }
        else {
            alert("Enter username and password");

        }

    }

    checkFields(flag) {
        if(flag === '1') {

            return <AlertDialog open={this.state.dialogOpen}
                                text = {'It is an identification used by a person with access to a computer, network, or online service.'}
                                heading={"Please enter username before proceeding"}/>
        }
        else if(flag === '2') {

            return <AlertDialog open={true}
                                text = {'An identification used by a person with access to a computer, network, or online service.'}
                                heading={"Please enter username before proceeding"}/>
        }

    }



    render() {

        return (
            <div className="back-color">
                <AppBarAdminCreate title={this.state.title}
                             admin={this.adminButtonHandler}
                />
                <RegistrationPageComponent handleRegister={this.handleRegister}/>
            </div>
        );
    }

}