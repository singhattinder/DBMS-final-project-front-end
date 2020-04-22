import React, {Component} from 'react';
import ProfilePageComponent from '../components/pagecomponents/ProfilePageComponent';
import AppBarProfilePage from '../components/appbars/AppBarProfilePage';
import UserServices from "../services/UserServices";
import Divider from '@material-ui/core/Divider';
import PostCard from '../components/PostCard';
import { Like } from '../fontawesome/like';
import PropTypes from "prop-types";
import MyProfilePageComponent from '../components/pagecomponents/MyProfilePageComponent';
import AppBarEditProfile from '../components/appbars/AppBarEditProfile';
import PostServices from "../services/PostServices";

export  default class PostPage extends Component{
    static contextTypes = {
        router: PropTypes.object
    };


    constructor(props) {
        super(props);
        this.state = {
            title: 'All Posts',
            posts: []
        };



        // this.loadUser = this.loadUser.bind(this);
        this.loginService = UserServices.instance;
        this.postService = PostServices.instance;
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
        this.loadPosts();
    }

    loadPosts = () => {
        this.postService.getAllPosts().then(res => {
            this.setState({posts: res})
        })
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

    cardClickHandler = (id) => {
       // console.log("card is ", id);
        this.context.router.history.push("/post/" + id);
    }


    renderPosts = () => {

        return this.state.posts.map((obj) => {
            if(obj){

                return <PostCard key={obj._id}
                                    title={obj.title}
                                    content={obj.content}
                                    id={obj._id}
                                    cardClick={this.cardClickHandler}
                />
            }

        })
    }






    render() {
        return (
            <div className="back-color">
                <AppBarEditProfile   title={this.state.title}
                                     home={this.homeButtonHandler}
                                     profile={this.profileButtonHandler}
                />
                <div className="row">
                    <div className="col-10">
                        <div className="row">
                            {this.renderPosts()}
                        </div>

                    </div>
                </div>
            </div>


        );
    }

}