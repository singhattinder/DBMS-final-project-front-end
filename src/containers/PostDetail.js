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
import Paper from '@material-ui/core/Paper';
import OutlinedCard from '../components/OutlinedCard';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';

export  default class PostDetail extends Component{
    static contextTypes = {
        router: PropTypes.object
    };


    constructor(props) {
        super(props);
        this.state = {
            title: 'Post',
            comments: [],
            tags: [],
            post: '',
            comment: '',
            tag: ''
        };



        // this.loadUser = this.loadUser.bind(this);
        this.loginService = UserServices.instance;
        this.postService = PostServices.instance;
        // this.tmdbServices = TmdbServices.instance;
        // this.profileButtonHandler = this.profileButtonHandler.bind(this);
        // this.homeButtonHandler = this.homeButtonHandler.bind(this);
        // this.updateButtonHandler = this.updateButtonHandler.bind(this);
    }

    // loadUser =() => {
    //     this.loginService.getProfile()
    //         .then((res) => {
    //             this.setState({
    //                 username: res.username,
    //                 firstName: res.firstName,
    //                 lastName: res.lastName,
    //                 email: res.email,
    //                 userType: res.userType
    //             })
    //         });
    //
    // }

    componentDidMount() {
        // this.loadUser();
        this.loadPost();
        this.loadtags();
    }

    loadPost = async () => {
        const postId = this.props.match.params.postId;
       await this.postService.getPostById(postId).then(res => {
            console.log("post: ", res);
            this.setState({post: res})
        })
    }


    loadtags = async () => {
        const postId = this.props.match.params.postId;
        await this.postService.getAllTagsByPostId(postId).then(res => {

            this.setState({tags: res})
        })
        console.log("tags ", this.state.tags);
    }




    profileButtonHandler = () => {
        this.context.router.history.push("/profile");
    }

    homeButtonHandler = () => {
        this.context.router.history.push("/home");
    }

    updateButtonHandler = (user) => {
        this.loginService.updateUser(user)
            .then((res) => this.context.router.history.push("/profile"))
    }

    handleInputChange = (event) => {
        this.setState({comment: event.target.value})
    }

    addComment = () => {
        const comment = {
            comment: {commentAnswer: this.state.comment},
            id: this.state.post._id
        }
        this.postService.addComment(comment).then(res => {
            this.loadPost();
            this.setState({comment: ''})
        })
    }

    addTag = () => {
        const tag = {
            tagName: this.state.tag,
            id: this.state.post._id
        }
        this.postService.createTag(tag).then(res => {
            this.loadtags();
        })

    }

    handleInputChangeTag = (event) => {
        this.setState({tag: event.target.value})
    }

    handleDeleteComment = (id) => {
        this.postService.deleteComment(this.state.post._id, id).then(res => {
            this.loadPost();
        })
    }


    renderComments = () => {

        return this.state.post && this.state.post && this.state.post.comments.map((obj) => {
            if(obj){
                return <OutlinedCard key={obj._id}
                                    content={obj.commentAnswer}
                                    id={obj._id}
                                     post={this.state.post}
                                     delete={this.handleDeleteComment}
                />
            }

        })
    }

    renderTags = () => {

        return this.state.tags && this.state.tags.map((obj) => {
            if(obj){
                return  <Chip
                        key={obj._id}
                        id={obj._id}
                        label={obj.tags.tagName}
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
                <OutlinedCard title={this.state.post.title} content={this.state.post.content}  post={this.state.post}/>

                <div className="row">
                    <div className="col-10">
                        <div className="row">

                            {this.renderComments()}
                        </div>

                    </div>
                </div>

                <div className="col-centered-detail">
                    <Input placeholder={"add comment"} onChange={this.handleInputChange} fullWidth={false} multiline={true} />

                </div>


                <div onClick={this.addComment} className="margin-top-20 margin-left-8">
                    <Button  style={{width: 200}} variant="contained" color="primary">
                        Add comment
                    </Button>
                </div>



                <div className={"margin-top-20"}>
                    {this.renderTags()}
                </div>

                <div className="col-centered-detail">
                    <Input placeholder={"add Tag"} onChange={this.handleInputChangeTag} fullWidth={false} multiline={true} />
                </div>


                <div onClick={this.addTag} className="margin-top-20 margin-left-8">
                    <Button  style={{width: 200}} variant="contained" color="primary">
                        Add Tag
                    </Button>
                </div>
            </div>


        );
    }

}