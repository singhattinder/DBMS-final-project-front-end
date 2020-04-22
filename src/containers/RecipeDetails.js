import React, {Component} from 'react';
import ProfilePageComponent from '../components/pagecomponents/ProfilePageComponent';
import AppBarProfilePage from '../components/appbars/AppBarProfilePage';
import UserServices from "../services/UserServices";
import Divider from '@material-ui/core/Divider';
import ProfileCard from '../components/ProfileCards';
import { Like } from '../fontawesome/like';
import PropTypes from "prop-types";
import MyProfilePageComponent from '../components/pagecomponents/MyProfilePageComponent';
import AppBarRecipe from '../components/appbars/AppBarRecipe';
import RecipeCard from '../components/RecipeCard';


export  default class RecipeDetails extends Component{
    static contextTypes = {
        router: PropTypes.object
    };


    constructor(props) {
        super(props);
        this.state = {
            title: 'Recipe Details'

        };

        this.homeButtonHandler = this.homeButtonHandler.bind(this);

    }


    homeButtonHandler() {

        this.context.router.history.push("/home");
    }




    render() {
        return (
            <div className="back-color">
                <AppBarRecipe   title={this.state.title}
                               home={this.homeButtonHandler}

                />
                <div className="flex-container-movie">
                    <RecipeCard
                               recipeId = {this.props.match.params.recipeId}

                    />
                </div>

            </div>


        );
    }

}