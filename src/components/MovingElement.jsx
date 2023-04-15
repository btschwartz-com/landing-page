
import React from 'react';


import MovingComponent from 'react-moving-text';
import 'react-awesome-button/dist/styles.css';
import '../App.css';


export const MovingElement = ({ element: Element, ...props }) => {
    return (
      <MovingComponent
        type="unfold"
        duration="1000ms"
        delay="0s"
        direction="alternate"
        timing="ease"
        iteration="1"
        fillMode="none"
        {...props}
      >
        <Element />
      </MovingComponent>
    );
  };