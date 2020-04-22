import React, {Component} from 'react';
import LoginPageComponent from '../components/pagecomponents/LoginPageComponent';
import AppBarLogin from '../components/appbars/AppBarLogin';
import UserServices from "../services/UserServices";
import PropTypes from "prop-types";
import SnackBarLogin from '../components/SnackBar';

export default class LoginPage extends Component{
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            title: 'Login',
            snackBarOpen: false,
            snackBarText: ""
        };
        this.loginService = UserServices.instance;
    }


    homeButtonHandler = () => {
        this.context.router.history.push("/home");
    }

    login = (object) => {
        if(object.username !== "" && object.password !== "") {

            const user = {
                username: object.username,
                password: object.password
            };

            this.loginService.loginUser(user)
                .then((res) => {
                    if (res == null) {
                        this.setState({snackBarText: 'Username/Password not Found!'});
                        this.setState({snackBarOpen: true});
                    }
                    else if(res.userType === 'admin') {
                        this.context.router.history.push("/admin");
                    }
                    else if(res.userType === 'expert') {
                        this.context.router.history.push("/expert");
                    }

                    else if(res.username === object.username) {
                        localStorage.setItem("logged", "true");
                        this.context.router.history.push("/home");
                    }

                    });
        }
        else {
            this.setState({snackBarOpen: true});
            this.setState({snackBarText: "Username/Password cannot be Empty."});
        }
    }

    render() {
        return (
            <div className="back-color">
            <AppBarLogin title={this.state.title}
                         home={this.homeButtonHandler}
            />
            <LoginPageComponent login={this.login}/>
                <SnackBarLogin open={this.state.snackBarOpen}
                                text={this.state.snackBarText}
                />
            </div>
        );
    }

}