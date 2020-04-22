import React, {Component} from 'react';

import UserServices from "../services/UserServices";
import Divider from '@material-ui/core/Divider';
import UserList from '../components/UserListView';
import {Like} from '../fontawesome/like';
import PropTypes from "prop-types";
import AppBarAdmin from '../components/appbars/AppBarAdmin';
import MovieList from '../components/PostList';
import PaperSheet from '../components/PaperSheet';
import  ActorCard from '../components/ActorCard';
import PostServices from "../services/PostServices";
import PostCard from "../components/PostCard";


export default class Expert extends Component {
    static contextTypes = {
        router: PropTypes.object
    };


    constructor(props) {
        super(props);
        this.state = {
            title: 'Expert',
            posts: [],

        };
        // this.logoutButtonHandler = this.logoutButtonHandler.bind(this);
        // this.tmdbService = TmdbServices.instance;
        this.postService = PostServices.instance;
        this.loginService = UserServices.instance;
        // this.loadAllMovies = this.loadAllMovies.bind(this);
        // this.renderMovies = this.renderMovies.bind(this);
        // this.cardClickHandler =this.cardClickHandler.bind(this);

    }


    componentDidMount() {
         this.loadAllPosts();
    }


    logoutButtonHandler = () => {

        this.loginService.logoutUser()
            .then((res) => {
                    this.context.router.history.push("/home");
                }
            );
    }

    loadAllPosts = () => {
        this.postService.getAllPosts()
            .then((res) => this.setState({posts: res}));
    }

    cardClickHandler = () => {

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
                <AppBarAdmin title={this.state.title}
                             logout={this.logoutButtonHandler}
                />
                <PaperSheet title="Welcome Expert"
                            text="You can view all posts by your tag"
                />
                <div className="row">
                    {this.renderPosts()}
                </div>


            </div>


        );
    }

}