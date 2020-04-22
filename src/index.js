import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import WebFont from 'webfontloader';
import Routing from './containers/Routing';
import { BrowserRouter } from 'react-router-dom'

WebFont.load({
    google: {
        families: ['Titillium Web:300,400,700', 'Open-sans']
    }
});


ReactDOM.render(

    <div className="container-fluid">
        <BrowserRouter>
            <Routing/>
        </BrowserRouter>
    </div>,
    document.getElementById('root')
);