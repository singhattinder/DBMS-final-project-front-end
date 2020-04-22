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



class FullScreenEditDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            title: props.postTitle,
            content: props.postContent
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.open !== this.props.open) {
            this.setState({open: nextProps.open})
        }
    }



    handleClose = () => {
        this.setState({open: false})
        this.props.setClose();
    }


    handleSave = () => {
      this.props.setSave(this.state.title, this.state.content);
      this.handleClose();

    }

    handleTitleChange = (event) => {
        this.setState({title: event.target.value})
    }


    handleContentChange = (event) => {
        this.setState({content: event.target.value})
    }


    render() {
        const { classes } = this.props;


        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <Dialog fullScreen open={this.state.open} onClose={() => this.handleClose()} TransitionComponent={Transition}>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={() => this.handleClose()} aria-label="close">
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
                            label={this.props.postTitle}

                            type="email"
                            fullWidth
                            onChange={this.handleTitleChange}
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            multiline
                            label={this.props.postContent}
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

export default withStyles(styles)(FullScreenEditDialog);
