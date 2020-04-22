import React, {Component} from 'react';

import UserServices from "../services/UserServices";
import Divider from '@material-ui/core/Divider';
import UserListView from '../components/UserListView';
import UserListEditView from '../components/UserListEditView';
import {Like} from '../fontawesome/like';
import PropTypes from "prop-types";
import AppBarAdmin from '../components/appbars/AppBarAdmin';
import PostList from '../components/PostList';
import PaperSheet from '../components/PaperSheet';
import Button from '@material-ui/core/Button';
import {createMuiTheme} from "@material-ui/core/styles/index";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Typography from '@material-ui/core/Typography';
import PostServices from "../services/PostServices";


export default class Admin extends Component {
    static contextTypes = {
        router: PropTypes.object
    };


    constructor(props) {
        super(props);
        this.state = {
            title: 'Admin',
            users: [],
            posts: [],
            clickedUserId: ''
        };
        // this.logoutButtonHandler = this.logoutButtonHandler.bind(this);
         this.loginService = UserServices.instance;
        this.postService = PostServices.instance;
        // this.loadAllUsers = this.loadAllUsers.bind(this);
        // this.renderUsers = this.renderUsers.bind(this);
        // this.deleteUserHandler = this.deleteUserHandler.bind(this);
        // this.listClickHandler = this.listClickHandler.bind(this);
        // this.tmdbService = TmdbServices.instance;
        // this.loadAllMoviesByUser = this.loadAllMoviesByUser.bind(this);
        // this.renderMovieList = this.renderMovieList.bind(this);
        // this.deleteMovieHandler = this.deleteMovieHandler.bind(this);
        // this.addUserButtonHandler = this.addUserButtonHandler.bind(this);
        // this.renderEditUsers = this.renderEditUsers.bind(this);
        // this.editUserHandler = this.editUserHandler.bind(this);
    }


    componentDidMount() {
        this.loadAllUsers();
    }

    loadAllUsers = () => {
        this.loginService.getAllUsers()
            .then((res) => this.setState({
                users: res
            }));
    }

    loadAllPostsByUser = (userId) => {
        this.postService.getAllPostsByUserId(userId)
            .then((res) => {
                console.log('res', res);
                this.setState({
                    posts: res
                })
            });
        console.log(this.state.posts);
    }

    logoutButtonHandler = () => {

        this.loginService.logoutUser()
            .then((res) => {
                    this.context.router.history.push("/home");
                }
            );
    }

    deleteUserHandler = (id) => {
        this.loginService.deleteUserById(id)
            .then((res) => {
                this.loadAllUsers();
            })
    }

    listClickHandler = (userId)  => {
        this.setState({clickedUserId: userId});
        this.loadAllPostsByUser(userId);
    }

    addUserButtonHandler = () => {
        this.context.router.history.push("/adduser");
    }


    renderUsers = () => {
        return this.state.users.filter(user => user.userType !== 'admin').map((user) => {
            return <UserListView username={user.username}
                             key={user._id}
                             id={user._id}
                             deleteUser={this.deleteUserHandler}
                             user={this.listClickHandler}
            />
        })
    }

    renderEditUsers = () =>{
        return this.state.users.map((user) => {
            return <UserListEditView username={user.username}
                             key={user._id}
                             id={user._id}
                                     user={this.editUserHandler}

            />
        })

    }

    editUserHandler = (userId) => {
        this.context.router.history.push("/edit/"+userId);
    }

    deleteMovieHandler = (postId) => {
        this.postService.deletePostById(postId).then(res => {
            this.loadAllPostsByUser(this.state.clickedUserId);
        });
    }

    renderPostsList = () => {
        if (this.state.posts.length > 0) {
            return this.state.posts.map((obj) => {
                if (obj) {
                    return <PostList title={obj.title}
                                      key={obj._id}
                                      id={obj._id}
                                      deleteMovie={this.deleteMovieHandler}

                    />
                }
            })
        }
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
            <div className="back-color">
                <AppBarAdmin title={this.state.title}
                             logout={this.logoutButtonHandler}
                />
                <PaperSheet title="Welcome Admin"
                            text="You can Delete, Edit, Create Users and delete their Liked Posts"
                />
                <div className="row">
                    <div className="col-3">
                        <div className="margin-top-left-20" onClick={() => this.addUserButtonHandler()} >
                        <Button variant="contained" color="primary">
                            Add User
                        </Button>
                        </div>
                        <div className="margin-top-left-20">

                            <Typography  color="textSecondary">
                                Click on users to get posts
                            </Typography>

                        </div>



                        <div className="margin-auto">
                            {this.renderUsers()}
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="margin-auto">
                            {this.renderPostsList()}
                        </div>
                    </div>
                    <div className="col-3">

                        <div className="margin-top-left-20">

                            <Typography  color="textSecondary">
                               Edit Users
                            </Typography>

                        </div>
                        <div className="margin-auto">
                            {this.renderEditUsers()}
                        </div>
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