import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import Home from './Home';
import LoginPage from '../containers/LoginPage';
import ProfilePage from '../containers/ProfilePage';
import RegistrationPage from '../containers/RegistrationPage';
import MyProfilePage from '../containers/MyProfilePage';
import Admin from '../containers/Admin';
import RecipeDetails from './RecipeDetails';
import Expert from './Expert';
import AddUserAdmin from '../containers/AddUserAdmin';
import AdminEditUser from '../containers/AdminEditUser';
import PostPage from "./PostPage";
import PostDetail from "./PostDetail";


const isAuthenticated = () => {
        if(localStorage.getItem("logged") === 'true'){
            return true;
        }
        else {
            return false;
        }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default class Routing extends Component{



    render() {
        return (
            <Router>
                <div className="container-fluid">


                    <Route exact={true} path="/"
                           component={Home}/>
                    <Route exact={true} path="/home"
                           component={Home}/>
                    <Route exact={true} path="/login"
                           component={LoginPage}/>
                    <PrivateRoute exact={true} path="/profile"
                           component={ProfilePage}/>
                    <Route exact={true} path="/admin"
                           component={Admin}/>

                    <PrivateRoute exact={true}
                                  path={"/myprofile"}
                                  component={MyProfilePage}/>
                    <PrivateRoute exact={true}
                                  path={"/post"}
                                  component={PostPage}/>
                    <PrivateRoute exact={true}
                                  path={"/post/:postId"}
                                  component={PostDetail}/>

                    <Route exact={true} path="/register"
                           component={RegistrationPage}/>
                    <Route exact={true} path="/recipe/:recipeId"
                           component={RecipeDetails}/>
                    <Route exact={true} path="/expert"
                           component={Expert}/>
                    <Route exact={true} path="/adduser"
                           component={AddUserAdmin}/>
                    <Route exact={true} path="/edit/:userId"
                           component={AdminEditUser}/>


                </div>


            </Router>
        );
    }
};
