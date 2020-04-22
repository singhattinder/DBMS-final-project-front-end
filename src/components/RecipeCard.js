import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import StarRatingComponent from 'react-star-rating-component';
import RecipeServices from "../services/RecipeServices";

const styles = {
    card: {
        maxWidth: 1100,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },

};

class RecipeCard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            recipes: {}
        };


        this.recipeService = RecipeServices.instance;

    }

    componentDidMount() {
         this.renderRecipe();
    }


     renderRecipe = async() => {
        let id = this.props.recipeId;
         await this.recipeService.getRecipeDetail(id)
            .then(res => this.setState({recipes: res}));
        console.log("recipes", this.state.recipes);
    }

    render() {
         const { classes } = this.props;
        let stars = 3;
        //
        //
        // var date = new Date(this.state.movie.release_date);
        // var months = ["January", "February", "March",
        //     "April", "May", "June", "July", "August",
        //     "September", "October", "November", "December"];
        // let mon = months[date.getMonth()];
        // let day = date.getDate();
        // let year =  date.getFullYear();
        // let release = mon+' ' +day+ ', '+ year;
        //
        // let budget = Math.round(this.state.movie.budget/1000000);
        // let revenue = Math.round(this.state.movie.revenue/1000000);


        return (
            <div className="flex-container-movie">
            <Card  className={classes.card} style={cardStyle}>

                <CardMedia
                    className={classes.media}
                    image={ this.state.recipes.image}
                />


                <CardHeader
                    title={this.state.recipes.title}
                    subheader={this.state.recipes.sourceName}
                />
                <div className="margin-text" >
                    <Typography component="p">
                        {this.state.recipes.instructions}
                    </Typography>
                </div>

                <CardContent>

                    <div className="margin-left-11">
                    <div component="h1" className="row">

                        <StarRatingComponent
                            name="rate1"
                            starCount={5}
                            value={stars}
                            className="star-margin"
                        />


                    </div>
                    </div>
                    <div className="margin-left-10">
                    <div className="row margin-top-20">

                    <div>

                    <Typography className={classes.title} color="textSecondary">
                        Tagline
                    </Typography>

                    </div>
                        <div className="margin-left-10">

                            <Typography className={classes.title} component="p">
                                {this.state.recipes.creditsText}
                            </Typography>

                        </div>

                    </div>
                    </div>



                    <div className="margin-left-10">
                        <div className="row margin-top-20">

                            <div>

                                <Typography className={classes.title} color="textSecondary">
                                    Ready In  minutes
                                </Typography>

                            </div>
                            <div className="margin-left-10">

                                <Typography className={classes.title} component="p">
                                    {this.state.recipes.readyInMinutes}
                                </Typography>

                            </div>

                        </div>
                    </div>




                    <div className="margin-left-10">
                        <div className="row margin-top-20">

                            <div>

                                <Typography className={classes.title} color="textSecondary">
                                    Servings
                                </Typography>

                            </div>
                            <div className="margin-left-10">

                                <Typography className={classes.title} component="p">
                                    {this.state.recipes.servings}
                                </Typography>

                            </div>

                        </div>
                    </div>



                    <div className="margin-left-10">
                        <div className="row margin-top-20">

                            <div>

                                <Typography className={classes.title} color="textSecondary">
                                    Extended Ingredients
                                </Typography>

                            </div>
                            <div className="margin-left-10">

                                <Typography className={classes.title} component="p">
                                    {this.state.recipes.extendedIngredients && this.state.recipes.extendedIngredients.length}
                                </Typography>

                            </div>

                        </div>
                    </div>




                    <div className="margin-left-10">
                        <div className="row margin-top-20">

                            <div>

                                <Typography className={classes.title} color="textSecondary">
                                    Original Title
                                </Typography>

                            </div>
                            <div className="margin-left-10">

                                <Typography className={classes.title} component="p">
                                    {this.state.recipes.title}
                                </Typography>

                            </div>

                        </div>
                    </div>



                </CardContent>

            </Card>
            </div>

        );
    }

}
const cardStyle = {
    display: 'block',
    position: 'relative',
    width: '70vw',
    transitionDuration: '0.3s',
    justifyContent: 'center'
};

RecipeCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeCard);