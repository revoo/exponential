import React from 'react';
/* 
    Takes in seconds and returns formatted with proper time HH:MM
*/
const TimeDisplay = (props) => {
    let seconds = Math.abs(props.timeInSeconds);
    let minutes = 0;
    let hours = 0;
    let formattedTime = seconds;

    // display or not
    if (props.hide) {
        return <p style={props.displayStyle}>EXPONENTIAL</p>;
    }

    // format time logic
    if (seconds > 59) {
        minutes = Math.floor(seconds / 60);
        // padstart is part of ECMA2017. Pads with a character at the start. 
        formattedTime = minutes + ":" + String(seconds % 60).padStart(2, '0');
    }
    if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        formattedTime = hours + ":" + String(minutes % 60).padStart(2, '0') + ":" + String(seconds % 60).padStart(2, '0');
    }

    // format the time accordigly based on seconds
    // use block default if inline not specified
    return (props.inline === undefined || props.inline === false)
        ? <p style={props.displayStyle}>{props.timeInSeconds < 0 ? '-' + formattedTime : formattedTime.toString()}</p>
        : <span style={props.displayStyle}>{props.timeInSeconds < 0 ? '-' + formattedTime : formattedTime.toString()}</span>;
}


export default TimeDisplay;