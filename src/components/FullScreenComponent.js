import React from 'react';
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const styles = {
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: 2,
        flex: 1,
    },
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



 class FullScreenDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            title: '',
            content: ''
        }
    }

      handleClickOpen = () => {
         this.setState({
             open: true
         })
     };

      handleClose = () => {
         this.setState({
             open: false
         })
     };

      handleSave = () => {
          const post = {
              title: this.state.title,
              content: this.state.content
          };

          this.props.postService.createPost(post).then((res) => {
              console.log("Post creted: +" , res);
          })

          this.setState({open: false});
          this.props.findAllPosts();

      }

      handleTitleChange = (event) => {
          this.setState({title: event.target.value})
          console.log("title: ", this.state.title)
      }


     handleContentChange = (event) => {
         this.setState({content: event.target.value})
     }



    render() {
        const { classes } = this.props;


    return (
        <div>
            <MuiThemeProvider theme={theme}>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Create new posts
                </Button>
                <Dialog fullScreen open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                {this.props.title}
                            </Typography>
                            <Button autoFocus color="inherit" onClick={this.handleSave}>
                                {this.props.button}
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Title"
                        type="email"
                        fullWidth
                        onChange={this.handleTitleChange}
                    />
                    <TextField
                        id="standard-multiline-flexible"
                        label="Multiline"
                        multiline
                        rowsMax={8}
                        variant="outlined"
                        onChange={this.handleContentChange}
                    />
                </Dialog>
            </MuiThemeProvider>
        </div>
    );
};

}


const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#31a25e',
            main: '#31a25e',
            dark: '#31a25e',
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

export default withStyles(styles)(FullScreenDialog);
