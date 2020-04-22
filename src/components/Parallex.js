import { Parallax } from 'react-scroll-parallax';
import React, {Component} from 'react';

const ParallaxImage = () => (
    <Parallax
        className="custom-class"
        offsetYMax={20}
        offsetYMin={-20}
        slowerScrollRate
        tag="figure"
    >
        <img src="https://i.imgur.com/CaTD18H.jpg" />
    </Parallax>
);

export default ParallaxImage;