import React from 'react';

import classes from './Button.module.css';
/* 
*   @param color - button color
*   @param text - button text
*/
const Button = (props) => {
    
    return <button className={classes.Button} style={{backgroundColor: props.color, marginTop: props.marginTop}} onClick={props.onClickHandler}> {props.text} </button>;
}

export default Button; 