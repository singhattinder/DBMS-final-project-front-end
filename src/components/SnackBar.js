import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

class SnackbarLogin extends React.Component {
    state = {
        open: false,
        vertical: 'top',
        horizontal: 'center',
    };

    handleClick = state => () => {
        this.setState({ open: true, ...state });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    componentWillReceiveProps(newProps) {
        this.setState({open: newProps.open})
    }



    render() {
        const { vertical, horizontal, open } = this.state;
        return (
            <div>

                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.props.text}</span>}
                />
            </div>
        );
    }
}

export default SnackbarLogin;
