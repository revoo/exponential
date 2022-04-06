import React, { useState, useEffect } from 'react';

import TimeDisplay from './TimeDisplay';

const SessionInfoDisplay = (props) => {
    if (props.display) {
        return ( 
            <div style={{color: 'white'}}>
                <p>Focus Intervals: {props.focusIntervals}</p>
                <p>Sets: {props.sets}</p>
                <p>Short Breaks Earned: {props.shortBreaks}</p>
                <p>Long Breaks Earned: {props.longBreaks}</p>
                <p style={{ display: 'inline' }}>Total Break Time:  </p>
                <TimeDisplay timeInSeconds={props.totalBreakTime} displayStyle={{ display: 'inline' }} />
                    
            </div> 
        )
   } else {
       return null;
   }
}

export default SessionInfoDisplay;
