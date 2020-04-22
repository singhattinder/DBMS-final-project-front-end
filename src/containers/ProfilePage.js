import React, {Component} from 'react';
import ProfilePageComponent from '../components/pagecomponents/ProfilePageComponent';
import AppBarProfilePage from '../components/appbars/AppBarProfilePage';
import UserServices from "../services/UserServices";
import PostServices from "../services/PostServices";
import Divider from '@material-ui/core/Divider';
import ProfileCard from '../components/ProfileCards';
import { Like } from '../fontawesome/like';
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';
import UsersDrawer from '../components/UsersDrawer';
import FollowersList from '../components/FollowersList';
import Button from '@material-ui/core/Button';
import FollowBadge from '../components/FollowBadge';
import FullScreenDialog from '../components/FullScreenComponent';
import FullScreenEditDialogDialog from '../components/FullScreenEditComponent';
import RecipeServices from "../services/RecipeServices";
import SimpleMediaCard from "../components/SearchCard";





export  default class ProfilePage extends Component{
    static contextTypes = {
        router: PropTypes.object
    };


    constructor(props) {
        super(props);
        this.state = {
            title: 'Profile',
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            id: '',
            recipes: [],
            userType: '',
            drawerShow: false,
            users: [],
            followers: [],
            following: [],
            picture: [],
            posts: [],
            editOpen: false,
            postTitle: '',
            postContent: '',
            postId: ''
        };



        // this.loadUser = this.loadUser.bind(this);
         this.loginService = UserServices.instance;
         this.postService = PostServices.instance;
        this.recipeService = RecipeServices.instance;
        // this.loadMovies = this.loadMovies.bind(this);
        // // this.tmdbServices = TmdbServices.instance;
        // this.renderMovies = this.renderMovies.bind(this);
        // this.myProfileButtonHandler = this.myProfileButtonHandler.bind(this);
        // this.homeButtonHandler = this.homeButtonHandler.bind(this);
        // this.cardClickHandler = this.cardClickHandler.bind(this);
        // this.handleButtonUsers = this.handleButtonUsers.bind(this);
        // this.findAllUsers = this.findAllUsers.bind(this);
        // this.followUserHandler = this.followUserHandler.bind(this);
        // this.getFollowers = this.getFollowers.bind(this);
        // this.getFollowing = this.getFollowing.bind(this);

    }

    loadUser = () => {
            this.loginService.getProfile()
                .then((res) => {
                    console.log(res);
                    this.setState({
                        username: res.username,
                        email: res.email,
                        firstName: res.firstName,
                        lastName: res.lastName,
                        userType: res.userType,
                        id: res._id

                    })
                });
    }

    componentDidMount() {
        this.loadUser();
        //this.loadMovies();
        this.getFollowers();
        this.getFollowing();
        this.findAllPosts();
        this.findAllLikedRecipes();
}


    findAllLikedRecipes = async () => {
        await this.recipeService.getRecipesForUser().then(res => {
            this.setState({recipes: res})
            })
        console.log(this.state.recipes);
    }


     findAllPosts =  async () => {
       return await this.postService.getAllPostsByUser().then(res => {
            this.setState({ posts: res})
        })
    }

    findAllUsers = () => {
        this.loginService.getAllUsers()
            .then((res) => this.setState({users: res}));
    }


    followUserHandler = (followId, userName) => {
            this.loginService.setFollowing(followId, userName)
                .then((res) => console.log(res));
            this.getFollowers();
            this.getFollowing();
    }

    handleButtonUsers = () => {
        this.findAllUsers();
        this.setState({drawerShow: true});
        console.log(this.state.users);
    }



    getFollowers = () => {
        this.loginService.getFollowers()
            .then((res) => this.setState({followers: res.followers}))
    }

    getFollowing = () => {
        this.loginService.getFollowing()
            .then((res) => this.setState({following: res.following}))
    }


    myProfileButtonHandler = () => {
        this.context.router.history.push("/myprofile");
    }

    homeButtonHandler = () => {
        this.context.router.history.push("/home");
    }

    postButtonHandler = () => {
        this.context.router.history.push("/post");
    }

    cardClickHandler = (id) => {
        this.context.router.history.push("/movie/"+id);
    }

    handleRecipeDelete = (id) => {
        this.postService.deletePostById(id).then(res => {
            this.findAllPosts();
        });

    }

    handleRecipeEdit = (id) => {

        this.postService.getPostById(id).then(res => {
            this.setState({postTitle: res.title, postContent: res.content, editOpen: true, postId: id})
        });

    }

    handleEditClose = () => {
        this.setState({editOpen: false})
    }

    handleEditSave = async (title, content) => {
        const post = {
            id: this.state.postId,
            title: title,
            content: content
        };

        this.postService.updatePost(post).then((res) => {
        })
        this.handleEditClose();
       await this.findAllPosts();
    }

    handleRecipeDeletePopulated = (id) => {

        this.recipeService.deleteRecipeById(id).then(res =>
            this.findAllLikedRecipes()
        );
    }



    renderPosts = () => {

        return this.state.posts.map((obj) => {
            if(obj){

                return <ProfileCard key={obj._id}
                                    title={obj.title}
                                    content={obj.content}
                                    id={obj._id}
                                    delete={this.handleRecipeDelete}
                                    edit={this.handleRecipeEdit}
                />
            }

         })
    }

    renderRecipes = () => {

        let results = null;
        if(Object.keys(this.state.recipes).length !== 0){
            results = this.state.recipes.map(
                (results) =>{

                    console.log(results)

                    const minutes =  "Ready in Minutes: " +  results.recipe.readyInMinutes;
                    const servings =  "Serving size: " +  results.recipe.servings ;

                    return <SimpleMediaCard key={   results.recipe._id}
                                            minutes={  minutes}
                                            servings={  servings}
                                            title={  results.recipe.title}
                                            poster={  results.recipe.image}
                                            id={  results.recipe._id}
                                            deleteBool={true}
                                            deleteRecipe={this.handleRecipeDeletePopulated}

                    />
                }
            )
        }
        return results;
    }


    render() {
        return (
            <div className="back-color">
                <AppBarProfilePage title={this.state.title}
                                   myProfile={this.myProfileButtonHandler}
                                   home={this.homeButtonHandler}
                                   users={this.handleButtonUsers}
                                   post={this.postButtonHandler}

                />
                <ProfilePageComponent user={this.state}/>
                <FullScreenDialog title={"Create"} button={"Save"} findAllPosts={this.findAllPosts} postService = {this.postService}/>
                <FullScreenEditDialogDialog open={this.state.editOpen}
                                            setClose={this.handleEditClose}
                                            title={"Edit"} button={"Save"} findAllPosts={this.findAllPosts}
                                            postTitle={this.state.postTitle}
                                            postContent={this.state.postContent}
                                            setSave={this.handleEditSave}/>
                <div className="margin-top-10">
                    <Divider/>
                </div>
                <UsersDrawer show={this.state.drawerShow}
                             users={this.state.users}
                             followuser={this.followUserHandler}
                />

                <div className="margin-top-left-20">

                    <Typography  color="textSecondary">
                        My Liked recipes
                    </Typography>

                </div>

                <div className="row">
                    <div className="col-10">
                        <div className="row">
                            {this.renderRecipes()}
                        </div>

                    </div>
                    <div className="col-2">

                        <div className="margin-right-10">

                            <Typography  color="textSecondary">
                                My Followers
                                <div className="margin-top-20">
                                <FollowersList followers={this.state.followers}/>
                                </div>
                            </Typography>

                        </div>
                        <div className="margin-right-top-10">

                            <Typography  color="textSecondary">
                                I am Following
                                <div className="margin-top-20">
                                    <FollowersList followers={this.state.following}/>
                                </div>
                            </Typography>

                        </div>
                    </div>
                </div>

                <div className="margin-top-left-20">

                    <Typography  color="textSecondary">
                        My Posts
                    </Typography>

                </div>

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