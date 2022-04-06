import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Button from '../UI/Button/Button';
import TimeDisplay from '../TimeDisplay';
import History from '../History';

// send data back to main process to store in flat DB
const { ipcRenderer } = window.require("electron");

const FinishPage = (props) => {

    const sessionData = {
        project: props.project.trim(),
        category: props.category,
        totalWorkTime: props.totalWorkTime,
        totalBreakTime: props.totalBreakTime,
        breakTimeNotTaken: props.breakSecondsEarned,
        focusIntervals: props.focusIntervals,
        sets: props.sets,
        shortBreaks: props.shortBreaks,
        longBreaks: props.longBreaks,
        date: Date().toLocaleString().toString()
    };

    // send data to renderer process using IPC
    useEffect(() => {
        console.log(' this hook should only run once');
        ipcRenderer.send('write-session-data', sessionData);
        // [] means only execute once since we don't want to write out the same session twice and read the historical data only once.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div style={{ color: 'white' }}>
                <h1><i>Session Finished.</i></h1>
                <h2>{props.category} - {props.project}</h2>
                <hr style={{ width: '50%', color: 'cyan' }} />
                <p>Total Work Time: </p> <TimeDisplay timeInSeconds={props.totalWorkTime} />
                <p>Total Break Time: </p><TimeDisplay timeInSeconds={props.totalBreakTime} />
                <p>Break Time Not Taken: </p> <TimeDisplay timeInSeconds={props.breakSecondsEarned > 0 ? props.breakSecondsEarned : '0'} />
                <p>Focus Intervals Completed: {props.focusIntervals}</p>
                <p>Sets Completed: {props.sets}</p>
                <p>Short Breaks Earned: {props.shortBreaks}</p>
                <p>Long Breaks Earned: {props.longBreaks}</p>
                <hr style={{ width: '50%', color: 'cyan' }} />
                <Link to="/">
                    <Button color="green" text="Start New Session" onClickHandler={props.startNewSessionHandler} />
                </Link>
            </div>
            <div>
                {/* TODO MAKE THIS NICER AND DISPLAY RELEVANT STATS */}
            <History visible={true} />


            </div>
        </div>


    );

}

export default FinishPage;