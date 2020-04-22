import React, {Component} from 'react';
import ProfilePageComponent from '../components/pagecomponents/ProfilePageComponent';
import AppBarProfilePage from '../components/appbars/AppBarProfilePage';
import UserServices from "../services/UserServices";
import Divider from '@material-ui/core/Divider';
import ProfileCard from '../components/ProfileCards';
import { Like } from '../fontawesome/like';
import PropTypes from "prop-types";
import MyProfilePageComponent from '../components/pagecomponents/MyProfilePageComponent';
import AppBarAdminEditUser from '../components/appbars/AppBarAdminEditUser';
import AdminEditUserComponent from '../components/pagecomponents/AdminEditUserComponent';

export  default class AdminEditUser extends Component{
    static contextTypes = {
        router: PropTypes.object
    };


    constructor(props) {
        super(props);
        this.state = {
            title: 'Admin Edit User',
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            userType: '',
            _id: '',
        };



        // this.loadUser = this.loadUser.bind(this);
         this.loginService = UserServices.instance;
        // this.tmdbServices = TmdbServices.instance;
        // this.adminButtonHandler = this.adminButtonHandler.bind(this);
        // this.updateButtonHandler = this.updateButtonHandler.bind(this);
    }

    loadUser() {
        this.loginService.getUserById(this.props.match.params.userId)
            .then((res) => {
                this.setState({
                    username: res.username,
                    firstName: res.firstName,
                    lastName: res.lastName,
                    email: res.email,
                    userType: res.userType,
                    _id: res._id
                })
            });


    }

    componentDidMount() {
        this.loadUser();
    }

    adminButtonHandler = () => {
        this.context.router.history.push("/admin");
    }

    updateButtonHandler = (user) => {

        this.loginService.updateUserById(user)
            .then((res) => this.context.router.history.push("/admin"))
    }



    render() {
        return (
            <div className="back-color">
                <AppBarAdminEditUser   title={this.state.title}
                                   admin={this.adminButtonHandler}
                />
                <AdminEditUserComponent user={this.state}
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