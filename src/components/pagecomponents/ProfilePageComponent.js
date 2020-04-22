import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Parallax, Background } from 'react-parallax';


import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Save from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import {createMuiTheme} from "@material-ui/core/styles/index";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import FollowBadge from '../FollowBadge';
import ImageUploader from 'react-images-upload';


const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
});

class ProfilePageComponent extends Component{
    constructor(props) {
        super(props);

        this.state = {
            username: props.user.username,
            firstName: props.user.firstName,
            lastName: props.user.lastName,
            email: props.user.email,
            likedMovies: props.user.likedMovies
        };


    }



    render() {

        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
            <div>
                <Parallax
                    blur={0}
                    bgImage={require('../../assets/image.jpg')}
                    strength={400}>

                    <div style={{ height: '350px' }} />
                </Parallax>
                <div className="container margin-container-20">
                    <div className="row">

                        <img align="left" className="img-custom"
                             src="https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png"
                             />

                        <div className="col-text">
                            <h1>{this.props.user.username}</h1>
                            <p>{this.props.user.firstName} {this.props.user.lastName}</p>
                        </div>

                    </div>
                    <div className="row">
                    <div className="margin-badge">
                        <FollowBadge title="Followers"
                                     count={this.props.user.followers.length}
                        />
                    </div>
                    <div className="margin-left-10">
                        <FollowBadge title="Following"
                                     count={this.props.user.following.length}
                        />
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
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#ffffff',
        },
    },

});




ProfilePageComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilePageComponent);
