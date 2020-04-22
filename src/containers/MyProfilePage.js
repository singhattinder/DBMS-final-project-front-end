import React, {Component} from 'react';
import ProfilePageComponent from '../components/pagecomponents/ProfilePageComponent';
import AppBarProfilePage from '../components/appbars/AppBarProfilePage';
import UserServices from "../services/UserServices";
import Divider from '@material-ui/core/Divider';
import ProfileCard from '../components/ProfileCards';
import { Like } from '../fontawesome/like';
import PropTypes from "prop-types";
import MyProfilePageComponent from '../components/pagecomponents/MyProfilePageComponent';
import AppBarEditProfile from '../components/appbars/AppBarEditProfile';

export  default class ProfilePage extends Component{
    static contextTypes = {
        router: PropTypes.object
    };


    constructor(props) {
        super(props);
        this.state = {
            title: 'My Profile',
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            userType: ''
        };



        // this.loadUser = this.loadUser.bind(this);
         this.loginService = UserServices.instance;
        // this.tmdbServices = TmdbServices.instance;
        // this.profileButtonHandler = this.profileButtonHandler.bind(this);
        // this.homeButtonHandler = this.homeButtonHandler.bind(this);
        // this.updateButtonHandler = this.updateButtonHandler.bind(this);
    }

    loadUser =() => {
        this.loginService.getProfile()
            .then((res) => {
                this.setState({
                    username: res.username,
                    firstName: res.firstName,
                    lastName: res.lastName,
                    email: res.email,
                    userType: res.userType
                })
            });

    }

    componentDidMount() {
        this.loadUser();
    }


    profileButtonHandler = () => {
        console.log("hello");
        this.context.router.history.push("/profile");
    }

    homeButtonHandler = () => {
        this.context.router.history.push("/home");
    }

    updateButtonHandler = (user) => {
       this.loginService.updateUser(user)
           .then((res) => this.context.router.history.push("/profile"))
    }



    render() {
        return (
            <div className="back-color">
                <AppBarEditProfile   title={this.state.title}
                                   home={this.homeButtonHandler}
                                   profile={this.profileButtonHandler}
                />
                <MyProfilePageComponent user={this.state}
                                        handleUpdate={this.updateButtonHandler}
                />
                <div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>

                </div>
            </div>


        );
    }

}