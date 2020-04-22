import React, {Component} from 'react';
import AppBarHome from '../components/appbars/AppBarHome';
import SimpleMediaCard from '../components/SearchCard';
import Inputs from '../components/SearchField';
import ParallaxImage from '../components/Parallex';
import UserServices from '../services/UserServices';
import PropTypes from "prop-types";
import SnackBarAddFav from '../components/SnackBarAddFav';
import { withRouter } from "react-router-dom";
import { Column, Row } from 'simple-flexbox';
import RecipeServices from '../services/RecipeServices';





class Home extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            name: 'Recipe DB',
            results: {},
            searchField: '',
            currentUserId: '',
            isLogged: false,
            likedMovies: [],
            snackBarFavOpen: false,
            snackBarFavText: ''

        };

        // this.searchMovie = this.searchMovie.bind(this);
        // this.movieCards = this.movieCards.bind(this);
        // this.handleChange = this.handleChange.bind(this);
         this.recipeService = RecipeServices.instance;
        // this.logout = this.logout.bind(this);
         this.loginService = UserServices.instance;
        // this.profilePage = this.profilePage.bind(this);
        // this.loadUser = this.loadUser.bind(this);
        // this.addMovie = this.addMovie.bind(this);
        // this.cardClickHandler = this.cardClickHandler.bind(this);
        // this.popularMovies = this.popularMovies.bind(this);
        // this.popularMovieCards = this.popularMovieCards.bind(this);
        // this.loginClickHandler =  this.loginClickHandler.bind(this);
        // this.registerClickHandler =  this.registerClickHandler.bind(this);
    }

    componentDidMount() {
         this.loadUser();
         this.recipePopulate();
        // this.popularMovieCards();

    }

    //  async searchMovie(searchString) {
    //    let promise = await this.tmdbServices.searchMovie(searchString)
    //         .then(res => this.setState({movies: res}));
    // }

    recipePopulate =  async (searchString) =>  {
         await this.recipeService.recipeSearch(searchString)
            .then(res => this.setState({results: res}));
    }

    registerClickHandler = () => {
        this.context.router.history.push("/register");
    }

    loginClickHandler = () => {
       // this.props.history.push("/login");
        this.context.router.history.push("/login");
    }

    handleChange = (event) => {
        this.setState({
            searchField: event.target.value
        });

        if(this.state.searchField && this.state.searchField !== '') {
            if (event.which === 13) {
                console.log("enter")
            }
                this.recipePopulate(this.state.searchField);
        }
        else if(this.state.searchField.trim() === "" || this.state.searchField.length === 0 ) {
            this.setState({results: this.recipePopulate()})
        }
    }

    logout = () => {
        this.loginService.logoutUser()
            .then((res) => {
                this.setState({isLogged: false});
            });
    }

    loadUser = () => {
        if (localStorage.getItem("logged") === 'true') {
            this.loginService.getProfile()
                .then((res) => {
                    if (res !== ''){
                        this.setState({isLogged: true});
                    }
                    else {
                        console.log("user not logged in");
                    }
                });
        }
    }




    // addMovie(movie) {
    //
    //     if (localStorage.getItem("logged") === 'true') {
    //         let  mov ={
    //             title: movie.title,
    //             poster: movie.poster,
    //             overview: movie.overview,
    //             releaseDate: movie.releaseDateOriginal,
    //             id: movie.id,
    //             voteAverage: movie.voteAverage
    //         };
    //
    //         this.tmdbServices.addMovie(mov)
    //             .then((res) => {
    //                 this.setState({snackBarFavOpen: true,
    //                                snackBarFavText: 'Movie Added'
    //                 })
    //             });
    //     }
    //
    //     else {
    //         this.context.router.history.push("/login");
    //
    //
    //     }
    //
    //
    // }

    profilePage = () => {

        this.context.router.history.push("/profile");
    }

    cardClickHandler = (id) => {
        this.context.router.history.push("/recipe/"+id);
    }


    addRecipe = (recipe) => {

        if (localStorage.getItem("logged") === 'true') {
            let  res ={
                recipeId: recipe.id,
                title: recipe.title,
                readyInMinutes: recipe.minutes,
                servings: recipe.servings,
                image: recipe.poster
            };

            this.recipeService.addRecipe(res)
                .then((res) => {
                    this.setState({snackBarFavOpen: true,
                        snackBarFavText: 'Recipe Added'
                    });
                    console.log("recipe ", res);
                });
        }

        else {
            this.context.router.history.push("/login");

        }


    }




    twitterCards = () => {
        console.log("recipes ", this.state.results);

        let results = null;
        if(Object.keys(this.state.results).length !== 0){
            results = this.state.results.results.map(
                (results) =>{


                    const minutes =  "Ready in Minutes: " + results.readyInMinutes;
                    const servings =  "Serving size: " + results.servings ;

                    return <SimpleMediaCard key={results.id}
                                            minutes={minutes}
                                            servings={servings}
                                            title={results.title}
                                            poster={results.image}
                                            id={results.id}
                                            actualId={results.id}
                                            addRecipe={this.addRecipe}
                                            bool={true}
                                            cardClick={this.cardClickHandler}

                    />
                }
            )
        }
        return results;
    }



    render() {

        return (
            <div >
                <AppBarHome title={this.state.name}
                            loginId={this.state.currentUserId}
                            logout={this.logout}
                            profile={this.profilePage}
                            handleChange={this.handleChange}
                            loginClick={this.loginClickHandler}
                            registerClick={this.registerClickHandler}
                />

                <div className="flex-container">
                    {this.twitterCards()}
                </div>

                <SnackBarAddFav open={this.state.snackBarFavOpen}
                                text={this.state.snackBarFavText}
                />

                <div>

                    <footer className="page-footer font-small blue pt-4 mt-4">

                        <div className="footer-copyright text-center py-3">© CS5200 Project:
                            <a href=""> Github Repo</a>
                        </div>


                    </footer>



                </div>


            </div>
        );
    }
}

export default Home;