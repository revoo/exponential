import React from 'react';

import TimeDisplay from './TimeDisplay';

import classes from './HistoryCard.module.css';

const HistoryCard = (props) => {

    return (
        <div className={classes.card}>
            <p>{props.date.slice(0,24)}</p>
            <p>Project: {props.project}</p>
            <p>Category: {props.category}</p>
            <p>Work Time: <TimeDisplay inline={true} timeInSeconds={props.totalWorkTime} /> </p>
            <p>Break Time: <TimeDisplay inline={true} timeInSeconds={props.totalBreakTime} /></p>
            <p>Break Time Banked: <TimeDisplay inline={true} timeInSeconds={props.breakTimeNotTaken} /></p>
        </div>
    );
    
}

export default HistoryCard;